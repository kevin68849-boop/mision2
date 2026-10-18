# PokéDex — Async Odyssey (M2)

Aplicación web desarrollada con JavaScript, Vite y la API pública [PokéAPI](https://pokeapi.co/).

## Cómo ejecutarla

Requisitos: Node.js compatible con la versión de Vite instalada y npm.

```bash
npm install
npm run dev
```

Para compilar: `npm run build`.

## Funcionalidades

- Carga de Pokémon en lotes de 20 desde PokéAPI.
- Búsqueda por nombre o número, incluso si el Pokémon no está entre los cargados.
- Filtros por tipo y ordenación de los Pokémon cargados.
- Estadísticas calculadas con `reduce` sobre los resultados visibles.
- Vista de detalles con habilidades, altura, peso y estadísticas base.
- Gestión de errores de red, respuestas HTTP no satisfactorias y lotes parcialmente fallidos.
- Caché de respuestas en `localStorage` durante 24 horas.
- Diseño adaptable y selector de tema.

## Estructura

- `src/api/pokemonApi.js`: peticiones HTTP y caché.
- `src/logic/pokemonLogic.js`: normalización, filtros, ordenación y estadísticas.
- `src/ui/pokemonRender.js`: renderizado del DOM.
- `src/main.js`: eventos y coordinación de la aplicación.
- `src/style.css`: estilos responsive.

## Consideraciones

Los filtros y las estadísticas se aplican a los Pokémon cargados (o al resultado de búsqueda), no a los más de mil Pokémon de la API. El botón «Cargar más» amplía la muestra. La API puede devolver errores de red o limitar peticiones; se ofrece feedback visible.

## Tecnologías

HTML5, CSS3, JavaScript (módulos ES), Vite, Fetch API, localStorage.

## Declaración de uso de IA

**Editar antes de entregar para reflejar el uso real:** Se utilizó ChatGPT como asistencia para generar una primera implementación del proyecto, organizar los módulos, proponer el diseño y documentar el código. El autor revisó y probó el resultado y es responsable de la entrega. No se deben atribuir pruebas o modificaciones que no se hayan realizado.
