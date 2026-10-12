let juegoEnMarcha = true;

class Jugador {
  constructor(nombre) {
    this.nombre = nombre;
    this.intentosDeCuracion = 0;
    this.intentosDeAtaque = 0;
    this.vida = 100;
    this.ataques = [
      { id: 1, nombre: "Puño", daño: 20, icono: "👊", habilitado: true },
      { id: 2, nombre: "Patada", daño: 25, icono: "🦵", habilitado: true },
      { id: 3, nombre: "Espadazo", daño: 30, icono: "⚔️", habilitado: true },
      { id: 4, nombre: "Hechizo", daño: 35, icono: "🪄", habilitado: true },
      { id: 5, nombre: "Flecha", daño: 40, icono: "🏹", habilitado: true },
      { id: 6, nombre: "Lanza", daño: 15, icono: "🔱", habilitado: false },
    ];
  }
  recibirDaño(daño) {
    const vida = (this.vida -= daño);

    if (this.vida < 0) {
      this.vida = 0;
    }
    return vida;
  }
  curarse(medicina) {
    const vida = (this.vida += medicina);

    if (vida >= 100) {
      this.vida = 100;
    }
    return vida;
  }
  deshabilitarAtaque() {
    const ataqueAdeshabilitar = this.ataques.find(
      (ataque) => ataque.habilitado,
    );
    if (ataqueAdeshabilitar) {
      ataqueAdeshabilitar.habilitado = false;
    }
    return ataqueAdeshabilitar;
  }
  habilitarAtaque() {
    const ataqueAhabilitar = this.ataques.find(
      (ataque) => ataque.nombre === "Lanza",
    );

    if (ataqueAhabilitar) {
      ataqueAhabilitar.habilitado = true;
    }
    return ataqueAhabilitar;
  }
}

const contenedorPrincipal = document.querySelector("#contenedor-principal");
const contenedorNivelSangre = document.querySelector(
  "#contenedor-nivel-sangre",
);
const contenedorTarjetasAtaques = document.querySelector(
  "#contenedor-tarjetas-ataques",
);
const contenedorTarjetasAcciones = document.querySelector(
  "#contenedor-tarjetas-acciones",
);
const modalInicio = document.querySelector("#modal-inicio");

const botonContinuar = document.querySelector("#boton-continuar");
const formularioIngreso = document.querySelector("#formulario-ingreso");
const inputJugador = document.querySelector("#input-jugador");
const inputEnemigo = document.querySelector("#input-enemigo");

const formularioPocionMagica = document.querySelector("#pocion-magica");
const inputPocionMagica = document.querySelector("#input-pocion-magica");

const nombreJugadores = document.querySelectorAll(".jugadores");
const vidaJugador = document.querySelector("#vida-jugador");
const vidaEnemigo = document.querySelector("#vida-enemigo");
const mensajePopUp = document.querySelector("#mensaje-popup");
const mensaje = document.querySelector("#mensaje");
const cerrarMensajeBtn = document.querySelector("#cerrar-popup");
const overlay = document.querySelector(".overlay");

let error = document.querySelector(".errors");

contenedorNivelSangre.style.display = "none";
formularioIngreso.style.display = "none";
formularioPocionMagica.style.display = "none";
overlay.style.display = "none";

botonContinuar.addEventListener("click", () => {
  modalInicio.style.display = "none";
  formularioIngreso.style.display = "block";
});

let jugador = {};
let enemigo = {};

const crearJugadores = (e) => {
  e.preventDefault();

  if (inputJugador.value === "" || inputEnemigo.value === "") {
    error.classList.add("errors");
    error.innerHTML = "El formulario debe tener todos los datos";

    setTimeout(() => {
      error.innerHTML = "";
    }, 4000);
  } else {
    const nombreJugador = inputJugador.value;
    const nombreEnemigo = inputEnemigo.value;

    jugador = new Jugador(nombreJugador);
    enemigo = new Jugador(nombreEnemigo);

    renderizarNombres();

    formularioIngreso.style.display = "none";
    contenedorNivelSangre.style.display = "block";
  }
};

formularioIngreso.addEventListener("submit", crearJugadores);

const renderizarNombres = () => {
  nombreJugadores[0].innerHTML = jugador.nombre;
  nombreJugadores[1].innerHTML = enemigo.nombre;
  mostrarMenu();
};

const mostrarMensaje = (msj) => {
  overlay.style.display = "flex";
  mensajePopUp.style.display = "block";
  mensaje.textContent = msj;
};

const ocultarMensaje = () => {
  overlay.style.display = "none";
};
cerrarMensajeBtn.addEventListener("click", ocultarMensaje);

const validarColorBarrasVida = (estadoJugador, estadoEnemigo) => {
  if (estadoJugador <= 25) {
    vidaJugador.style.backgroundColor = "red";
  } else {
    vidaJugador.style.backgroundColor = "#3dee1a";
  }

  if (estadoEnemigo <= 25) {
    vidaEnemigo.style.backgroundColor = "red";
  } else {
    vidaEnemigo.style.backgroundColor = "#3dee1a";
  }
};

