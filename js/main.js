let juegoEnMarcha = false;
let resolverTurno = null;
let jugador = {};
let enemigo = {};
let datosJuego = null;

const cargarDatos = async () => {
  if (datosJuego) return datosJuego;

  try {
    const response = await fetch("./data/datos.json");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    datosJuego = await response.json();

    return datosJuego;
  } catch (error) {
    console.error("Error al cargar los datos:", error);

    mostrarMensaje(
      "No se pudieron cargar los datos del juego. Inténtalo nuevamente.",
    );

    return [];
  }
};

class Jugador {
  constructor(nombre) {
    this.nombre = nombre;
    this.intentosDeCuracion = 0;
    this.intentosDeAtaque = 0;
    this.vida = 100;
    this.ataques = [];
  }
  recibirDaño(daño) {
    this.vida -= daño;

    if (this.vida < 0) {
      this.vida = 0;
    }
    return this.vida;
  }
  curarse(medicina) {
    this.vida += medicina;

    if (this.vida > 100) {
      this.vida = 100;
    }
    return this.vida;
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
const botonClaroOscuro = document.querySelector("#claro-oscuro-btn");
const icono = document.querySelector("#icono");

let error = document.querySelector(".errors");
let mensajeCarga = document.querySelector(".mensaje-carga");

contenedorNivelSangre.style.display = "none";
formularioIngreso.style.display = "none";
formularioPocionMagica.style.display = "none";
overlay.style.display = "none";

botonContinuar.addEventListener("click", () => {
  modalInicio.style.display = "none";
  formularioIngreso.style.display = "block";
});

const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {
  document.body.classList.add("oscuro");
  botonClaroOscuro.textContent = "Modo claro";
} else {
  botonClaroOscuro.textContent = "Modo oscuro";
}

const modoClaroOscuro = () => {
  document.body.classList.toggle("oscuro");

  const esOscuro = document.body.classList.contains("oscuro");

  localStorage.setItem("tema", esOscuro ? "oscuro" : "claro");

  botonClaroOscuro.textContent = esOscuro ? "Modo claro" : "Modo oscuro";
};
botonClaroOscuro.addEventListener("click", modoClaroOscuro);

const cargarJugadores = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existenJugadores = localStorage.getItem("jugadores");

      if (existenJugadores !== null) {
        resolve(JSON.parse(existenJugadores));
      } else {
        reject(new Error("No se encontraron datos guardados."));
      }
    }, 3000);
  });
};

const crearJugadores = async (e) => {
  e.preventDefault();

  let nombreJugador;
  let nombreEnemigo;

  try {
    const existenJugadores = localStorage.getItem("jugadores");

    if (existenJugadores !== null) {
      mensajeCarga.classList.add("mensaje-carga");
      mensajeCarga.textContent = "Cargando los nombres de los jugadores";
      const jugadoresGuardados = await cargarJugadores();

      if (jugadoresGuardados) {
        setTimeout(() => {
          mensajeCarga.textContent = "";
          mensajeCarga.classList.remove("mensaje-carga");
        }, 2000);
      }

      [{ nombreJugador }, { nombreEnemigo }] = jugadoresGuardados;
    } else {
      nombreJugador = inputJugador.value.trim();
      nombreEnemigo = inputEnemigo.value.trim();

      if (nombreJugador === "" || nombreEnemigo === "") {
        error.classList.add("errors");
        error.textContent =
          "Debes ingresar el nombre del jugador y del enemigo.";

        setTimeout(() => {
          error.textContent = "";
          error.classList.remove("errors");
        }, 4000);

        return;
      }

      const jugadores = [{ nombreJugador }, { nombreEnemigo }];

      localStorage.setItem("jugadores", JSON.stringify(jugadores));
    }

    jugador = new Jugador(nombreJugador);
    enemigo = new Jugador(nombreEnemigo);

    vidaJugador.style.width = `${jugador.vida}%`;
    vidaEnemigo.style.width = `${enemigo.vida}%`;
    validarColorBarrasVida(jugador.vida, enemigo.vida);

    renderizarNombres();

    formularioIngreso.style.display = "none";
    contenedorNivelSangre.style.display = "block";

    iniciarJuego();
  } catch (error) {
    console.error("Error al crear los jugadores:", error);

    mostrarMensaje(
      "No se pudieron recuperar los datos de los jugadores. Inténtalo nuevamente.",
    );
  } finally {
    console.log("Finalizó el intento de creación de jugadores.");
  }
};

formularioIngreso.addEventListener("submit", crearJugadores);

const renderizarNombres = () => {
  nombreJugadores[0].innerHTML = jugador.nombre;
  nombreJugadores[1].innerHTML = enemigo.nombre;
  mostrarMenu();
};

