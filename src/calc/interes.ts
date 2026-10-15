// Interés compuesto con aportaciones mensuales, como en la guía: rentabilidad anual convertida a mensual
// compuesta ((1 + r)^(1/12) − 1), aportaciones al final de cada mes y comisión restada de la rentabilidad.

export interface DatosInteres {
  inicial: number; // capital de partida
  mensual: number; // aportación al final de cada mes
  anios: number;
  rentabilidad: number; // % anual
  comision: number; // % anual
  inflacion: number; // % anual
}

export interface FilaInteres {
  anio: number;
  aportado: number;
  saldo: number;
}

export interface ResultadoInteres {
  final: number;
  aportado: number;
  intereses: number;
  finalSinComision: number;
  costeComision: number;
  enEurosDeHoy: number;
  rentabilidadNeta: number; // %
  rentabilidadReal: number; // %, después de comisión e inflación
  evolucion: FilaInteres[];
}

function saldo(inicial: number, mensual: number, meses: number, anual: number): number {
  const i = Math.pow(1 + anual / 100, 1 / 12) - 1;
  const crece = Math.pow(1 + i, meses);
  return inicial * crece + (i === 0 ? mensual * meses : (mensual * (crece - 1)) / i);
}

export function calcularInteres(d: DatosInteres): ResultadoInteres {
  const meses = Math.round(d.anios * 12);
  const neta = d.rentabilidad - d.comision;
  const final = saldo(d.inicial, d.mensual, meses, neta);
  const finalSinComision = saldo(d.inicial, d.mensual, meses, d.rentabilidad);
  const aportado = d.inicial + d.mensual * meses;
  const evolucion: FilaInteres[] = [];
  for (let a = 1; a <= Math.ceil(d.anios); a++) {
    const m = Math.min(a * 12, meses);
    evolucion.push({ anio: a, aportado: d.inicial + d.mensual * m, saldo: saldo(d.inicial, d.mensual, m, neta) });
  }
  return {
    final,
    aportado,
    intereses: final - aportado,
    finalSinComision,
    costeComision: finalSinComision - final,
    enEurosDeHoy: final / Math.pow(1 + d.inflacion / 100, meses / 12),
    rentabilidadNeta: neta,
    rentabilidadReal: ((1 + neta / 100) / (1 + d.inflacion / 100) - 1) * 100,
    evolucion,
  };
}
