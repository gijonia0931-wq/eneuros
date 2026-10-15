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
