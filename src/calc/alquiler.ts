// Cálculo de la actualización anual de la renta de un alquiler de vivienda (art. 18 LAU y topes vigentes).

export type Firma = 'antes2023' | 'desde2023';
export type Clausula = 'ipc' | 'irav' | 'ninguna';

export interface DatosAlquiler {
  renta: number;
  firma: Firma;
  clausula: Clausula;
  ipc: number; // %
  irav: number; // %
  superaReferencia: boolean;
  tope: { vigente: boolean; porcentaje: number } ;
}

export interface ResultadoAlquiler {
  porcentaje: number; // subida máxima aplicable, %
  subidaMes: number;
  rentaNueva: number;
  motivos: string[];
}

const pct = (n: number) => `${n.toLocaleString('es-ES', { maximumFractionDigits: 2 })} %`;

export function actualizarAlquiler(d: DatosAlquiler): ResultadoAlquiler {
  const motivos: string[] = [];
  let p: number;

  if (d.clausula === 'ninguna') {
    motivos.push('Tu contrato no dice que la renta se actualice, así que no se puede subir mientras dure el contrato y sus prórrogas.');
    return { porcentaje: 0, subidaMes: 0, rentaNueva: d.renta, motivos };
  }

  if (d.firma === 'desde2023') {
    if (d.clausula === 'ipc') {
      p = Math.min(d.ipc, d.irav);
      motivos.push(
        d.ipc > d.irav
          ? `Tu contrato dice IPC (${pct(d.ipc)}), pero en contratos firmados desde el 26 de mayo de 2023 la subida no puede pasar del índice del INE para alquileres (IRAV): ${pct(d.irav)}.`
          : `Tu contrato dice IPC (${pct(d.ipc)}), que está por debajo del límite del índice del INE para alquileres (IRAV, ${pct(d.irav)}).`,
      );
    } else {
      p = d.irav;
      motivos.push(`En contratos firmados desde el 26 de mayo de 2023 se usa el índice del INE para alquileres (IRAV): ${pct(d.irav)}.`);
    }
  } else if (d.clausula === 'ipc') {
    p = d.ipc;
    motivos.push(`Tu contrato es anterior a mayo de 2023 y dice IPC, así que se usa el IPC: ${pct(d.ipc)}.`);
  } else {
    p = 2;
    motivos.push('En contratos anteriores a mayo de 2023 que prevén subir la renta sin decir con qué índice, la ley remite en general al Índice de Garantía de Competitividad, que nunca pasa del 2 %. Calculamos con ese máximo; si tu contrato es de antes de 2015, revisa su texto.');
  }

  p = Math.max(p, 0);

  if (d.tope.vigente) {
    if (d.superaReferencia) {
      motivos.push('Tu renta supera el precio de referencia oficial de tu zona, así que con el tope extraordinario actual no puede subir.');
      p = 0;
    } else if (p > d.tope.porcentaje) {
      motivos.push(`Con el tope extraordinario actual, si no llegáis a otro acuerdo la subida no puede pasar del ${pct(d.tope.porcentaje)}.`);
      p = d.tope.porcentaje;
    } else {
      motivos.push(`El tope extraordinario actual (${pct(d.tope.porcentaje)}) no te afecta, porque tu subida ya es menor.`);
    }
  }

  const subidaMes = Math.round(d.renta * p) / 100;
  return { porcentaje: p, subidaMes, rentaNueva: d.renta + subidaMes, motivos };
}
