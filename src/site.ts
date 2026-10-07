export const SITE = {
  name: 'eneuros',
  tagline: 'La economía explicada en euros',
  description:
    'Calculadoras, datos oficiales al día y explicaciones claras sobre hipotecas, sueldos, alquiler, luz e inflación en España.',
};

export const NAV = [
  { href: '/calculadoras/', label: 'Calculadoras' },
  { href: '/datos/', label: 'Datos al día' },
  { href: '/actualidad/', label: 'Actualidad' },
  { href: '/guias/', label: 'Guías' },
  { href: '/newsletter/', label: 'Newsletter' },
];

export const CALCULADORAS = [
  { slug: 'hipoteca', title: 'Hipoteca y Euríbor', desc: 'Cuánto pagarás al mes y cómo te afecta la subida o bajada del Euríbor.' },
  { slug: 'alquiler-ipc', title: 'Actualizar alquiler con el IPC', desc: 'Calcula la nueva renta de tu alquiler según el IPC o el índice oficial.' },
  { slug: 'sueldo-neto', title: 'Sueldo neto 2026', desc: 'De bruto a neto: IRPF y Seguridad Social con las tablas de 2026.' },
  { slug: 'factura-luz', title: 'Factura de la luz', desc: 'Compara PVPC y mercado libre según tu consumo y potencia.' },
  { slug: 'interes-compuesto', title: 'Interés compuesto', desc: 'Cuánto crece tu ahorro con aportaciones mensuales y rentabilidad.' },
];

export const DATOS = [
  { slug: 'precio-luz', title: 'Precio de la luz hoy', desc: 'Precio PVPC por horas, actualizado cada día.' },
  { slug: 'euribor', title: 'Euríbor hoy', desc: 'Valor diario y media mensual del Euríbor a 12 meses.' },
  { slug: 'ipc', title: 'IPC e inflación', desc: 'Último dato del INE y evolución de los precios.' },
  { slug: 'gasolina', title: 'Precio de la gasolina', desc: 'Precio medio de gasolina y diésel en España.' },
];
