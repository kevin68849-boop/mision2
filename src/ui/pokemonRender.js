const typeLabels = { normal:'Normal', fire:'Fuego', water:'Agua', electric:'Eléctrico', grass:'Planta', ice:'Hielo', fighting:'Lucha', poison:'Veneno', ground:'Tierra', flying:'Volador', psychic:'Psíquico', bug:'Bicho', rock:'Roca', ghost:'Fantasma', dragon:'Dragón', dark:'Siniestro', steel:'Acero', fairy:'Hada' };
const statLabels = { hp:'HP', attack:'Ataque', defense:'Defensa', 'special-attack':'Ataque esp.', 'special-defense':'Defensa esp.', speed:'Velocidad' };
const cap = text => text.charAt(0).toUpperCase() + text.slice(1).replaceAll('-', ' ');
const typePills = types => types.map(type => `<span class="type type-${type}">${typeLabels[type] ?? cap(type)}</span>`).join('');

export function renderStats(summary, target) {
  target.innerHTML = [
    ['◉', summary.count, 'Pokémon cargados'], ['↗', summary.averageAttack, 'Ataque medio'],
    ['♥', summary.averageHp, 'HP medio'], ['✦', summary.types, 'Tipos distintos']
  ].map(([icon, value, label]) => `<div class="metric"><span class="metric-icon">${icon}</span><strong>${value}</strong><small>${label}</small></div>`).join('');
}

export function renderCards(pokemon, target) {
  target.innerHTML = pokemon.map(item => `<button class="pokemon-card" data-id="${item.id}" aria-label="Ver detalles de ${item.name}">
    <div class="art">${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy" />` : '<span>Sin imagen</span>'}</div>
    <div class="card-name"><span>#${String(item.id).padStart(3, '0')}</span><strong>${cap(item.name)}</strong></div>
    <div class="types">${typePills(item.types)}</div><div class="mini-stats"><span>HP <b>${item.hp}</b></span><span>ATK <b>${item.attack}</b></span><span>DEF <b>${item.defense}</b></span></div>
  </button>`).join('');
}

export function renderDetails(item, target) {
  target.innerHTML = `<div class="detail-layout"><div class="detail-art"><img src="${item.image}" alt="${item.name}" /></div><div class="detail-info"><span class="eyebrow">#${String(item.id).padStart(3, '0')}</span><h2>${cap(item.name)}</h2><div class="types">${typePills(item.types)}</div><dl><div><dt>Altura</dt><dd>${item.height} m</dd></div><div><dt>Peso</dt><dd>${item.weight} kg</dd></div><div><dt>Habilidades</dt><dd>${item.abilities.map(cap).join(', ') || 'Sin datos'}</dd></div></dl></div><div class="detail-stats"><h3>Estadísticas base</h3>${item.stats.map(stat => `<div class="stat-row"><span>${statLabels[stat.name] ?? cap(stat.name)}</span><b>${stat.value}</b><div class="bar"><span style="width:${Math.min(100, stat.value / 255 * 100)}%"></span></div></div>`).join('')}</div></div>`;
}

export function renderTypeOptions(types, select) {
  const current = select.value;
  select.innerHTML = '<option value="all">Todos los tipos</option>' + types.map(type => `<option value="${type}">${typeLabels[type] ?? cap(type)}</option>`).join('');
  select.value = types.includes(current) ? current : 'all';
}
