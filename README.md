# PokeDex — Async Odyssey (M2)

Misión M2 Async Odyssey

## Cómo probarlo

Abre el proyecto en VS Code y ejecuta desde la terminal:

```bash

npm install
npm run dev

```

Abre la dirección local que proporciona Vite (normalmente http://localhost:5173/).

La aplicación carga inicialmente 20 Pokemon desde PokeAPI. Puedes buscar Pokemon por nombre o número, filtrarlos por tipo, ordenarlos por estadísticas y pulsar sobre sus tarjetas para consultar información detallada.

Pulsa «Cargar más» para solicitar otros 20 Pokemon. También puedes buscar uno que todavía no se haya descargado, como Mewtwo.


Para ejecutar:
```
bash
npm run build

```

## Uso de IA

utilice la sobre la estructuracion de carpetas y logica, para que me ayudara a instalar y saber como funcionaba `vite`, despues la pedi que me pusiera un buen ejemplo para este proyecto, en base a eso elegi la api de pokemon para hacer una Pokedex, segun avanzana le fui pidiendo a la ia sobre todo ayuda para la la integracion de todos los documentos, al final mayoritariamente el trabajo ha sido hecho con ia, siempre pidiendo explicacion del por que ha usado lo que ha usado.
IA usada: ChatGPT 

ejemplos de prompts:

`Siguiendo los requisitos de la rúbrica de Async Odyssey, propón una aplicación que utilice fetch, async/await, métodos de arrays y módulos ES`

`Crea un boceto visual de una Pokédex con diseño oscuro, tarjetas de Pokémon, filtros por tipo, búsqueda y estadísticas generales`

`Organiza una aplicación con Vite, separando el código JavaScript en módulos responsables de las peticiones a la API, la transformación de datos y la actualización del DOM`

`Implementa las peticiones a PokeAPI utilizando fetch y async/await, comprobando response.ok y gestionando posibles errores con try/catch`

`Utiliza map, filter y reduce para transformar los datos de PokeAPI, permitir búsquedas por nombre y tipo y calcular estadísticas generales de los Pokémon`

`Implementa un sistema de caché utilizando localStorage para evitar peticiones repetidas a PokeAPI y establece un tiempo de caducidad para los datos»`

`Comprueba que la aplicación cumple todos los requisitos de la rúbrica y compara las técnicas utilizadas con los apuntes de las unidades 1, 2 y 3 de JavaScript`

`Explícame paso a paso cómo funciona la aplicación, desde que se solicita información a PokeAPI hasta que se muestran las tarjetas en el DOM`

## Autopsia

1. Separé la aplicación en módulos con responsabilidades diferentes: `pokemonApi.js` gestiona las peticiones HTTP y la caché, `pokemonLogic.js` transforma los datos mediante `map`, `filter` y `reduce`, y `pokemonRender.js` actualiza el DOM. `main.js` coordina los módulos y gestiona los eventos. Descarté concentrar todo el código en un único archivo porque dificultaría su mantenimiento y reutilización.

2. Utilicé `Promise.allSettled()` para obtener los detalles de varios Pokemon mediante peticiones concurrentes. Elegí este método frente a `Promise.all()` porque permite conservar las respuestas correctas aunque alguna petición individual falle. También implementé una caché en `localStorage` con una duración de 24 horas para evitar repetir peticiones innecesarias a PokeAPI.