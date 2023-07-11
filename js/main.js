const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
let limit = 10;
let offset = 0;

// 1,2,3,5,6,..., 10    0 - 10
// 11                   10 - 1       
function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.types[0]}">
        <div class="header">
          <div class="identification">
            <span class="id">#${pokemon.id.toString().padStart(3, '0')}</span>
            <span class="name">${pokemon.name}</span>
          </div>
          <span class="hp">${pokemon.stats.hp} HP</span>
        </div>
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <div class="characteristics">
          <div class="height">
            <span>height</span>
            <span>${pokemon.height}</span>
          </div>
          <ol class="types">
            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <div class="weight">
            <span>weight</span>
            <span>${pokemon.weight}</span>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <span>attack</span>
            <span>${pokemon.stats.attack}</span>
          </div>
          <div class="stat">
            <span>defense</span>
            <span>${pokemon.stats.defense}</span>
          </div>
          <div class="stat">
            <span>sp. atk.</span>
            <span>${pokemon.stats.special_attack}</span>
          </div>
          <div class="stat">
            <span>sp. def.</span>
            <span>${pokemon.stats.special_defense}</span>
          </div>
          <div class="stat">
            <span>speed</span>
            <span>${pokemon.stats.speed}</span>
          </div>
        </div>
      </li>
    `).join('');
  });
}

loadPokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;
  if(qtdRecordNextPage >= maxRecords) {
    limit = maxRecords - offset;
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }
  loadPokemons(offset, limit);
})