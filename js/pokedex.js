const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Array para almacenar los datos de los Pokémon
let pokemonDataArray = [];

// Función para mostrar los Pokémon ordenados por ID
function mostrarPokemonOrdenados() {
    // Ordenar el array de datos por ID
    pokemonDataArray.sort((a, b) => a.id - b.id);

    // Mostrar los Pokémon en el DOM
    pokemonDataArray.forEach(data => mostrarPokemon(data));
}

// Iterar a través de las solicitudes de fetch y almacenar los datos en el array
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            // Almacenar datos en el array
            pokemonDataArray.push(data);

            // Mostrar los Pokémon ordenados una vez que todos los datos estén disponibles
            if (pokemonDataArray.length === 151) {
                mostrarPokemonOrdenados();
            }
        });
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    // Iterar sobre el array de datos y mostrar los Pokémon según el botón clicado
    pokemonDataArray.forEach(data => {
        if (botonId === "ver-todos") {
            mostrarPokemon(data);
        } else {
            const tipos = data.types.map(type => type.type.name);
            if (tipos.some(tipo => tipo.includes(botonId))) {
                mostrarPokemon(data);
            }
        }
    });
}));


document.getElementById('volver atras').addEventListener('click', function() {
    // Cambia la ruta al HTML al que deseas redirigir
    window.location.href = 'index.html';
  });
