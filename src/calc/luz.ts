// Factura de la luz doméstica (tarifa de acceso 2.0TD): potencia + energía + impuesto eléctrico + contador + IVA.

export type Tarifa =
  | { p1: number; p2: number; tipo: 'unico'; precio: number }
  | { p1: number; p2: number; tipo: 'tramos'; punta: number; llano: number; valle: number };

export interface DatosFactura {
  dias: number;
  potenciaP1: number; // kW
  potenciaP2: number; // kW
  kwh: number; // consumo del periodo
  repartoPunta: number; // % del consumo en punta (solo tarifas con tramos)
  repartoLlano: number; // % en llano; el resto es valle
  contadorMes: number; // € al mes
  impuestoElectrico: number; // %
  iva: number; // %
}

export interface Factura {
  potencia: number;
  energia: number;
  impuesto: number;
  contador: number;
  iva: number;
  total: number;
  precioMedioKwh: number; // total / kWh, impuestos incluidos
}

const red2 = (n: number) => Math.round(n * 100) / 100;

export function factura(d: DatosFactura, t: Tarifa): Factura {
  const potencia = red2(d.potenciaP1 * d.dias * t.p1) + red2(d.potenciaP2 * d.dias * t.p2);
  let energia: number;
  if (t.tipo === 'unico') energia = red2(d.kwh * t.precio);
  else {
    const punta = (d.kwh * d.repartoPunta) / 100;
    const llano = (d.kwh * d.repartoLlano) / 100;
    const valle = d.kwh - punta - llano;
    energia = red2(punta * t.punta) + red2(llano * t.llano) + red2(valle * t.valle);
  }
  // Mínimo del impuesto eléctrico en uso doméstico: 1 € por MWh consumido.
  const impuesto = red2(Math.max(((potencia + energia) * d.impuestoElectrico) / 100, d.kwh * 0.001));
  const contador = red2(((d.contadorMes * 12) / 365) * d.dias);
  const iva = red2(((potencia + energia + impuesto + contador) * d.iva) / 100);
  const total = red2(potencia + energia + impuesto + contador + iva);
  return { potencia, energia, impuesto, contador, iva, total, precioMedioKwh: d.kwh > 0 ? total / d.kwh : 0 };
}
