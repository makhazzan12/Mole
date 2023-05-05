var imagenes = [
  "topoNo.jpg",
  "topoSi.jpg"
];

var imagenActual = 0;
var puntos = 0;
var tiempo = 200; // segundos
var intervalo;

// Configuración de las dificultades
var dificultad = {
  facil: {
    nombre: "Fácil",
    puntos: 3,
    restaPuntos: 0,
    velocidad: 2000
  },
  media: {
    nombre: "Media",
    puntos: 6,
    restaPuntos: 2,
    velocidad: 1500
  },
  dificil: {
    nombre: "Difícil",
    puntos: 12,
    restaPuntos: 6,
    velocidad: 1000
  }
};

// Obtener el elemento select y escuchar el evento change
var selectDificultad = document.getElementById('dificultad');
selectDificultad.addEventListener('change', function () {
  var dificultadSeleccionada = selectDificultad.value;
  puntos = 0; // Reiniciar los puntos
  clearInterval(intervalo); // Detener el intervalo actual
  intervalo = setInterval(cambiarImagenes, dificultad[dificultadSeleccionada].velocidad); // Iniciar el intervalo de nuevo
  document.getElementById('puntos').innerHTML = "Puntos: " + puntos;
});

function cambiarImagenes() {
  var imagenesAfectadas = document.querySelectorAll('.imagen');
  imagenesAfectadas.forEach(imagen => {
    imagen.style.backgroundImage = "url(" + imagenes[0] + ")";
  });

  setTimeout(function() {
    var indexAleatorio = Math.floor(Math.random() * imagenesAfectadas.length);
    var imagenAleatoria = imagenesAfectadas[indexAleatorio];
    imagenAleatoria.style.backgroundImage = "url(" + imagenes[1] + ")";
    setTimeout(function() {
      imagenAleatoria.style.backgroundImage = "url(" + imagenes[0] + ")";
    }, 1200);
  }, Math.random() * 2000);
}

function golpeMole(imagen) {
  if (imagen.style.backgroundImage.includes("topoSi.jpg")) {
    puntos += dificultad[selectDificultad.value].puntos;
    document.getElementById("impacto-audio").play();
  } else if (imagen.style.backgroundImage.includes("topoNo.jpg")) {
    puntos -= dificultad[selectDificultad.value].restaPuntos;
  } else {
    puntos;
  }

  imagen.style.backgroundImage = "url(" + imagen.dataset.golpe + ")";
  setTimeout(function () {
    imagen.style.backgroundImage = "url(" + imagenes[imagenActual] + ")";
  }, 1200);

  document.getElementById('puntos').innerHTML = "Puntos: " + puntos;
}

function startGame() {
  clearInterval(intervalo); // Detener el intervalo actual
  puntos = 0; // Reiniciar los puntos
  cambiarImagenes(); // Cambiar las imágenes de inmediato
  intervalo = setInterval(cambiarImagenes, dificultad[selectDificultad.value].velocidad); // Iniciar el intervalo de nuevo
  tiempo = 200; // Reiniciar el tiempo
  document.getElementById('tiempo').innerHTML = "Tiempo: " + tiempo; // Actualizar el tiempo en la pantalla
}

function temporizador() {
  if (tiempo > 0) {
    tiempo--;
    document.getElementById('tiempo').textContent = `Tiempo restante: ${tiempo} sec`; // Actualizar el tiempo en la pantalla
  } else {
    clearInterval(intervalo); // Detener la generación de topos
  }
}


setInterval(temporizador, 1000); // Iniciar el temporizador
document.querySelectorAll('.imagen').forEach(imagen => {
  imagen.addEventListener('click', function () {
    golpeMole(imagen);
  });
});
