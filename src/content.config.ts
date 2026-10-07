import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articulo = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  draft: z.boolean().default(false),
});

export const collections = {
  actualidad: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/actualidad' }), schema: articulo }),
  guias: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/guias' }), schema: articulo }),
};
