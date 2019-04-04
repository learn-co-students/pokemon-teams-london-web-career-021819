const url = "http://localhost:3000"
const trainer_url = `${url}/trainers`
const pokemon_url = `${url}/pokemons`
const mainEl = document.querySelector('main')

/// GET TRAINERS
function fetchTrainers(){
  return fetch(trainer_url)
  .then(response => response.json())
}

/// RENDER TRAINERS
function renderAll(){
  fetchTrainers()
  .then(trainers => trainers.forEach(trainer => addCard(trainer)))
}
/// CREATE POKEMON
function createPokemon (trainer) {
	return fetch(pokemon_url,{
  		method:"POST",
  		headers: {
  			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
 		 	"trainer_id": trainer
		})
	}).then(resp => resp.json())
}

/// CREATE CARD
function addCard (trainer){
  let trainerEl = document.createElement('div')
  trainerEl.dataset.trainerId = trainer.id
  trainerEl.className = 'card'
  trainerEl.innerText = trainer.name + " "
  trainerEl.style = "text-align: center"
    mainEl.appendChild(trainerEl)

  let addEl = document.createElement('button')
  addEl.dataset.trainerId = trainer.id
  addEl.className = '.add-Pokemon'
  addEl.innerText = "Add Pokemon"
  addEl.addEventListener('click', () => {
    createPokemon(trainer.id) } )

    trainerEl.appendChild(addEl)
  let ulEl = document.createElement('ul')
    trainerEl.appendChild(ulEl)

  let listEl = document.createElement('li')
  listEl.innerHTML = addPokemon(trainer.pokemons)
    ulEl.appendChild(listEl)

/// PURE JS RELEASE BUTTON
  // let releaseEl = document.createElement('button')
  // releaseEl.dataset.trainerId = addPokemon(trainer.pokemons).id
  // releaseEl.className = "release"
  // releaseEl.innerText = "Release"
  //   listEl.appendChild(releaseEl)
}

/// RENDER TRAINERS
function renderAll(){
  fetchTrainers()
  .then(trainers => trainers.forEach(trainer => addCard(trainer)))
}

/// ADD POKEMON NICKNAME & SPECIES LIST & RELEASE BUTTON
function addPokemon(pokemons) {
return pokemons.map(pokemon => `
    <li id="pokemon-${pokemon.id}">
      ${pokemon.nickname} (${pokemon.species})
      <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
    </li>
  `).join('')
}

function addGlobalListenerToRemovePokemon () {
    document.addEventListener('click', event => {
      if (event.target.className !== 'release') return

      const id = event.target.dataset.pokemonId

      releasePokemon(id)
        .then(() => {
          const pokemonLi = document.querySelector(`#pokemon-${id}`)
          pokemonLi.remove() } ) } )
  }

// / RELEASE POKEMON FROM SERVER
function releasePokemon(pokemon_id) {
	return fetch(`${pokemon_url}/${pokemon_id}`, {
		method: 'DELETE'
	}).then(resp => resp.json())
}

/// ACTION
document.addEventListener('DOMContentLoaded', function(){
  renderAll()
  addGlobalListenerToRemovePokemon()
})
