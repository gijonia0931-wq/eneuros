---
title: "Cómo se calcula la cuota de la hipoteca, paso a paso"
description: "Aprende a calcular la cuota de tu hipoteca con el sistema francés: la fórmula explicada, un ejemplo de 180.000 € y cuánto pagas de intereses al principio."
date: 2026-10-14
---

Cuando el banco te da una cuota, parece un número salido de una caja negra. No lo es. Se calcula con una fórmula concreta que puedes reproducir con una calculadora, y entenderla te ayuda a saber qué estás pagando de verdad: cuánto va a devolver la deuda y cuánto se queda el banco como intereses.

## El sistema francés: la idea básica

En España casi todas las hipotecas usan el **sistema francés de amortización**. "Amortizar" significa devolver la deuda poco a poco. Este sistema tiene una característica que lo define:

**Pagas siempre la misma cuota mientras no cambie el tipo de interés.**

Pero dentro de esa cuota igual, el reparto va cambiando. Cada cuota tiene dos trozos:

- **Intereses:** lo que le pagas al banco por prestarte el dinero. Se calculan sobre lo que todavía debes.
- **Capital (o amortización):** la parte que reduce tu deuda de verdad.

Al principio debes mucho, así que los intereses son altos y a la deuda le llega poco. Con el tiempo debes menos, los intereses bajan y, como la cuota es la misma, cada mes va más dinero a reducir deuda. Es como empujar una bola de nieve al revés: cuesta arrancar y luego se acelera.

## Los tres datos que necesitas

Para calcular la cuota solo necesitas tres cosas:

1. **El capital (P):** el dinero que te presta el banco. No el precio de la casa, sino lo que pides.
2. **El tipo de interés mensual (i):** el banco te da un tipo anual, el TIN (tipo de interés nominal). Para pasarlo a mensual, lo divides entre 12. Un 3 % anual es un 0,25 % mensual, es decir, 0,0025.
3. **El número de cuotas (n):** los años por 12. Una hipoteca a 25 años tiene 300 cuotas.

Ojo: para calcular la cuota se usa el TIN, no la TAE. La TAE sirve para comparar ofertas porque incluye comisiones y otros gastos, pero no es el tipo con el que se calculan tus intereses. Lo explicamos en [TIN y TAE: diferencias](/guias/tin-y-tae-diferencias/).

## La fórmula (sin miedo)

Esta es la fórmula de la cuota del sistema francés:

**Cuota = P x i / (1 - (1 + i)^-n)**

Traducida a palabras: la parte de arriba, P x i, son los intereses del primer mes. La parte de abajo es un factor que reparte la devolución del capital entre todas las cuotas de forma que todas salgan iguales. El símbolo ^-n significa "elevado a menos n", algo que cualquier calculadora científica o una hoja de cálculo hace sin problema.

En una hoja de cálculo ni siquiera necesitas la fórmula. La función PAGO lo hace por ti: `=PAGO(0,03/12; 300; -180000)`.

## Ejemplo completo: 180.000 € a 25 años

Vamos con un caso. Supongamos una hipoteca de **180.000 € a 25 años** con un **TIN del 3 %** (es un tipo hipotético para el ejemplo, no una oferta real).

### Paso 1: prepara los datos

- P = 180.000 €
- i = 0,03 / 12 = 0,0025
- n = 25 x 12 = 300

### Paso 2: calcula la parte de arriba

P x i = 180.000 x 0,0025 = **450 €**. Esto son los intereses del primer mes.

### Paso 3: calcula la parte de abajo

Primero, (1 + i)^-n = 1,0025^-300 = 0,472809 (redondeado).

Después, 1 - 0,472809 = **0,527191**.

### Paso 4: divide

Cuota = 450 / 0,527191 = **853,58 € al mes**.

Esa es la cuota que pagarías durante 25 años si el tipo no cambia.

### Paso 5: el primer mes, desglosado

- Intereses del mes 1: 180.000 x 0,0025 = **450,00 €**
- Capital del mes 1: 853,58 - 450,00 = **403,58 €**
- Lo que debes después: 180.000 - 403,58 = **179.596,42 €**

En el mes 2 se repite la cuenta con la nueva deuda:

- Intereses: 179.596,42 x 0,0025 = **448,99 €**
- Capital: 853,58 - 448,99 = **404,59 €**
- Lo que debes: 179.596,42 - 404,59 = **179.191,83 €**

