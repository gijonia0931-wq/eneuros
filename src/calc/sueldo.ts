// Sueldo neto 2026: cotizaciones del trabajador (Orden PJC/297/2026) y retención de IRPF según el
// algoritmo oficial de retenciones 2026 de la Agencia Tributaria (régimen general, sin casos especiales).

export type Contrato = 'indefinido' | 'temporal' | 'corto';
export type Situacion = 'monoparental' | 'conyuge' | 'otras';
export type Edad = 'menos65' | 'de65a74' | 'desde75';
export type Discapacidad = 'no' | 'de33a65' | 'desde65';

export interface DatosSueldo {
  bruto: number; // anual
  pagas: 12 | 14;
  contrato: Contrato;
  situacion: Situacion;
  edad: Edad;
  discapacidad: Discapacidad;
  hijos: number; // menores de 25 que conviven contigo
  hijosMenores3: number;
  hijosAMedias: boolean; // se reparten con el otro progenitor
}

export interface ResultadoSueldo {
  seguridadSocial: number; // anual
  tipoSS: number; // %
  tipoIRPF: number; // %
  irpf: number; // anual
  netoAnual: number;
  pagas: 12 | 14;
  netoMes: number; // nómina ordinaria
  netoExtra: number; // cada paga extra (0 si 12 pagas)
  exento: boolean;
}

// Seguridad Social 2026, parte del trabajador
const SS = { comunes: 4.7, mei: 0.15, formacion: 0.1, desempleoIndefinido: 1.55, desempleoTemporal: 1.6 };
const BASE_MAXIMA_MES = 5101.2;
// Cotización de solidaridad 2026 (parte del trabajador) sobre lo que supera la base máxima
const SOLIDARIDAD = [
  { hasta: 0.1, tipo: 0.19 },
  { hasta: 0.5, tipo: 0.21 },
  { hasta: Infinity, tipo: 0.24 },
];

const ESCALA = [
  { desde: 0, cuota: 0, tipo: 19 },
  { desde: 12450, cuota: 2365.5, tipo: 24 },
  { desde: 20200, cuota: 4225.5, tipo: 30 },
  { desde: 35200, cuota: 8725.5, tipo: 37 },
  { desde: 60000, cuota: 17901.5, tipo: 45 },
  { desde: 300000, cuota: 125901.5, tipo: 47 },
];

// Límite de rendimientos sin retención (art. 81 RIRPF): [0 hijos, 1 hijo, 2 o más]
const EXENTOS: Record<Situacion, (number | null)[]> = {
  monoparental: [null, 17644, 18694],
  conyuge: [17197, 18130, 19262],
  otras: [15876, 16342, 16867],
};

const red2 = (n: number) => Math.round(n * 100) / 100;
const truncar2 = (n: number) => Math.trunc(n * 100 + 1e-9) / 100;

function escala(base: number): number {
  if (base <= 0) return 0;
  const t = [...ESCALA].reverse().find((e) => base > e.desde)!;
  return t.cuota + ((base - t.desde) * t.tipo) / 100;
}

export function cotizaciones(brutoAnual: number, contrato: Contrato) {
  const tipo = SS.comunes + SS.mei + SS.formacion + (contrato === 'indefinido' ? SS.desempleoIndefinido : SS.desempleoTemporal);
  const baseMes = brutoAnual / 12;
  const normal = Math.min(baseMes, BASE_MAXIMA_MES) * tipo / 100;
  let solidaridad = 0;
  let exceso = Math.max(baseMes - BASE_MAXIMA_MES, 0);
  let desde = 0;
  for (const t of SOLIDARIDAD) {
    const tramo = Math.min(exceso, BASE_MAXIMA_MES * t.hasta - desde);
    if (tramo <= 0) break;
    solidaridad += (tramo * t.tipo) / 100;
    exceso -= tramo;
    desde += tramo;
  }
  return { tipo, anual: red2((normal + solidaridad) * 12) };
}

export function calcularSueldo(d: DatosSueldo): ResultadoSueldo {
  const retrib = d.bruto;
  const ss = cotizaciones(retrib, d.contrato);
  const hijos = Math.max(0, Math.floor(d.hijos));
  const menores3 = Math.min(Math.max(0, Math.floor(d.hijosMenores3)), hijos);
  const situacion: Situacion = d.situacion === 'monoparental' && hijos === 0 ? 'otras' : d.situacion;
  const entero = d.hijosAMedias && situacion !== 'monoparental' ? 0.5 : 1;

  // Gastos deducibles y reducción por rendimientos del trabajo
  const rnt = Math.max(retrib - ss.anual, 0);
  const incDisc = d.discapacidad === 'desde65' ? 7750 : d.discapacidad === 'de33a65' ? 3500 : 0;
  const otrosGastos = Math.min(2000 + incDisc, rnt);
  let red20 = 0;
  if (rnt <= 14852) red20 = 7302;
  else if (rnt <= 17673.52) red20 = 7302 - 1.75 * (rnt - 14852);
  else if (rnt < 19747.5) red20 = 2364.34 - 1.14 * (rnt - 17673.52);
  red20 = red2(red20);
  const rntRedu = Math.max(rnt - otrosGastos - red20, 0);
  const redu = hijos > 2 ? 600 : 0;
  const base = Math.max(rntRedu - redu, 0);

  // Mínimo personal y familiar
  let minimo = 5550 + (d.edad !== 'menos65' ? 1150 : 0) + (d.edad === 'desde75' ? 1400 : 0);
  const porHijo = [2400, 2700, 4000, 4500];
  for (let i = 0; i < hijos; i++) minimo += red2(porHijo[Math.min(i, 3)] * entero);
  minimo += red2(2800 * menores3 * entero);
  if (d.discapacidad === 'desde65') minimo += 9000 + 3000;
  if (d.discapacidad === 'de33a65') minimo += 3000;

  let cuota = Math.max(escala(base) - escala(minimo), 0);

  const umbral = EXENTOS[situacion][Math.min(hijos, 2)] ?? EXENTOS.otras[0]!;
  const exento = retrib <= umbral;
  if (exento) cuota = 0;
  else if (retrib <= 35200) cuota = Math.min(cuota, (retrib - umbral) * 0.43);

  let tipoIRPF = retrib > 0 ? truncar2((cuota / retrib) * 100) : 0;
  if (!exento && d.contrato === 'corto' && tipoIRPF < 2) tipoIRPF = 2;

  const irpf = red2((retrib * tipoIRPF) / 100);
  const netoAnual = retrib - ss.anual - irpf;
  const paga = retrib / d.pagas;
  const irpfPaga = (paga * tipoIRPF) / 100;
  const netoMes = paga - ss.anual / 12 - irpfPaga;
  const netoExtra = d.pagas === 14 ? paga - irpfPaga : 0;
  return { seguridadSocial: ss.anual, tipoSS: ss.tipo, tipoIRPF, irpf, netoAnual, pagas: d.pagas, netoMes, netoExtra, exento };
}
