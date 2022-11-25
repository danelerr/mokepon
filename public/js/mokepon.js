const sectionAtaque = document.getElementById("seleccionar-ataque");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionReinciar = document.getElementById('reiniciar');
const spanSelMasc = document.getElementById("selmasc");
const sectionMascota = document.getElementById("seleccionar-mascota");
const enemyMascota = document.getElementById("mascota-enemy");
const notificacion = document.getElementById("resultado");
const ataquedeljugador = document.getElementById("ataques-del-jugador");
const ataquesdelenemigo = document.getElementById("ataques-del-enemigo");
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById('contenedor-ataques');

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');
const mokeMap = new Image();
mokeMap.src = './assets/mokemap.png';

let ataqueJugador = [];
let mokeponesEnemigos = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let ataquesMokeponEnemigo;
let opcionDeAtaque;
let victoriasEnemigo = 0;
let victoriasJugador = 0;

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let botones = [];
let mokepones = [];
let lienzo = mapa.getContext('2d');
let intervalo;
let mokeponJugador;

let jugadorId = null;
let enemigoId = null;

let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 40;
const anchoMaximoDelMapa = 500;
if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa;
}
alturaQueBuscamos = anchoDelMapa * 600 / 800;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
  constructor(nombre, foto, vida, mapaFoto, id = 0) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = mapaFoto;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(
      this.mapaFoto, 
      this.x, 
      this.y, 
      this.ancho, 
      this.alto
    );
  }
}

let hipodoge = new Mokepon('hipodoge', './assets/hipodoge.webp', 5, './assets/hipodoge.png');
let capipepo = new Mokepon('capipepo', './assets/capipepo.webp', 5, './assets/capipepo.png');
let ratigueya = new Mokepon('ratigueya', './assets/ratigueya.webp', 5, './assets/ratigueya.png');

mokepones.push(hipodoge, capipepo, ratigueya);

const hipodogeAtaques = [
  { nombre: 'Agua 💧', id: 'boton-agua' },
  { nombre: 'Agua 💧', id: 'boton-agua' },
  { nombre: 'Agua 💧', id: 'boton-agua' },
  { nombre: 'Fuego 🔥', id: 'boton-fuego' },
  { nombre: 'Tierra 🌱', id: "boton-tierra" }
];

const capipepoAtaques = [
  { nombre: 'Tierra 🌱', id: "boton-tierra" },
  { nombre: 'Tierra 🌱', id: "boton-tierra" },
  { nombre: 'Tierra 🌱', id: "boton-tierra" },
  { nombre: 'Agua 💧', id: 'boton-agua' },
  { nombre: 'Fuego 🔥', id: 'boton-fuego' }
];

const ratigueyaAtaques = [
  { nombre: 'Fuego 🔥', id: 'boton-fuego' },
  { nombre: 'Fuego 🔥', id: 'boton-fuego' },
  { nombre: 'Fuego 🔥', id: 'boton-fuego' },
  { nombre: 'Agua 💧', id: 'boton-agua' },
  { nombre: 'Tierra 🌱', id: "boton-tierra" }
];

mokepones[0].ataques.push(...hipodogeAtaques);
mokepones[1].ataques.push(...capipepoAtaques);
mokepones[2].ataques.push(...ratigueyaAtaques);

function iniciarJuego() {
  sectionAtaque.style.display = 'none';
  sectionVerMapa.style.display = 'none';

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  });

  inputHipodoge = document.getElementById("hipodoge");
  inputCapipepo = document.getElementById("capipepo");
  inputRatigueya = document.getElementById("ratigueya");

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonReiniciar.addEventListener('click', () => {
    location.reload();
  });
  sectionReinciar.style.display = 'none';
  unirseAlJuego();
}