const mostrarMensaje = (msj) => {
  Swal.fire(msj);
};


const validarColorBarrasVida = (estadoJugador, estadoEnemigo) => {
  estadoJugador <= 25
    ? (vidaJugador.style.backgroundColor = "red")
    : (vidaJugador.style.backgroundColor = "#3dee1a");

  estadoEnemigo <= 25
    ? (vidaEnemigo.style.backgroundColor = "red")
    : (vidaEnemigo.style.backgroundColor = "#3dee1a");
};

const esperarTurno = () => {
  return new Promise((resolve) => {
    resolverTurno = resolve;
  });
};

const registrarTurno = (turno) => {
  if (!resolverTurno) return;

  const resolver = resolverTurno;
  resolverTurno = null;
  resolver(turno);
};

// // MOSTRAR MENÚ
const mostrarMenu = async () => {
  contenedorTarjetasAcciones.innerHTML = "";
  contenedorTarjetasAcciones.style.display = "grid";
  contenedorTarjetasAtaques.style.display = "none";

  const datosObtenidos = await cargarDatos();
  const opciones = datosObtenidos.filter(
    (objeto) => objeto.categoria === "acciones",
  );

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

      registrarTurno({ tipo: "accion", id: accion });
    });
    contenedorTarjetasAcciones.appendChild(tarjeta);
  });
};

// ATACAR
const mostrarListadoAtaques = async () => {
  contenedorTarjetasAtaques.innerHTML = "";
  contenedorTarjetasAtaques.style.display = "grid";
  contenedorTarjetasAcciones.style.display = "none";

  const datosObtenidos = await cargarDatos();

  if (jugador.ataques.length === 0) {
    jugador.ataques = datosObtenidos
      .filter((objeto) => objeto.categoria === "ataques")
      .map((ataque) => ({ ...ataque }));
  }

  jugador.ataques.forEach((element) => {
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

        registrarTurno({ tipo: "ataque", id: opcionAtaque });
      });
      contenedorTarjetasAtaques.appendChild(tarjeta);
    }
  });
};

const gestionAtaque = (opcionAtaque) => {
  if (jugador.intentosDeAtaque > 2) {
    mostrarMensaje("Ya no puedes atacar más. Selecciona sí o sí la opción 10.");
    contenedorTarjetasAcciones.style.display = "grid";
    contenedorTarjetasAtaques.innerHTML = "";
    contenedorTarjetasAtaques.style.display = "none";
    return;
  }
  if (jugador.intentosDeAtaque === 2) {
    jugador.intentosDeAtaque++;
    mostrarMensaje(
      "Estás golpeando mucho. Dejemos que la suerte juegue ahora. Selecciona sí o sí la opción 10.",
    );
    contenedorTarjetasAcciones.style.display = "grid";
    contenedorTarjetasAtaques.innerHTML = "";
    contenedorTarjetasAtaques.style.display = "none";
    return;
  }

  const ataqueSeleccionado = jugador.ataques.find(
    (ataque) => ataque.id === opcionAtaque && ataque.habilitado,
  );

  if (!ataqueSeleccionado) {
    mostrarMensaje("❌ No tienes disponible ese ataque");
    contenedorTarjetasAcciones.style.display = "grid";
    contenedorTarjetasAtaques.innerHTML = "";
    contenedorTarjetasAtaques.style.display = "none";
    return;
  }

  const vida = enemigo.recibirDaño(ataqueSeleccionado.daño);
  vidaEnemigo.style.width = `${vida}%`;
  jugador.intentosDeAtaque++;
  mostrarMensaje(
    `💥Golpeaste al enemigo con: ${ataqueSeleccionado.nombre}
      Vida enemiga: ${enemigo.vida}%`,
  );
  contenedorTarjetasAcciones.style.display = "grid";
  contenedorTarjetasAtaques.innerHTML = "";
  contenedorTarjetasAtaques.style.display = "none";

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
    `Te curaste. Muy bien!!! ❤️\nTu vida está al: ${jugador.vida}%`,
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
  mensajePopUp.style.display = "none";

  formularioPocionMagica.onsubmit = (e) => {
    e.preventDefault();

    const valorAleatorio = Number(inputPocionMagica.value);

    if (valorAleatorio === 5 || valorAleatorio === 3 || valorAleatorio === 8) {
      mostrarMensaje("La suerte estuvo de parte de los dos; se salvaron!!");
      jugador.intentosDeAtaque = 0;
      formularioPocionMagica.style.display = "none";
    } else if (valorAleatorio > 5) {
      const vida = jugador.recibirDaño(90);
      vidaJugador.style.width = `${vida}%`;
      jugador.intentosDeAtaque = 0;
      enemigo.intentosDeAtaque++;
      const vidaEnemiga = enemigo.curarse(35);
      vidaEnemigo.style.width = `${vidaEnemiga}%`;

      const ataqueDeshabilitado = jugador.deshabilitarAtaque();
      const nombreAtaque = ataqueDeshabilitado
        ? ataqueDeshabilitado.nombre
        : "ninguno";

      mostrarMensaje(
        `Ufff, Ouch!! Lo siento, tu nivel de vida está al:
          ${jugador.vida}%
          \n
          Además perdiste un poder: 
          ${nombreAtaque}
          \n
          "Adicionalmente tu enemigo recuperó vida al:
          ${enemigo.vida}%`,
      );
      formularioPocionMagica.style.display = "none";
      validarColorBarrasVida(jugador.vida, enemigo.vida);
    } else if (valorAleatorio < 5) {
      const vida = enemigo.recibirDaño(30);
      vidaEnemigo.style.width = `${vida}%`;
      const ataqueHabilitado = jugador.habilitarAtaque();

      mostrarMensaje(
        "Golpeaste al enemigo brutalmente, Quedó con vida al: " +
          enemigo.vida +
          "% \n" +
          "Ademas ganaste un nuevo ataque: " +
          (ataqueHabilitado ? ataqueHabilitado.nombre : "ninguno"),
      );
      formularioPocionMagica.style.display = "none";
      validarColorBarrasVida(jugador.vida, enemigo.vida);
    }

    comprobarEstadoDelJuego();
  };
};