Fíjate: los intereses han bajado 1,01 € y el capital ha subido lo mismo. Así, mes a mes, durante 300 meses.

## Cuánto es interés y cuánto capital el primer año

Si sumas las 12 primeras cuotas:

| Concepto | Primer año |
|---|---|
| Total pagado (853,58 x 12) | 10.242,96 € |
| De eso, intereses | 5.332,85 € |
| De eso, capital | 4.910,11 € |
| Deuda al terminar el año | 175.089,89 € |

Es decir, de los 10.242,96 € que pagas el primer año, **más de la mitad (el 52 %) son intereses**. Tu deuda solo baja 4.910,11 €.

Con este tipo de interés, el punto de cruce llega pronto: a partir del mes 24, cada cuota ya lleva más capital que intereses. Con tipos más altos, ese cruce tarda bastante más en llegar.

## Cómo cambia el reparto a lo largo de los años

| Año | Intereses pagados ese año | Capital devuelto ese año | Deuda al final del año |
|---|---|---|---|
| 1 | 5.332,85 € | 4.910,11 € | 175.089,89 € |
| 5 | 4.707,66 € | 5.535,31 € | 153.909,86 € |
| 10 | 3.813,06 € | 6.429,91 € | 123.603,11 € |
| 15 | 2.773,88 € | 7.469,09 € | 88.398,28 € |
| 20 | 1.566,75 € | 8.676,22 € | 47.503,76 € |
| 25 | 164,52 € | 10.078,44 € | 0 € |

Cada año pagas lo mismo (10.242,96 €), pero el último año casi todo es capital. Esto tiene una consecuencia práctica: **amortizar anticipadamente ahorra mucho más al principio que al final**, porque es cuando más intereses estás pagando. Lo vemos con números en [amortizar hipoteca: cuota o plazo](/guias/amortizar-hipoteca-cuota-o-plazo/).

## Cuánto pagas en total

Si el tipo no cambia, al final habrás pagado 300 cuotas de 853,58 €, que son unos **256.074 €**. Como te prestaron 180.000 €, los intereses totales rondan los **76.074 €** (la cifra exacta puede variar unos céntimos porque la última cuota se ajusta por el redondeo).

Eso es un 42 % de lo que pediste prestado. Ese porcentaje sube mucho si alargas el plazo o si el tipo es más alto.

## Qué pasa si tu hipoteca es variable

En una hipoteca variable se usa exactamente la misma fórmula, pero se recalcula en cada revisión (normalmente cada 6 o 12 meses) con tres datos nuevos:

- **P:** lo que debes en ese momento, no lo que pediste al principio.
- **i:** el nuevo tipo, que es el Euríbor de referencia más tu diferencial, dividido entre 12.
- **n:** las cuotas que te quedan.

Por eso, si el Euríbor sube, tu cuota sube, aunque ya lleves años pagando. Tienes un ejemplo de revisión en [qué es el Euríbor](/guias/que-es-el-euribor/).

## Tres trucos para comprobar a tu banco

- **El primer mes lo puedes hacer de cabeza:** deuda x tipo anual / 12. Si debes 180.000 € al 3 %, son 450 € de intereses. Si el recibo dice otra cosa, pregunta.
- **Revisa el cuadro de amortización.** Pídeselo a tu banco o búscalo en tu banca online: en él aparece, cuota a cuota, cuánto es interés y cuánto capital.
- **Cuidado con alargar el plazo.** Bajar la cuota alargando años parece un alivio, pero casi siempre sube mucho el total de intereses.

## En resumen

- En el sistema francés pagas una cuota igual, pero al principio casi la mitad o más son intereses y al final casi todo es capital.
- La fórmula es Cuota = P x i / (1 - (1 + i)^-n), con el TIN mensual y el número de cuotas. En una hoja de cálculo basta con la función PAGO.
- 180.000 € a 25 años al 3 % salen a 853,58 € al mes; el primer año pagas 5.332,85 € de intereses y solo devuelves 4.910,11 € de deuda.
- En total pagarías unos 76.074 € de intereses, un 42 % de lo que pediste.
- En una variable, la cuota se recalcula en cada revisión con la deuda pendiente, el nuevo tipo y las cuotas que quedan.

## Fuentes

- [BOE: Ley 5/2019, reguladora de los contratos de crédito inmobiliario](https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814)
- [BOE: Circular 5/2017 del Banco de España, sobre tipos de referencia oficiales](https://www.boe.es/eli/es/cir/2017/12/22/5)
