<<<<<<< HEAD
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
=======
document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = "http://localhost:3000"
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`

  const trainerContainer = document.querySelector('#trainer-container')

  let trainers = []
  console.log(trainerContainer)

  trainerContainer.addEventListener('click', (event) => {
    // console.log(event.target)
    // debugger
    // let's try to release that pokemon to the wild aka DELETE
    if (event.target.className === "release") {
      // debugger
      // here before the fetch or talking to our mailman
      // we do our behavoir
      // behavior right now is deleting or removing the particular pokemon


      const config = {
        method: "DELETE"
      }

      fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, config)
        .then(response => response.json())
        .then(data => {
          event.target.parentElement.remove()
          console.log(data)
        })
    }
  })

  const getTrainersAndRenderAndAddEventListenersAndEtc = () => {
    trainerContainer.innerHTML = ''

    fetch(TRAINERS_URL)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        // maybe we render one trainer

        data.forEach(trainer => {
          // console.log(trainer)
          const trainerCard = document.createElement('div')
          trainerCard.dataset.id = trainer.id
          trainerCard.className = "card"

          trainerCard.innerHTML = `
            <p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul id=trainer-card-ul-${trainer.id}>

            </ul>
          `

          const addPokemon = trainerCard.querySelector('button')
          addPokemon.addEventListener('click', (event) => {
            // console.log('CLICKED THE ADD POKEMON BUTTON')
            // check to see the number of pokemons we have
            // be able to fetch to the post pokemon route provided
            // how does this backend work???
            // POST /pokemons

            // console.log('trainer id', trainer.id);
            const config = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                 trainer_id: trainer.id
              })
            }

            fetch(POKEMONS_URL, config)
              .then(response => response.json())
              .then(data => {
                console.log(data)

                getTrainersAndRenderAndAddEventListenersAndEtc()
              }) // end of the fetch


          })



          // console.log(trainer.pokemons)
          trainer.pokemons.forEach(pokemon => {
            const trainerCardUl = trainerCard.querySelector('ul')
            // console.log(trainerCardUl)
            const pokemonLi = document.createElement('li')
            // button is inside of this li
            const releaseButton = document.createElement('button')


            releaseButton.innerText = 'Release'

            releaseButton.className = 'release'
            releaseButton.dataset.pokemonId = pokemon.id
            // debugger
            // <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
            pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`

            // append release button to the Li
            pokemonLi.append(releaseButton)

            // append each Li to the trainer card ul
            trainerCardUl.append(pokemonLi)
          })

          // <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
          // <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
          // <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
          // <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
          trainerContainer.append(trainerCard)
        })
        // <div class="card" data-id="1"><p>Prince</p>
        //   <button data-trainer-id="1">Add Pokemon</button>
        //   <ul>
        //     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
        //     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
        //     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
        //     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
        //     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
        //   </ul>
        // </div>
        // trainers = data
        // trainers.forEach(renderTrainer)
      })
  }

  getTrainersAndRenderAndAddEventListenersAndEtc()




































































  // const renderTrainer = (trainer) => {
  //   const trainerCard = document.createElement('div')
  //   trainerCard.dataset.id = trainer.id
  //   trainerCard.className = "card"
  //   trainerCard.innerHTML = `
  //     <p>${trainer.name}</p>
  //     <button data-trainer-id="1">Add Pokemon</button>
  //     <ul>
  //       <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
  //       <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
  //       <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
  //       <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
  //       <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  //     </ul>
  //   `
  //
  //   trainerContainer.append(trainerCard)
  // }


>>>>>>> 919f6ed1d74e1eea11fe35ff4edf36cd573834e8
})
