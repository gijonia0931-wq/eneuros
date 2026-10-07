# eneuros.es

La economía explicada en euros. Web estática hecha con [Astro](https://astro.build) y publicada en Cloudflare Pages.

## Secciones

- `/calculadoras/` – calculadoras (hipoteca, alquiler IPC, sueldo neto, luz, interés compuesto)
- `/datos/` – datos al día (luz, Euríbor, IPC, gasolina)
- `/actualidad/` – noticias explicadas (`src/content/actualidad/*.md`)
- `/guias/` – guías (`src/content/guias/*.md`)
- `/newsletter/`

## Publicar un artículo

Crea un archivo `.md` en `src/content/actualidad/` o `src/content/guias/`:

```md
---
title: "Título"
description: "Resumen de una o dos frases"
date: 2026-10-07
---

Texto del artículo...
```

Al subirlo a la rama `main`, Cloudflare Pages vuelve a publicar la web sola.

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`

## Desarrollo

```sh
npm install
npm run dev
```
