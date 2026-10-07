import { getCollection } from 'astro:content';

export async function publicados(col: 'actualidad' | 'guias') {
  const items = await getCollection(col, ({ data }) => !data.draft);
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
