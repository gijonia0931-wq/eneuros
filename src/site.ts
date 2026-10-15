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
];

// Google AdSense. Pon aquí tu ID de editor ("ca-pub-" y 16 cifras, lo ves en AdSense > Cuenta > Información de la cuenta).
// Con el ID puesto, la web carga el código de AdSense, publica /ads.txt y cambia nuestro aviso de cookies
// por el mensaje de consentimiento de Google (obligatorio para mostrar anuncios en Europa). Vacío = sin AdSense.
export const ADSENSE = { client: 'ca-pub-5135223922581195' };

// Último Euríbor a 12 meses oficial (media mensual, Banco de España). Actualizar cada mes.
export const EURIBOR = { valor: 3.247, mes: 'septiembre de 2026' };

// Últimos índices del INE para actualizar alquileres (tasa anual, %). Actualizar cada mes.
export const INDICES_ALQUILER = { ipc: 4.9, irav: 2.54, mes: 'septiembre de 2026' };

// Tope extraordinario a las subidas de alquiler (Real Decreto-ley 29/2026). Si el Congreso no lo convalida
// o deja de estar en vigor, pon `vigente: false` y la calculadora volverá a la regla general.
export const TOPE_ALQUILER = {
  vigente: true,
  porcentaje: 2,
  norma: 'Real Decreto-ley 29/2026',
  desde: '8 de octubre de 2026',
  hasta: '31 de diciembre de 2027',
  boe: 'https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823',
};

// Impuestos de la luz vigentes (%). Si se activa una rebaja temporal, cámbialos aquí.
export const IMPUESTOS_LUZ = { electrico: 5.11269632, iva: 21, actualizado: 'octubre de 2026' };

// `disponible: true` hace que la tarjeta enlace a /calculadoras/<slug>/ en vez de mostrar "Próximamente".
export const CALCULADORAS = [
  { slug: 'hipoteca', title: 'Hipoteca y Euríbor', desc: 'Cuánto pagarás al mes y cómo te afecta la subida o bajada del Euríbor.', disponible: true },
  { slug: 'alquiler-ipc', title: 'Actualizar alquiler con el IPC', desc: 'Calcula la nueva renta de tu alquiler según el IPC o el índice oficial.', disponible: true },
  { slug: 'sueldo-neto', title: 'Sueldo neto 2026', desc: 'De bruto a neto: IRPF y Seguridad Social con las tablas de 2026.', disponible: true },
  { slug: 'factura-luz', title: 'Factura de la luz', desc: 'Compara PVPC y mercado libre según tu consumo y potencia.', disponible: true },
  { slug: 'interes-compuesto', title: 'Interés compuesto', desc: 'Cuánto crece tu ahorro con aportaciones mensuales y rentabilidad.', disponible: true },
];

// Últimos datos oficiales de /datos/ y de la portada. Actualizar cada mes junto con EURIBOR e INDICES_ALQUILER.
export const DATOS = [
  {
    title: 'Euríbor a 12 meses',
    valor: `${EURIBOR.valor.toLocaleString('es-ES', { minimumFractionDigits: 3 })} %`,
    detalle: `Media de ${EURIBOR.mes}. Es el índice con el que se revisan la mayoría de hipotecas variables.`,
    fuente: 'Banco de España',
    articulo: '/actualidad/euribor-septiembre-2026/',
    calculadora: 'hipoteca',
  },
  {
    title: 'IPC (inflación)',
    valor: `${INDICES_ALQUILER.ipc.toLocaleString('es-ES')} %`,
    detalle: `Tasa anual de ${INDICES_ALQUILER.mes}. Mide cuánto han subido los precios en un año.`,
    fuente: 'INE',
    articulo: '/actualidad/ipc-septiembre-2026/',
    calculadora: 'alquiler-ipc',
  },
  {
    title: 'Índice de alquileres (IRAV)',
    valor: `${INDICES_ALQUILER.irav.toLocaleString('es-ES')} %`,
    detalle: `Dato de ${INDICES_ALQUILER.mes}. Es el tope de subida anual de los alquileres firmados desde mayo de 2023.`,
    fuente: 'INE',
    articulo: '/guias/actualizar-alquiler-ipc/',
    calculadora: 'alquiler-ipc',
  },
  {
    title: 'Factura de la luz (PVPC)',
    valor: '104,31 €',
    detalle: 'Recibo de septiembre de 2026 de un usuario medio con tarifa regulada (4,4 kW y 366 kWh al mes).',
    fuente: 'Facua-Consumidores en Acción',
    articulo: '/actualidad/factura-luz-septiembre-2026/',
    calculadora: 'factura-luz',
  },
  {
    title: 'Gasolina 95',
    valor: '1,787 €/l',
    detalle: 'Precio medio en España a 13 de octubre de 2026. El diésel estaba a 1,887 €/l.',
    fuente: 'Ministerio para la Transición Ecológica',
    articulo: '/actualidad/precio-carburantes-octubre-2026/',
  },
];

// Datos del titular de la web. La ley (LSSI) obliga a mostrarlos en el aviso legal.
export const TITULAR = {
  nombre: 'Elías García Sánchez',
  nif: '53778829E',
  domicilio: 'C/ Torcuato Fernández Miranda nº 12, 7º D, 33203 Gijón (Asturias)',
  email: 'gijonia0931@gmail.com',
};

export const LEGAL_ACTUALIZADO = '15 de octubre de 2026';

export const LEGAL_NAV = [
  { href: '/sobre-eneuros/', label: 'Sobre eneuros' },
  { href: '/contacto/', label: 'Contacto' },
  { href: '/aviso-legal/', label: 'Aviso legal' },
  { href: '/privacidad/', label: 'Privacidad' },
  { href: '/cookies/', label: 'Cookies' },
];

// Temas de las guías: ordenan el índice de /guias/ y las "guías relacionadas" de cada artículo.
export const TEMAS_GUIAS = [
  { titulo: 'Hipoteca y vivienda', calculadora: 'hipoteca', guias: ['que-es-el-euribor', 'hipoteca-fija-variable-o-mixta', 'como-se-calcula-la-cuota-de-la-hipoteca', 'tin-y-tae-diferencias', 'amortizar-hipoteca-cuota-o-plazo', 'gastos-de-comprar-una-vivienda'] },
  { titulo: 'Nómina e impuestos', calculadora: 'sueldo-neto', guias: ['sueldo-bruto-a-neto', 'tramos-irpf', 'retenciones-irpf-nomina', 'pagas-extra-prorrateadas'] },
  { titulo: 'Alquiler', calculadora: 'alquiler-ipc', guias: ['actualizar-alquiler-ipc', 'fianza-del-alquiler', 'cuanto-alquiler-puedo-pagar'] },
  { titulo: 'Factura de la luz', calculadora: 'factura-luz', guias: ['como-leer-la-factura-de-la-luz', 'pvpc-o-mercado-libre', 'tramos-horarios-luz', 'potencia-contratada-luz'] },
  { titulo: 'Ahorro y presupuesto', calculadora: 'interes-compuesto', guias: ['regla-50-30-20', 'fondo-de-emergencia', 'interes-compuesto', 'depositos-y-cuentas-remuneradas', 'letras-del-tesoro', 'que-es-el-ipc'] },
];
