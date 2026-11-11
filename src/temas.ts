// Temas visuales: cada artículo, calculadora o dato recibe un icono y un color según su tema.
// El tema se deduce de la URL y el título, así las noticias nuevas lo reciben solas.
export type Tema = { clave: string; nombre: string; icono: string; color: string; suave: string };

export const TEMAS: Record<string, Tema> = {
  hipoteca: { clave: 'hipoteca', nombre: 'Hipoteca y vivienda', icono: '🏠', color: '#1d5fa8', suave: '#e3eefa' },
  alquiler: { clave: 'alquiler', nombre: 'Alquiler', icono: '🔑', color: '#b4560f', suave: '#fbeadb' },
  luz: { clave: 'luz', nombre: 'Luz y energía', icono: '💡', color: '#a77800', suave: '#fdf3d3' },
  carburantes: { clave: 'carburantes', nombre: 'Carburantes', icono: '⛽', color: '#b3362c', suave: '#fbe3e0' },
  precios: { clave: 'precios', nombre: 'Precios e inflación', icono: '📈', color: '#8a3ea8', suave: '#f2e5f8' },
  trabajo: { clave: 'trabajo', nombre: 'Sueldo y trabajo', icono: '💼', color: '#2f4fb0', suave: '#e4e9fa' },
  ayudas: { clave: 'ayudas', nombre: 'Pensiones y ayudas', icono: '👨‍👩‍👧', color: '#0f7a78', suave: '#dcf2f1' },
  ahorro: { clave: 'ahorro', nombre: 'Ahorro', icono: '🐷', color: '#0f6b3f', suave: '#e0f2e7' },
  general: { clave: 'general', nombre: 'Economía', icono: '📰', color: '#0f5132', suave: '#e3f0e8' },
};

// Orden importante: la primera regla que encaja gana.
const REGLAS: [RegExp, keyof typeof TEMAS][] = [
  [/carburante|gasolina|diesel|diésel/i, 'carburantes'],
  [/\bluz\b|-luz|pvpc|electric/i, 'luz'],
  [/alquiler|fianza|inquilin/i, 'alquiler'],
  [/euribor|euríbor|hipoteca|vivienda|bce|tipos|tin-y-tae/i, 'hipoteca'],
  [/pension|viudedad|monoparental|familia|menopausia/i, 'ayudas'],
  [/ipc|inflaci|precios/i, 'precios'],
  [/salario|sueldo|irpf|nomina|nómina|paro|epa|huelga|pagas|laboral|renta/i, 'trabajo'],
  [/ahorro|letras|deposito|depósito|interes|interés|emergencia|50-30-20/i, 'ahorro'],
];

// Mira primero la URL (más fiable) y, si no encaja, el título.
export function temaDe(...textos: string[]): Tema {
  for (const texto of textos) for (const [re, clave] of REGLAS) if (re.test(texto)) return TEMAS[clave];
  return TEMAS.general;
}

// Minutos de lectura aproximados (unas 220 palabras por minuto).
export function minutosLectura(body?: string): number | undefined {
  if (!body) return undefined;
  return Math.max(1, Math.round(body.split(/\s+/).length / 220));
}
