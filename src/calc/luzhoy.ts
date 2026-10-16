// Precio de la luz PVPC por horas (Red Eléctrica), guardado en src/data/datos.json con hoy y, por la noche, mañana.
// Se usa al construir la web y también en el navegador, para que a medianoche la página pase sola al día siguiente.
import { fechaTexto } from './formato';

export interface HoraLuz { h: string; p: number } // hora local ("00"-"23") y precio en €/kWh, sin impuestos
export interface DiaLuz { fecha: string; horas: HoraLuz[] }

export const hoyMadrid = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(d);

/** El día de hoy si está; si no, el último disponible anterior a hoy. */
export function diaActual(dias: DiaLuz[], hoy = hoyMadrid()): DiaLuz | null {
  return dias.find((d) => d.fecha === hoy) ?? dias.filter((d) => d.fecha < hoy).at(-1) ?? null;
}

export function resumen(dia: DiaLuz) {
  const media = dia.horas.reduce((a, x) => a + x.p, 0) / dia.horas.length;
  const orden = [...dia.horas].sort((a, b) => a.p - b.p);
  return { media, barata: orden[0], cara: orden.at(-1)! };
}

export const precioKwh = (p: number) => `${p.toLocaleString('es-ES', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} €/kWh`;
export const tramo = (h: string) => `de ${h} a ${String((Number(h) + 1) % 24).padStart(2, '0')} h`;

/** Texto de la tarjeta "Precio de la luz hoy". */
export function tarjetaLuz(dias: DiaLuz[], hoy = hoyMadrid()) {
  const dia = diaActual(dias, hoy);
  if (!dia) return { valor: '—', detalle: 'Ahora mismo no tenemos el precio de hoy. Consulta la web de Red Eléctrica.' };
  const r = resumen(dia);
  const cuando = dia.fecha === hoy ? `Media de hoy, ${fechaTexto(dia.fecha)}` : `Media del ${fechaTexto(dia.fecha)} (aún no tenemos el de hoy)`;
  return {
    valor: precioKwh(r.media),
    detalle: `${cuando}, sin impuestos. La hora más barata es ${tramo(r.barata.h)} (${precioKwh(r.barata.p)}) y la más cara ${tramo(r.cara.h)} (${precioKwh(r.cara.p)}).`,
  };
}
