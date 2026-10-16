// Trae los datos que caducan (luz del día, carburantes, Euríbor, IPC e IRAV) de las fuentes oficiales
// y los guarda en src/data/datos.json. Lo ejecuta la GitHub Action "Actualizar datos" varias veces al día.
//
// Si una fuente falla o devuelve algo raro, se conserva el dato anterior y el script termina con error
// para que la Action quede en rojo y GitHub avise por correo.

import { readFile, writeFile } from 'node:fs/promises';

const ARCHIVO = new URL('../src/data/datos.json', import.meta.url);
const INE = 'https://servicios.ine.es/wstempus/js/ES';

const datos = JSON.parse(await readFile(ARCHIVO, 'utf8'));
const antes = JSON.stringify(datos);
const fallos = [];

// Fecha de hoy en España (AAAA-MM-DD), y la de mañana.
const fechaMadrid = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(d);
const hoy = fechaMadrid(new Date());
const manana = fechaMadrid(new Date(Date.now() + 24 * 3600 * 1000));

async function traer(url, { intentos = 3, tipo = 'json' } = {}) {
  for (let i = 1; ; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'eneuros.es (datos al dia)' }, signal: AbortSignal.timeout(90_000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return tipo === 'json' ? await r.json() : await r.text();
    } catch (e) {
      if (i >= intentos) throw new Error(`${url}: ${e.message}`);
      await new Promise((ok) => setTimeout(ok, 5000 * i));
    }
  }
}

async function paso(nombre, fn) {
  try {
    await fn();
  } catch (e) {
    fallos.push(nombre);
    console.error(`✗ ${nombre}: ${e.message}`);
  }
}

function comprobar(cond, msg) {
  if (!cond) throw new Error(msg);
}

// Mensual: solo se acepta un dato del mismo mes o posterior al guardado (nunca retroceder).
function guardarMensual(clave, valor, periodo, [min, max]) {
  comprobar(Number.isFinite(valor) && valor >= min && valor <= max, `valor fuera de rango (${valor})`);
  comprobar(/^\d{4}-\d{2}$/.test(periodo), `periodo raro (${periodo})`);
  if (periodo < datos[clave].periodo) return console.log(`· ${clave}: la fuente da ${periodo}, nos quedamos con ${datos[clave].periodo}`);
  datos[clave] = { valor, periodo };
  console.log(`✓ ${clave}: ${valor} (${periodo})`);
}

// Si el último dato mensual tiene más de 2 meses, algo ha cambiado en la fuente: avisar.
function avisarSiViejo(clave) {
  const [a, m] = datos[clave].periodo.split('-').map(Number);
  const [ha, hm] = hoy.split('-').map(Number);
  if ((ha - a) * 12 + (hm - m) > 2) {
    fallos.push(`${clave} sin actualizar`);
    console.error(`✗ ${clave}: el último dato es de ${datos[clave].periodo}`);
  }
}

// Euríbor a 12 meses, media mensual (BCE; es el mismo dato oficial que publica el Banco de España).
await paso('euribor', async () => {
  const csv = await traer(
    'https://data-api.ecb.europa.eu/service/data/FM/M.U2.EUR.RT.MM.EURIBOR1YD_.HSTA?lastNObservations=1&format=csvdata',
    { tipo: 'text' },
  );
  const [cab, fila] = csv.trim().split('\n');
  const cols = cab.split(',');
  const celdas = fila.split(',');
  const periodo = celdas[cols.indexOf('TIME_PERIOD')];
  const valor = Math.round(Number(celdas[cols.indexOf('OBS_VALUE')]) * 1000) / 1000;
  guardarMensual('euribor', valor, periodo, [-2, 15]);
});

