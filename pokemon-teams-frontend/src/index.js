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
  trainerEl = makeTrainerEl(trainer)
  makeAddButtonEl(trainer, trainerEl)
  makeList(trainer, trainerEl)
}

function makeTrainerEl(trainer) {
  let trainerEl = document.createElement('div')
  trainerEl.dataset.trainerId = trainer.id
  trainerEl.className = 'card'
  trainerEl.innerText = trainer.name + " "
  trainerEl.style = "text-align: center"
  mainEl.appendChild(trainerEl)
  return trainerEl
}

function makeAddButtonEl(trainer, trainerEl) {
  let addEl = document.createElement('button')
    addEl.dataset.trainerId = trainer.id
    addEl.className = 'add-Pokemon'
    addEl.innerText = "Add Pokemon"
    addEl.addEventListener('click', () => {
      createPokemon(trainer.id)
      .then(pokemon => addPokemon(pokemon, trainer))
    })
    trainerEl.appendChild(addEl)
}

function makeList(trainer, trainerEl) {
  let ulEl = document.createElement('ul')
    ulEl.className = "ul"
    ulEl.id = `ul-${trainer.name}`
    trainerEl.appendChild(ulEl)

  let listEl = document.createElement('li')
  listEl.className = "li"
  listEl.id = `li-${trainer.name}`
  listEl.innerHTML = addPokemons(trainer.pokemons)
    ulEl.appendChild(listEl)
}

/// RENDER TRAINERS
function renderAll(){
  fetchTrainers()
  .then(trainers => trainers.forEach(trainer => addCard(trainer)))
}

/// ADD POKEMON NICKNAME & SPECIES LIST & RELEASE BUTTON
function addPokemons(pokemons) {
return pokemons.map(pokemon => `
    <li id="pokemon-${pokemon.id}">
      ${pokemon.nickname} (${pokemon.species})
      <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
    </li>
  `).join('')
}

/// ADD INDIVIDUAL POKEMON
function addPokemon (pokemon, trainer) {
  const trainerUl = document.querySelector(`#ul-${trainer.name}`)
  const pokemonEl = document.querySelector(`#li-${trainer.name}`)
  const newmonEl = document.createElement('li')
  pokemonEl.id = `pokemon-${pokemon.id}`
  newmonEl.innerHTML = `
       ${pokemon.nickname} (${pokemon.species})
       <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
    `
    pokemonEl.appendChild(newmonEl)
}

/// ACTION RELASE BUTTON
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

/// INITIALIZE
document.addEventListener('DOMContentLoaded', function(){
  renderAll()
  addGlobalListenerToRemovePokemon()
})
