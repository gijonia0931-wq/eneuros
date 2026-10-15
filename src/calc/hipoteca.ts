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

export { leerNumero, euros, eurosRedondo, porcentaje } from './formato';