// SALIR DEL JUEGO
const salirDelJuego = () => {
  juegoEnMarcha = false;
  contenedorTarjetasAcciones.style.display = "none";
  contenedorTarjetasAtaques.innerHTML = "";
  contenedorTarjetasAtaques.style.display = "none";
  contenedorNivelSangre.style.display = "none";
  formularioIngreso.style.display = "block";
  jugador.vida = 100;
  enemigo.vida = 100;
  vidaJugador.style.width = `${jugador.vida}%`;
  vidaEnemigo.style.width = `${enemigo.vida}%`;
  validarColorBarrasVida(jugador.vida, enemigo.vida);
  jugador.intentosDeAtaque = 0;
  jugador.intentosDeCuracion = 0;
  jugador.ataques = [];
};

// // COMPROBAR RESULTADO
const comprobarEstadoDelJuego = () => {
  if (enemigo.vida <= 0) {
    juegoEnMarcha = false;
    alert(
      "🏆 ¡GANASTE! En la consola presionando F12, veras las estadísticas finales de la partida",
    );
    console.log(
      "Estadísticas:",
      "\nJugador:",
      {
        ...jugador,
        ataques: jugador.ataques.filter((ataque) => ataque.habilitado),
      },
      "\nEnemigo:",
      {
        ...enemigo,
        ataques: enemigo.ataques.filter((ataque) => ataque.habilitado),
      },
    );
    registrarTurno(null);
    return;
  }

  if (jugador.vida <= 0) {
    juegoEnMarcha = false;
    alert(
      "💀 PERDISTE!! En la consola presionando F12, veras las estadísticas finales de la partida",
    );
    console.log(
      "Estadísticas:",
      "\nJugador:",
      {
        ...jugador,
        ataques: jugador.ataques.filter((ataque) => ataque.habilitado),
      },
      "\nEnemigo:",
      {
        ...enemigo,
        ataques: enemigo.ataques.filter((ataque) => ataque.habilitado),
      },
    );
    registrarTurno(null);
    return;
  }
};

const ejecutarAccion = (accion) => {
  switch (accion) {
    case 7:
      mostrarListadoAtaques();
      break;

    case 8:
      curarse();
      break;

    case 9:
      huir();
      break;

    case 10:
      usarPocionMagica();
      break;

    case 11:
      salirDelJuego();
      break;
  }
};

const iniciarJuego = async () => {
  if (juegoEnMarcha) return;

  juegoEnMarcha = true;

  while (juegoEnMarcha) {
    const turno = await esperarTurno();

    if (!turno) continue;

    if (turno.tipo === "ataque") {
      gestionAtaque(turno.id);
    } else {
      ejecutarAccion(turno.id);
    }

    comprobarEstadoDelJuego();
  }

  contenedorTarjetasAcciones.style.display = "none";
  contenedorTarjetasAtaques.style.display = "none";
  contenedorNivelSangre.style.display = "none";
  overlay.style.display = "none";
  mensajePopUp.style.display = "none";
  modalInicio.style.display = "block";
};
