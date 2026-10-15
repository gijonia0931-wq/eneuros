import type { APIRoute } from 'astro';
import { publicados } from '../lib';
import { SITE } from '../site';

// Feed RSS con las guías y las noticias: lo usan lectores de feeds, agregadores y Google Discover.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const base = site!.href.replace(/\/$/, '');
  const [guias, actualidad] = await Promise.all([publicados('guias'), publicados('actualidad')]);
  const items = [
    ...guias.map((e) => ({ e, url: `${base}/guias/${e.id}/` })),
    ...actualidad.map((e) => ({ e, url: `${base}/actualidad/${e.id}/` })),
  ].sort((a, b) => b.e.data.date.getTime() - a.e.data.date.getTime());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(SITE.name)}</title>
<link>${base}/</link>
<description>${esc(SITE.description)}</description>
<language>es-es</language>
<atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items
  .map(({ e, url }) => `<item>
<title>${esc(e.data.title)}</title>
<link>${url}</link>
<guid>${url}</guid>
<description>${esc(e.data.description)}</description>
<pubDate>${e.data.date.toUTCString()}</pubDate>
</item>`)
  .join('\n')}
</channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