// // MOSTRAR MENÚ
const mostrarMenu = () => {
  contenedorTarjetasAcciones.style.display = "grid";
  contenedorTarjetasAtaques.style.display = "none";

  const opciones = [
    { id: 1, descripcion: "Golpear", icono: "👊" },
    { id: 2, descripcion: "Curarte", icono: "❤️" },
    { id: 3, descripcion: "Huir", icono: "🏃" },
    { id: 4, descripcion: "Poción mágica", icono: "🧪" },
    { id: 5, descripcion: "Salir de la pelea", icono: "🚪" },
  ];

  opciones.forEach((element) => {
    const tarjeta = document.createElement("article");

    tarjeta.classList.add("tarjeta-acciones");

    tarjeta.innerHTML = `
      <h2>${element.descripcion}</h2>
      <span>${element.icono}</span>
      <p>${element.id}</p>
    `;

    tarjeta.addEventListener("click", (e) => {
      const contenido = e.target.closest(".tarjeta-acciones");
      const accion = Number(contenido.querySelector("p").textContent);

      ejecutarAccion(accion);
    });
    contenedorTarjetasAcciones.appendChild(tarjeta);
  });
};

// ATACAR
const mostrarListadoAtaques = (ataques) => {
  contenedorTarjetasAtaques.style.display = "grid";
  contenedorTarjetasAcciones.style.display = "none";

  ataques.forEach((element) => {
    if (element.habilitado) {
      const tarjeta = document.createElement("article");
      tarjeta.classList.add("tarjeta-ataques");

      tarjeta.innerHTML = `
      <h3>${element.nombre}</h3>
      <span>${element.icono}</span>
      <p>${element.id}</p>
      `;

      tarjeta.addEventListener("click", (e) => {
        const contenido = e.target.closest(".tarjeta-ataques");
        const opcionAtaque = Number(contenido.querySelector("p").textContent);

        gestionAtaque(opcionAtaque);
      });
      contenedorTarjetasAtaques.appendChild(tarjeta);
    }
  });
};

const gestionAtaque = (opcionAtaque) => {
  if (jugador.intentosDeAtaque > 2) {
    mostrarMensaje("Ya no puedes atacar más. Selecciona sí o sí la opción 4.");
    contenedorTarjetasAcciones.style.display = "grid";
    contenedorTarjetasAtaques.innerHTML = "";
    contenedorTarjetasAtaques.style.display = "none";
    return;
  }
  if (jugador.intentosDeAtaque === 2) {
    jugador.intentosDeAtaque++;
    mostrarMensaje(
      "Estás golpeando mucho. Dejemos que la suerte juegue ahora. Selecciona sí o sí la opción 4.",
    );
    contenedorTarjetasAcciones.style.display = "grid";
    contenedorTarjetasAtaques.innerHTML = "";
    contenedorTarjetasAtaques.style.display = "none";
    return;
  }

  let ataqueSeleccionado = "";

  jugador.ataques.find((ataque) => {
    if (ataque.id === opcionAtaque && ataque.habilitado) {
      ataqueSeleccionado = ataque;
    }
  });

  if (ataqueSeleccionado) {
    const vida = enemigo.recibirDaño(ataqueSeleccionado.daño);
    vidaEnemigo.style.width = `${vida}%`;
    jugador.intentosDeAtaque++;
    mostrarMensaje(
      `💥Golpeaste al enemigo con: ${ataqueSeleccionado.nombre}
        Vida enemiga: ${enemigo.vida}%`,
    );
    contenedorTarjetasAcciones.style.display = "grid";
    overlay.style.display = "block";
    contenedorTarjetasAtaques.innerHTML = "";
    contenedorTarjetasAtaques.style.display = "none";
  }

  if (!ataqueSeleccionado.habilitado) {
    mostrarMensaje("❌ No tienes disponible ese ataque");
    contenedorTarjetasAcciones.style.display = "grid";
    contenedorTarjetasAtaques.innerHTML = "";
  }
  validarColorBarrasVida(jugador.vida, enemigo.vida);
};

// CURARSE
const curarse = () => {
  if (jugador.intentosDeAtaque > 2) {
    jugador.intentosDeCuracion++;
    mostrarMensaje("❌ No puedes curarte. Selecciona sí o sí la opción 4.");
    return;
  }

  if (jugador.vida >= 50) {
    jugador.intentosDeCuracion++;
    mostrarMensaje("❌ No seas nena!! Da un par de golpes más 😒");
    return;
  }

  if (jugador.intentosDeCuracion === 2) {
    jugador.intentosDeCuracion++;
    mostrarMensaje(
      "❌ Superaste la cantidad de intentos de cura. Dale, dale, a pelear!!! 😒",
    );
    return;
  }

  const vida = jugador.curarse(20);
  vidaJugador.style.width = `${vida}%`;
  jugador.intentosDeCuracion++;
  jugador.intentosDeAtaque = 0;

  mostrarMensaje(
    `Te curaste. Muy bien!!! ❤️\nTu vida está al: ${jugador.vida}"%`,
  );
  validarColorBarrasVida(jugador.vida, enemigo.vida);
};