function unirseAlJuego() {
  fetch('http://192.168.0.5:3000/unirse').then((res) => {
    if (res.ok) {
      res.text().then((respuesta) => {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionarMascotaJugador() {
  let index;
  if (inputHipodoge.checked) {
    spanSelMasc.style.color = 'aqua';
    spanSelMasc.innerHTML = inputHipodoge.id;
    index = 0;
  } else if (inputCapipepo.checked) {
    spanSelMasc.style.color = 'greenyellow';
    spanSelMasc.innerHTML = inputCapipepo.id;
    index = 1;
  } else if (inputRatigueya.checked) {
    spanSelMasc.style.color = 'orange';
    spanSelMasc.innerHTML = inputRatigueya.id;
    index = 2;
  } else {
    alert("Selecciona una mascota");
    return;
  }
  mokeponJugador = mokepones[index];
  
  seleccionarMokepon(mokeponJugador.nombre);


  mokeponJugador.ataques.forEach((ataque) => {
    opcionDeAtaque = `
    <button id="${ataque.id}" class="boton-de-ataque bataque">${ataque.nombre}</button>
    `;
    contenedorAtaques.innerHTML += opcionDeAtaque;
  });
  botones = document.querySelectorAll('.bataque');
  secuenciaAtaque();
  sectionMascota.style.display = 'none';
  //sectionAtaque.style.display = 'flex';
  sectionVerMapa.style.display = 'flex';
  iniciarMapa();
} 


function seleccionarMokepon(mokeponJugador) {
  fetch(`http://192.168.0.5:3000/mokepon/${jugadorId}`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mokepon: mokeponJugador
    })
  });
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
      boton.addEventListener('click', (e) => {
        ataqueJugador.push(e.target.textContent);
        boton.disabled = true;
        boton.style.background = '#112f58';
        console.log(ataqueJugador);
        console.log(enemigoId);
        if (ataqueJugador.length === 5) {
          enviarAtaques();
        }
      });
    });
}

function enviarAtaques() {
  fetch(`http://192.168.0.5:3000/mokepon/${jugadorId}/ataques`, {
      method: "post",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          ataques: ataqueJugador
      })
  });
  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`http://192.168.0.5:3000/mokepon/${enemigoId}/ataques`)
      .then(function (res) {
          if (res.ok) {
              res.json()
              .then(function ({ ataques }) {
                  if (ataques.length === 5) {
                      ataqueEnemigo = ataques
                      crearMensaje();
                  }
              })
          }
      })
}


function seleccionarMascotaEnemigo(enemigo) {
  enemyMascota.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  if (enemigo.nombre == 'hipodoge') {
    enemyMascota.style.color = 'aqua';
  } else if (enemigo.nombre == 'capipepo') {
    enemyMascota.style.color = 'greenyellow';
  } else {
    enemyMascota.style.color = 'orange';
  }
}

function seleccionarAtaqueEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
  ataqueEnemigo.push(ataquesMokeponEnemigo[ataqueAleatorio].nombre);
  console.log(ataqueEnemigo);
  ataquesMokeponEnemigo.splice(ataqueAleatorio, 1);
  iniciarPelea();
}

function iniciarPelea() {
  console.log(ataqueJugador.length);
  if (ataqueJugador.length === 5) {
    console.log('entra')
    crearMensaje();
  }
}


function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function crearMensaje() {

  clearInterval(intervalo);

  for (let i = 0; i < ataqueJugador.length; i++) {
    let nuevoAtaqueJuegador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    nuevoAtaqueJuegador.innerHTML = ataqueJugador[i].toUpperCase();
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo[i].toUpperCase();
  
    ataquedeljugador.appendChild(nuevoAtaqueJuegador);
    ataquesdelenemigo.appendChild(nuevoAtaqueEnemigo);

    if (ataqueJugador[i] == ataqueEnemigo[i]) {
    } else if (ataqueJugador[i] == 'Fuego 🔥' && ataqueEnemigo[i] == 'Tierra 🌱') {
      victoriasJugador++;
    } else if (ataqueJugador[i] == 'Agua 💧' && ataqueEnemigo[i] == 'Fuego 🔥') {
      victoriasJugador++;
    } else if (ataqueJugador[i] == 'Tierra 🌱' && ataqueEnemigo[i] == 'Agua 💧') {
      victoriasJugador++;
    } else {
      victoriasEnemigo++;
    }
  }

  spanVidasEnemigo.innerHTML = victoriasEnemigo;
  spanVidasJugador.innerHTML = victoriasJugador;
  const final = mensajeFinal();
  notificacion.innerHTML = final;
  sectionReinciar.style.display = 'block';

}


