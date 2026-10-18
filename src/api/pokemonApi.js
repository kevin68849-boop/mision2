const BASE_URL = 'https://pokeapi.co/api/v2';
const CACHE_PREFIX = 'pokedex-m2-v1:';
const CACHE_TTL = 24 * 60 * 60 * 1000;

async function fetchJson(url) {
  const key = CACHE_PREFIX + url;
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Date.now() - parsed.savedAt < CACHE_TTL) return parsed.data;
      localStorage.removeItem(key);
    }
  } catch { /* La app sigue funcionando aunque el almacenamiento esté deshabilitado. */ }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error HTTP ${response.status} al consultar PokéAPI`);
  const data = await response.json();
  try { localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data })); } catch { /* Cuota llena o almacenamiento restringido. */ }
  return data;
}

export async function getPokemonBatch(offset = 0, limit = 20) {
  const list = await fetchJson(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const settled = await Promise.allSettled(list.results.map(item => fetchJson(item.url)));
  const pokemon = settled.filter(result => result.status === 'fulfilled').map(result => result.value);
  if (!pokemon.length && list.results.length) throw new Error('No se han podido obtener los detalles de los Pokémon.');
  return { pokemon, failed: settled.length - pokemon.length, hasMore: Boolean(list.next), count: list.count };
}

export async function getPokemonByName(name) {
  return fetchJson(`${BASE_URL}/pokemon/${encodeURIComponent(String(name).toLowerCase())}`);
}