// // HUIR
const huir = () => {
  if (jugador.vida > 50) {
    mostrarMensaje(
      "❌ Sos una gallina!! Todavía tienes suficiente vida para seguir peleando. Vamos!!",
    );

    return;
  }
  alert(
    "🏃 Escapaste de la pelea. 💀 PERDISTE!! \n" +
      "En la consola presionando F12, veras las estadísticas finales",
  );
  console.log("Estadísticas:", "\nJugador:", jugador, "\nEnemigo:", enemigo);
  juegoEnMarcha = false;
};

// // POCIÓN MÁGICA
const numeroPocionMagica = (e) => {
  formularioPocionMagica.style.display = "block";
};
const usarPocionMagica = () => {
  formularioPocionMagica.style.display = "block";
  overlay.style.display = "flex";
  mensajePopUp.style.display = "none"

  formularioPocionMagica.onsubmit = (e) => {
    e.preventDefault();

    const valorAleatorio = Number(inputPocionMagica.value);

    if (valorAleatorio === 5 || valorAleatorio === 3 || valorAleatorio === 8) {
      mostrarMensaje("La suerte estuvo de parte de los dos; se salvaron!!");
      jugador.intentosDeAtaque = 0;
    }

    if (valorAleatorio > 5) {
      const vida = jugador.recibirDaño(90);
      vidaJugador.style.width = `${vida}%`;
      jugador.intentosDeAtaque = 0;
      enemigo.intentosDeAtaque++;
      enemigo.curarse(35);

      const ataqueDeshabilitado = jugador.deshabilitarAtaque();

      mostrarMensaje(
        `Ufff, Ouch!! Lo siento, tu nivel de vida está al:
            ${jugador.vida}%
            \n
            Además perdiste un poder: 
            ${ataqueDeshabilitado.nombre}
            \n
            "Adicionalmente tu enemigo recuperó vida al:
            ${enemigo.vida}%`,
      );
      formularioPocionMagica.style.display = "none";
      validarColorBarrasVida(jugador.vida, enemigo.vida);
    }
    
    if (valorAleatorio < 5) {
      const vida = enemigo.recibirDaño(30);
      vidaEnemigo.style.width = `${vida}%`;
      const ataqueHabilitado = jugador.habilitarAtaque();
      
      mostrarMensaje(
        "Golpeaste al enemigo brutalmente, Quedó con vida al: " +
        enemigo.vida +
        "% \n" +
        "Ademas ganaste un nuevo ataque: " +
        ataqueHabilitado.nombre,
      );
      formularioPocionMagica.style.display = "none";
      validarColorBarrasVida(jugador.vida, enemigo.vida);
    }
  };
};

// SALIR DEL JUEGO
const salirDelJuego = () => {
  juegoEnMarcha = false;
  alert("❌ Nos vemos en la morgue!");
};

// // COMPROBAR RESULTADO
// const comprobarEstadoDelJuego = () => {
//   if (enemigo.vida <= 0) {
//     juegoEnMarcha = false;
//     alert(
//       "🏆 ¡GANASTE! En la consola presionando F12, veras las estadísticas finales de la partida",
//     );
//     console.log(
//       "Estadísticas:",
//       "\nJugador:",
//       {
//         ...jugador,
//         ataques: jugador.ataques.filter((ataque) => ataque.habilitado),
//       },
//       "\nEnemigo:",
//       {
//         ...enemigo,
//         ataques: enemigo.ataques.filter((ataque) => ataque.habilitado),
//       },
//     );
//     return;
//   }

//   if (jugador.vida <= 0) {
//     juegoEnMarcha = false;
//     alert(
//       "💀 PERDISTE!! En la consola presionando F12, veras las estadísticas finales de la partida",
//     );
//     console.log(
//       "Estadísticas:",
//       "\nJugador:",
//       {
//         ...jugador,
//         ataques: jugador.ataques.filter((ataque) => ataque.habilitado),
//       },
//       "\nEnemigo:",
//       {
//         ...enemigo,
//         ataques: enemigo.ataques.filter((ataque) => ataque.habilitado),
//       },
//     );
//     return;
//   }
// };

// while (juegoEnMarcha) {
// const accion = mostrarMenu();
// console.log(accion)

//   const esValida = validarAccion(accion);

//   if (esValida) {
const ejecutarAccion = (accion) => {
  switch (accion) {
    case 1:
      mostrarListadoAtaques(jugador.ataques);
      break;

    case 2:
      curarse();
      break;

    case 3:
      huir();
      break;

    case 4:
      usarPocionMagica();
      break;

    case 5:
      salirDelJuego();
      break;
  }
};

//     comprobarEstadoDelJuego();
//   }
// }
