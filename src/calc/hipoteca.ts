// Cálculos de la calculadora de hipoteca (sistema francés). Se usan al generar la página y en el navegador.

export interface ResumenAnual {
  anio: number;
  intereses: number;
  capital: number;
  pendiente: number;
}

export interface ResultadoHipoteca {
  cuota: number;
  totalPagado: number;
  totalIntereses: number;
  anios: ResumenAnual[];
}

/** Cuota mensual de un préstamo de `capital` euros, al `tipoAnual` % (TIN), en `meses` cuotas. */
export function cuotaMensual(capital: number, tipoAnual: number, meses: number): number {
  const i = Math.max(tipoAnual, 0) / 100 / 12;
  if (i === 0) return capital / meses;
  return (capital * i) / (1 - Math.pow(1 + i, -meses));
}

export function calcularHipoteca(capital: number, tipoAnual: number, anios: number): ResultadoHipoteca {
  const meses = Math.round(anios * 12);
  const i = Math.max(tipoAnual, 0) / 100 / 12;
  const cuota = cuotaMensual(capital, tipoAnual, meses);
  const resumen: ResumenAnual[] = [];
  let pendiente = capital;
  let totalIntereses = 0;
  for (let m = 1; m <= meses; m++) {
    const interes = pendiente * i;
    const amortizado = Math.min(cuota - interes, pendiente);
    pendiente -= amortizado;
    totalIntereses += interes;
    const anio = Math.ceil(m / 12);
    if (!resumen[anio - 1]) resumen[anio - 1] = { anio, intereses: 0, capital: 0, pendiente: 0 };
    resumen[anio - 1].intereses += interes;
    resumen[anio - 1].capital += amortizado;
    resumen[anio - 1].pendiente = Math.max(pendiente, 0);
  }
  return { cuota, totalPagado: capital + totalIntereses, totalIntereses, anios: resumen };
}

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
