const pokeApi = {};

function convertPokeApiDetailToPokemon(pokemonDetail) {
  const pokemon = new Pokemon();
  pokemon.id = pokemonDetail.id;
  pokemon.name = pokemonDetail.name;
  pokemon.types = pokemonDetail.types.map(({type}) => type.name);
  pokemon.image = pokemonDetail.sprites.other.dream_world.front_default;
  pokemon.specie = pokemonDetail.species.name;
  pokemon.height = pokemonDetail.height;
  pokemon.weight = pokemonDetail.weight;
  pokemon.stats = {
    hp: pokemonDetail.stats[0].base_stat,
    attack: pokemonDetail.stats[1].base_stat,
    defense: pokemonDetail.stats[2].base_stat,
    special_attack: pokemonDetail.stats[3].base_stat,
    special_defense: pokemonDetail.stats[4].base_stat,
    speed: pokemonDetail.stats[5].base_stat,
  }
  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then(resp => resp.json())
    .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons =  (offset = 0, limit = 10) =>  {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailResquests) => Promise.all(detailResquests))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.error(error))
}