// IPC (tasa anual del índice general) e IRAV (índice de alquileres), del INE.
async function serieINE(cod) {
  const s = await traer(`${INE}/DATOS_SERIE/${cod}?nult=1`);
  const d = s.Data?.at(-1);
  comprobar(d && d.FK_Periodo >= 1 && d.FK_Periodo <= 12, `serie ${cod} sin dato mensual`);
  comprobar(/^(Total )?Nacional\. Índice general\. Variación anual/.test(s.Nombre.trim()), `serie ${cod} inesperada: ${s.Nombre}`);
  return { valor: d.Valor, periodo: `${d.Anyo}-${String(d.FK_Periodo).padStart(2, '0')}` };
}
await paso('ipc', async () => {
  const { valor, periodo } = await serieINE('IPC290750');
  guardarMensual('ipc', valor, periodo, [-10, 30]);
});
await paso('irav', async () => {
  const { valor, periodo } = await serieINE('IRAV1');
  guardarMensual('irav', valor, periodo, [-10, 30]);
});

// Precio de la luz PVPC por horas (Red Eléctrica): hoy y, desde las 20:30 aprox., mañana.
await paso('luz', async () => {
  const url = `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${hoy}T00:00&end_date=${manana}T23:59&time_trunc=hour`;
  const r = await traer(url);
  const pvpc = r.included?.find((x) => x.id === '1001' || x.type === 'PVPC');
  comprobar(pvpc, 'la respuesta no trae el PVPC');
  // Agrupa por día y hora local (la fecha de REE ya viene con la hora de España: 2026-10-15T00:00:00.000+02:00).
  const porDia = new Map();
  for (const { value, datetime } of pvpc.attributes.values) {
    const fecha = datetime.slice(0, 10);
    const hora = datetime.slice(11, 13);
    if (!porDia.has(fecha)) porDia.set(fecha, new Map());
    const clave = hora + datetime.slice(23); // la zona horaria distingue la hora repetida al cambiar al horario de invierno
    const horas = porDia.get(fecha);
    if (!horas.has(clave)) horas.set(clave, { h: hora, v: [] });
    horas.get(clave).v.push(value);
  }
  const dias = [];
  for (const [fecha, horas] of porDia) {
    const lista = [...horas.values()].map(({ h, v }) => ({ h, p: Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 100) / 100000 }));
    if (lista.length < 23) continue; // día incompleto: mañana todavía sin publicar
    comprobar(lista.every((x) => x.p > -0.5 && x.p < 2), `precio fuera de rango el ${fecha}`);
    dias.push({ fecha, horas: lista });
  }
  comprobar(dias.some((d) => d.fecha === hoy), `no hay precios de hoy (${hoy})`);
  datos.luz = { dias };
  console.log(`✓ luz: ${dias.map((d) => d.fecha).join(', ')}`);
});

// Gasolina 95 y diésel: media de todas las gasolineras (Ministerio para la Transición Ecológica).
await paso('carburantes', async () => {
  const r = await traer('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/');
  comprobar(r.ResultadoConsulta === 'OK', `respuesta ${r.ResultadoConsulta}`);
  const media = (campo) => {
    const p = r.ListaEESSPrecio.map((e) => Number(String(e[campo] ?? '').replace(',', '.'))).filter((x) => x > 0.5 && x < 4);
    comprobar(p.length > 1000, `pocas gasolineras con ${campo} (${p.length})`);
    return Math.round((p.reduce((a, b) => a + b, 0) / p.length) * 1000) / 1000;
  };
  const [d, m, a] = r.Fecha.split(' ')[0].split('/');
  datos.carburantes = { fecha: `${a}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`, gasolina95: media('Precio Gasolina 95 E5'), diesel: media('Precio Gasoleo A') };
  console.log(`✓ carburantes: ${JSON.stringify(datos.carburantes)}`);
});

for (const clave of ['euribor', 'ipc', 'irav']) avisarSiViejo(clave);

if (JSON.stringify(datos) !== antes) {
  datos.actualizado = new Date().toISOString();
  await writeFile(ARCHIVO, JSON.stringify(datos, null, 2) + '\n');
  console.log('Datos guardados.');
} else console.log('Sin cambios.');

if (fallos.length) {
  console.error(`Fallaron: ${fallos.join(', ')}`);
  process.exit(1);
}
