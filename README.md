# eneuros.es

La economía explicada en euros. Web estática hecha con [Astro](https://astro.build) y publicada en Cloudflare Pages.

## Secciones

- `/calculadoras/` – calculadoras (hipoteca, alquiler IPC, sueldo neto, luz, interés compuesto)
- `/datos/` – datos al día (luz, Euríbor, IPC, IRAV, gasolina) y `/datos/precio-luz-hoy/` con el PVPC hora a hora
- `/actualidad/` – noticias explicadas (`src/content/actualidad/*.md`)
- `/guias/` – guías (`src/content/guias/*.md`)

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
- El tope extraordinario del 2 % en `TOPE_ALQUILER` (`src/site.ts`). Si el tope deja de estar en vigor, pon `vigente: false`.
- La calculadora de sueldo neto (`src/calc/sueldo.ts`) usa las cotizaciones de 2026 y el algoritmo de retenciones 2026 de la Agencia Tributaria: hay que revisarla cada enero.
- Los impuestos de la luz (impuesto eléctrico e IVA) están en `IMPUESTOS_LUZ` (`src/site.ts`): cámbialos si se activa una rebaja.

## Datos que se actualizan solos

La GitHub Action **Actualizar datos** (`.github/workflows/actualizar-datos.yml`) ejecuta `scripts/actualizar-datos.mjs` cinco veces al día. El script trae los datos de las fuentes oficiales y los guarda en `src/data/datos.json`; si algo cambia, hace un commit en `main` y Cloudflare Pages vuelve a publicar la web.

| Dato | Fuente | Cada cuánto cambia |
| --- | --- | --- |
| Precio de la luz PVPC por horas (hoy y mañana) | Red Eléctrica (apidatos.ree.es) | Diario, mañana desde las 20:30 |
| Gasolina 95 y diésel (media de las gasolineras) | Ministerio para la Transición Ecológica | Diario |
| Euríbor a 12 meses (media mensual) | Banco Central Europeo (mismo dato que el Banco de España) | Mensual |
| IPC, tasa anual (serie `IPC290750`) | INE | Mensual |
| IRAV, índice de alquileres (serie `IRAV1`) | INE | Mensual |

Con esos datos se rellenan solos `/datos/`, la portada, la página del precio de la luz y las calculadoras de hipoteca, alquiler y factura de la luz. En el navegador, la tarjeta y la página de la luz pasan solas al día siguiente a medianoche.

Si una fuente falla, se mantienen los datos anteriores y la ejecución queda en rojo (GitHub avisa por correo). Para lanzarla a mano: pestaña *Actions* > *Actualizar datos* > *Run workflow*.

Lo que cambia por ley y no tiene fuente automática se sigue revisando a mano: tablas de la calculadora de sueldo neto (`src/calc/sueldo.ts`, cada enero), impuestos de la luz (`IMPUESTOS_LUZ`) y tope de los alquileres (`TOPE_ALQUILER`).
