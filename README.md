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

## Páginas legales y cookies

- `/aviso-legal/`, `/privacidad/` y `/cookies/` usan los datos del titular de `TITULAR` en `src/site.ts`.
- El aviso de cookies (`src/components/CookieBanner.astro`) usa Google Consent Mode v2: la publicidad empieza denegada hasta que la persona elige. Cualquier elemento con `data-cookie-settings` vuelve a abrir el aviso.

## Calculadoras

- Cada calculadora es una página en `src/pages/calculadoras/<slug>.astro`, con sus cuentas en `src/calc/`.
- Para que su tarjeta enlace a la página en vez de mostrar "Próximamente", pon `disponible: true` en `CALCULADORAS` (`src/site.ts`).
- Los índices del alquiler (IPC e IRAV) están en `INDICES_ALQUILER` y el tope extraordinario del 2 % en `TOPE_ALQUILER` (`src/site.ts`). Si el tope deja de estar en vigor, pon `vigente: false`.
- La calculadora de sueldo neto (`src/calc/sueldo.ts`) usa las cotizaciones de 2026 y el algoritmo de retenciones 2026 de la Agencia Tributaria: hay que revisarla cada enero.
- El Euríbor que usa la calculadora de hipoteca está en `EURIBOR` (`src/site.ts`): actualízalo cada mes con el dato oficial del Banco de España.
