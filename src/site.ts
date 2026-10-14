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

// Datos del titular de la web. La ley (LSSI) obliga a mostrarlos en el aviso legal.
export const TITULAR = {
  nombre: 'Elías García Sánchez',
  nif: '53778829E',
  domicilio: 'C/ Torcuato Fernández Miranda nº 12, 7º D, 33203 Gijón (Asturias)',
  email: 'gijonia0931@gmail.com',
};

export const LEGAL_ACTUALIZADO = '14 de octubre de 2026';

export const LEGAL_NAV = [
  { href: '/sobre-eneuros/', label: 'Sobre eneuros' },
  { href: '/contacto/', label: 'Contacto' },
  { href: '/aviso-legal/', label: 'Aviso legal' },
  { href: '/privacidad/', label: 'Privacidad' },
  { href: '/cookies/', label: 'Cookies' },
];

// Temas de las guías: ordenan el índice de /guias/ y las "guías relacionadas" de cada artículo.
export const TEMAS_GUIAS = [
  { titulo: 'Hipoteca y vivienda', guias: ['que-es-el-euribor', 'hipoteca-fija-variable-o-mixta', 'como-se-calcula-la-cuota-de-la-hipoteca', 'tin-y-tae-diferencias', 'amortizar-hipoteca-cuota-o-plazo', 'gastos-de-comprar-una-vivienda'] },
  { titulo: 'Nómina e impuestos', guias: ['sueldo-bruto-a-neto', 'tramos-irpf', 'retenciones-irpf-nomina', 'pagas-extra-prorrateadas'] },
  { titulo: 'Alquiler', guias: ['actualizar-alquiler-ipc', 'fianza-del-alquiler', 'cuanto-alquiler-puedo-pagar'] },
  { titulo: 'Factura de la luz', guias: ['como-leer-la-factura-de-la-luz', 'pvpc-o-mercado-libre', 'tramos-horarios-luz', 'potencia-contratada-luz'] },
  { titulo: 'Ahorro y presupuesto', guias: ['regla-50-30-20', 'fondo-de-emergencia', 'interes-compuesto', 'depositos-y-cuentas-remuneradas', 'letras-del-tesoro', 'que-es-el-ipc'] },
];
