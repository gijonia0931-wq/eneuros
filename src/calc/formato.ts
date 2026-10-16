// Lectura y formato de números a la española, común a todas las calculadoras.

/** Lee números escritos a la española ("180.000", "3,25") o con punto decimal ("3.25"). */
export function leerNumero(texto: string): number {
  let t = texto.replace(/[\s€%]/g, '');
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return t === '' ? NaN : Number(t);
}

const eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', useGrouping: 'always' } as Intl.NumberFormatOptions);
const eur0 = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' } as Intl.NumberFormatOptions);
const pct = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 3 });

export const euros = (n: number) => eur.format(n);
export const eurosRedondo = (n: number) => eur0.format(n);
export const porcentaje = (n: number) => `${pct.format(n)} %`;

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
/** "2026-09" → "septiembre de 2026" */
export const mesTexto = (periodo: string) => `${MESES[Number(periodo.slice(5, 7)) - 1]} de ${periodo.slice(0, 4)}`;
/** "2026-10-13" → "13 de octubre de 2026" */
export const fechaTexto = (fecha: string) => `${Number(fecha.slice(8, 10))} de ${mesTexto(fecha)}`;
