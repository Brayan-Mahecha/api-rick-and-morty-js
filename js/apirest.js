// Crear las referencias
const rowCards = document.querySelector('#rowCards');
const formData = document.querySelector('#formData');

// las peticiones al Api

// TODOS LOS PERSONAJES
const getCharacteres = async () => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  } 
};

// BUSCANDO POR NOMBRE DEL PERSONAJE
const getCharacterName = async (nameCharacter) => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nameCharacter}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
// LIMPIAR EL ROW
const cleanRow = () => {
  rowCards.innerHTML = '';
}
// Funcion sea punto de arranque
const init = async () => {
   // getCharacteres().then(r=>console.log(r));
  const characters = await getCharacteres();
  // console.log(characters);
  console.log(characters.results);

  // funcion para crear las primeras 20 cards
  createCards(characters.results);
};

init(); // llamada al función que inicia la app

/* Fin de las Peticiones */

// Crear un tarjeta con bootstrap (card)

cardCharacter = (character) => {
  // Creamos los elementos html
  const cardBootstrap = document.createElement('div');
  const imgCard = document.createElement('img');
  const cardBody = document.createElement('div');
  const titleCharacter = document.createElement('h5');
  const btnByIdCharacter = document.createElement('a');

  // textos a los elementos
  const nameCharacter = document.createTextNode(character.name);
  const textButtonCharacter = document.createTextNode('Ir al personaje');

  // Añadir las clases css de bootstrap
  cardBootstrap.classList.add('card', 'mt-4', 'col-sm-12', 'col-md-3');
  imgCard.classList.add('card-img-top', 'mt-2');
  cardBody.classList.add('card-body');
  titleCharacter.classList.add('card-title', 'text-center');
  btnByIdCharacter.classList.add('btn', 'btn-secondary', 'mb-2');

  // Añadir el href
  btnByIdCharacter.href=`personaje.html?id=${character.id}`;

  // Añadir los textos
  titleCharacter.appendChild(nameCharacter);
  btnByIdCharacter.appendChild(textButtonCharacter);
  imgCard.src= character.image;

  // TERMINAR CON EL RENDERIZADO
  cardBootstrap.append(imgCard, cardBody, btnByIdCharacter);
  cardBody.append(titleCharacter);
  rowCards.append(cardBootstrap);
};

const createCards = (characters) => {
  characters.map( personaje => cardCharacter(personaje));
}

// Formulario de busqueda de personaje

formData.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  console.log(this); // es el formulario
  const form = new FormData(this);

  // limpieza de los primeros 20 personajes
  cleanRow();
  // console.log(form.get('character'));

  getCharacterName(form.get('character')).then( data => createCards(data.results)).catch(err => console.error(err))

}

{/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}

