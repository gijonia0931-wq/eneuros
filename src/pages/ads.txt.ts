import type { APIRoute } from 'astro';
import { ADSENSE } from '../site';

// ads.txt: declara a Google como vendedor autorizado de los anuncios de esta web.
export const GET: APIRoute = () => {
  const pub = ADSENSE.client.replace(/^ca-/, '');
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : '# eneuros.es todavía no muestra anuncios.\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
