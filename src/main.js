import './style.css';
import { getPokemonBatch, getPokemonByName } from './api/pokemonApi.js';
import { normalizePokemon, selectPokemon, summarizePokemon, uniqueTypes } from './logic/pokemonLogic.js';
import { renderStats, renderCards, renderDetails, renderTypeOptions } from './ui/pokemonRender.js';

const $ = id => document.getElementById(id);
const grid = $('pokemonGrid');
const status = $('status');
const loadMoreButton = $('loadMore');
const searchInput = $('searchInput');
const typeFilter = $('typeFilter');
const sortSelect = $('sortSelect');
const dialog = $('detailDialog');
const PAGE_SIZE = 20;
let allPokemon = [];
let offset = 0;
let hasMore = true;
let loading = false;
let requestId = 0;
let searchTimer;
let remoteResult = null;

function setStatus(message = '', isError = false) {
  status.textContent = message;
  status.className = isError ? 'error' : '';
}

function redraw() {
  const query = searchInput.value.trim().toLowerCase();
  const collection = remoteResult && (remoteResult.name === query || String(remoteResult.id) === query)
    ? [...allPokemon.filter(item => item.id !== remoteResult.id), remoteResult]
    : allPokemon;
  const visible = selectPokemon(collection, { search: query, type: typeFilter.value, sort: sortSelect.value });
  renderCards(visible, grid);
  renderStats(summarizePokemon(visible), $('estadisticas'));
  if (!loading && !visible.length) setStatus('No se encontraron Pokémon con estos filtros.');
  else if (!loading) setStatus('');
}

async function loadMore() {
  if (loading || !hasMore) return;
  loading = true;
  loadMoreButton.disabled = true;
  loadMoreButton.textContent = 'Cargando...';
  setStatus('Cargando Pokémon desde PokéAPI...');
  try {
    const batch = await getPokemonBatch(offset, PAGE_SIZE);
    const normalized = batch.pokemon.map(normalizePokemon);
    const byId = new Map([...allPokemon, ...normalized].map(item => [item.id, item]));
    allPokemon = [...byId.values()];
    offset += PAGE_SIZE;
    hasMore = batch.hasMore;
    renderTypeOptions(uniqueTypes(allPokemon), typeFilter);
    if (batch.failed) setStatus(`Aviso: ${batch.failed} Pokémon no pudieron cargarse. Puedes reintentar más tarde.`, true);
  } catch (error) {
    setStatus(`${error.message}. Comprueba tu conexión y pulsa «Cargar más» para reintentar.`, true);
  } finally {
    loading = false;
    loadMoreButton.disabled = !hasMore;
    loadMoreButton.textContent = hasMore ? '↻ Cargar más' : 'Todos cargados';
    const currentStatus = status.textContent;
    const isError = status.classList.contains('error');
    redraw();
    if (isError) setStatus(currentStatus, true);
  }
}

async function searchPokemon() {
  const query = searchInput.value.trim().toLowerCase();
  const thisRequest = ++requestId;
  remoteResult = null;
  if (!query || allPokemon.some(item => item.name === query || String(item.id) === query) || !/^[a-z0-9-]+$/.test(query)) { redraw(); return; }
  redraw();
  setStatus('Buscando en PokéAPI...');
  try {
    const result = normalizePokemon(await getPokemonByName(query));
    if (thisRequest !== requestId) return;
    remoteResult = result;
    redraw();
  } catch (error) {
    if (thisRequest !== requestId) return;
    redraw();
    if (!grid.children.length) setStatus('No encontrado en PokéAPI o error de conexión. Prueba otro nombre o número.', true);
  }
}

loadMoreButton.addEventListener('click', loadMore);
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  ++requestId;
  remoteResult = null;
  redraw();
  searchTimer = setTimeout(searchPokemon, 400);
});
typeFilter.addEventListener('change', redraw);
sortSelect.addEventListener('change', redraw);
grid.addEventListener('click', event => {
  const card = event.target.closest('[data-id]');
  if (!card) return;
  const id = Number(card.dataset.id);
  const item = allPokemon.find(pokemon => pokemon.id === id) ?? (remoteResult?.id === id ? remoteResult : null);
  if (!item) return;
  renderDetails(item, $('detailContent'));
  dialog.showModal();
});
$('closeDetail').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
$('themeToggle').addEventListener('click', () => document.body.classList.toggle('light'));
loadMore();