function mensajeFinal() {
  let parrafo = '';
  if (victoriasEnemigo > victoriasJugador) {
    parrafo = 'PERDISTE PEDAZO DE BASURA!!!!!!';
  } else if (victoriasJugador > victoriasEnemigo) {
    parrafo = 'GANASTE, BIEN AHI';
  } else {
    parrafo = 'IMBECIL, QUE ASCO QUE DAS, EMPATE!';
  }
  return parrafo;
}


function pintarCanvas() {
  mokeponJugador.x += mokeponJugador.velocidadX;
  mokeponJugador.y += mokeponJugador.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mokeMap, 0, 0, mapa.width, mapa.height);

  mokeponJugador.pintarMokepon();

  // if (mokeponJugador.velocidadX != 0 || mokeponJugador.velocidadY != 0) {
  enviarPosicion(mokeponJugador.x,  mokeponJugador.y);

  console.log('mokepones enemigos');
  mokeponesEnemigos.forEach((mokepon) => {
    mokepon.pintarMokepon();
    console.log(mokepon);
    revisarColision(mokepon); 
  });
}

function enviarPosicion(x, y) {
  fetch(`http://192.168.0.5:3000/mokepon/${jugadorId}/posicion`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  }).then((res) => {
    if (res.ok) {
      res.json().then(({enemigos}) => {
        mokeponesEnemigos = enemigos.map((enemigo) => {
          let mokeponEnemigo = null;
          const mokeponNombre = enemigo.mokepon.nombre;
          if (mokeponNombre === 'hipodoge') {
            mokeponEnemigo = new Mokepon('hipodoge', './assets/hipodoge.webp', 5, './assets/hipodoge.png', enemigo.id);
            mokeponEnemigo.ataques.push(...hipodogeAtaques);
          } else if (mokeponNombre === 'capipepo') {
            mokeponEnemigo = new Mokepon('capipepo', './assets/capipepo.webp', 5, './assets/capipepo.png', enemigo.id);
            mokeponEnemigo.ataques.push(...capipepoAtaques);
          } else {
            mokeponEnemigo = new Mokepon('ratigueya', './assets/ratigueya.webp', 5, './assets/ratigueya.png', enemigo.id);
            mokeponEnemigo.ataques.push(...ratigueyaAtaques);
          }
          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;
          return mokeponEnemigo;
        });
      });
    }
  });
}

function moverIzquierda() {
  mokeponJugador.velocidadX = -5;
  pintarCanvas();
}
function moverDerecha() {
  mokeponJugador.velocidadX = 5;
  pintarCanvas();
}
function moverArriba() {
  mokeponJugador.velocidadY = -5;
  pintarCanvas();
}
function moverAbajo() {
  mokeponJugador.velocidadY = 5;
  pintarCanvas();
}


function detenerMovimiento() {
  mokeponJugador.velocidadX = 0;
  mokeponJugador.velocidadY = 0;
}


function sePresionoUnaTecla(event) {
  switch (event.key) {
    case 'ArrowUp':
      moverArriba();
      return true;
      break;
    case 'ArrowDown':
        moverAbajo();
        return true;
        break;
    case 'ArrowLeft':
      moverIzquierda();
      return true;
      break;
    case 'ArrowRight':
      moverDerecha();
      return true;
      break;
    default:
      return false;
  };

}

function iniciarMapa() {
  intervalo = setInterval(() => {
    if (sePresionoUnaTecla) {
      pintarCanvas();
    }
  }, 50);
  window.addEventListener('keydown', sePresionoUnaTecla);
  window.addEventListener('keyup', detenerMovimiento); 
}


function revisarColision(enemigo) {
  if (
     mokeponJugador.y + mokeponJugador.alto < enemigo.y ||
     mokeponJugador.y > enemigo.y + enemigo.alto ||
     mokeponJugador.x + mokeponJugador.ancho < enemigo.x ||
     mokeponJugador.x > enemigo.x + enemigo.ancho
  ) {
    return;
  };
  detenerMovimiento(); 
  clearInterval(intervalo);
  enemigoId = enemigo.id;
  seleccionarMascotaEnemigo(enemigo);
  sectionAtaque.style.display = 'flex';
  sectionVerMapa.style.display = 'none';
}


window.addEventListener("load", iniciarJuego);
