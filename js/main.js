let juegoEnMarcha = true;

class Jugador {
  constructor(nombre) {
    this.nombre = nombre;
    this.intentosDeCuracion = 0;
    this.intentosDeAtaque = 0;
    this.vida = 100;
    this.ataques = [
      { id: 1, nombre: "Puño", daño: 20, habilitado: true },
      { id: 2, nombre: "Patada", daño: 25, habilitado: true },
      { id: 3, nombre: "Espadazo", daño: 30, habilitado: true },
      { id: 4, nombre: "Hechizo", daño: 35, habilitado: true },
      { id: 5, nombre: "Flecha", daño: 40, habilitado: true },
      { id: 6, nombre: "Lanza", daño: 15, habilitado: false },
    ];
  }
  recibirDaño(daño) {
    this.vida -= daño;

    if (this.vida < 0) {
      this.vida = 0;
    }
  }

  curarse(medicina) {
    let resultadoVida = (this.vida += medicina);

    if (resultadoVida >= 100) {
      this.vida = 100;
    }
  }
  deshabilitarAtaque(){
    const ataqueAdeshabilitar = this.ataques.find((ataque) => ataque.habilitado)
    if(ataqueAdeshabilitar){
      ataqueAdeshabilitar.habilitado = false
    }
    return ataqueAdeshabilitar
  }
  habilitarAtaque(){
    const ataqueAhabilitar = this.ataques.find((ataque) => ataque.nombre === "Lanza")

    if(ataqueAhabilitar){
      ataqueAhabilitar.habilitado = true
    }
    return ataqueAhabilitar
  }
}
5;
// MOSTRAR MENÚ
const validarAccion = (accion) => {
  if (!Number(accion) || accion < 1 || accion > 5) {
    alert("❌ Acción inválida. Por favor, ingresa un número del 1 al 5.");
    return false;
  }
  return true;
};
const mostrarMenu = () => {
  const opciones = [
    { id: 1, descripcion: "Golpear" },
    { id: 2, descripcion: "Curarte" },
    { id: 3, descripcion: "Huir" },
    { id: 4, descripcion: "Poción mágica (Puede debilitar al enemigo o a ti)" },
    { id: 5, descripcion: "Salir de la pelea sin siquiera intentarlo" },
  ];

  return parseInt(
    prompt(
      jugador.nombre +
        ", tiene vida al: " +
        jugador.vida +
        "%\n" +
        enemigo.nombre +
        ", tiene vida al: " +
        enemigo.vida +
        "%\n" +
        "¿Qué quieres hacer?\n" +
        opciones.map((opcion) => {
          return opcion.id + ". " + opcion.descripcion + "\n";
        }),
    ),
  );
};

// ATACAR
const mostrarListadoAtaques = (ataques) => {
  let listadoAtaques = "";

  ataques.forEach((ataque) => {
    if (ataque.habilitado) {
      listadoAtaques += ataque.id + ". " + ataque.nombre + "\n";
    }
  });

  return listadoAtaques;
};

const gestionAtaque = (opcionAtaque) => {
  if (jugador.intentosDeAtaque > 2) {
    alert("Ya no puedes atacar más. Selecciona sí o sí la opción 4.");
    return;
  }
  if (jugador.intentosDeAtaque === 2) {
    jugador.intentosDeAtaque++;
    alert(
      "Estás golpeando mucho. Dejemos que la suerte juegue ahora. Selecciona sí o sí la opción 4.",
    );
    return;
  }

  if (
    typeof opcionAtaque !== "number" ||
    opcionAtaque < 1 ||
    opcionAtaque > 6 ||
    isNaN(opcionAtaque)
  ) {
    alert("❌ Acción inválida. Por favor, ingresa un número del 1 al 6.");
    return;
  }

  let ataqueSeleccionado = "";

  jugador.ataques.find((ataque) => {
    if (ataque.id === opcionAtaque && ataque.habilitado) {
      ataqueSeleccionado = ataque;
      return;
    }
    // if (!ataque.habilitado) {
    //   alert("❌ No tienes disponible ese poder");
    // }
  });

  if (ataqueSeleccionado) {
    enemigo.recibirDaño(ataqueSeleccionado.daño);
    jugador.intentosDeAtaque++;
    alert(
      "💥Golpeaste al enemigo con: " +
        ataqueSeleccionado.nombre +
        "\n" +
        "Vida enemiga: " +
        enemigo.vida +
        " %",
    );
    return;
  }

  if (!ataqueSeleccionado.habilitado) {
    alert("❌ No tienes disponible ese poder");
  }
};

// CURARSE
const curarse = () => {
  if (jugador.intentosDeAtaque > 2) {
    jugador.intentosDeCuracion++;
    alert("❌ No puedes curarte. Selecciona sí o sí la opción 4.");
    return;
  }

  if (jugador.vida >= 50) {
    jugador.intentosDeCuracion++;
    alert("❌ No seas nena!! Da un par de golpes más 😒");
    return;
  }

  if (jugador.intentosDeCuracion === 2) {
    jugador.intentosDeCuracion++;
    alert(
      "❌ Superaste la cantidad de intentos de cura. Dale, dale, a pelear!!! 😒",
    );
    return;
  }

  jugador.curarse(20);
  jugador.intentosDeCuracion++;
  jugador.intentosDeAtaque = 0;

  alert("Te curaste. Muy bien!!! ❤️\nTu vida está al: " + jugador.vida + "%");
  return;
};

// HUIR
const huir = () => {
  if (jugador.vida > 50) {
    alert(
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

// POCIÓN MÁGICA
const validarNumero = (valorAleatorio, minimo, maximo) => {
  if (isNaN(valorAleatorio)) {
    return valorAleatorio;
  }
  return (
    (valorAleatorio >= minimo && valorAleatorio <= maximo) ||
    isNaN(valorAleatorio)
  );
};

const usarPocionMagica = () => {
  const valorAleatorio = parseInt(
    prompt(
      "Ingresa un número del 1 al 10. Si la suerte está de tu lado, te vas a curar; si no, te va a doler.",
    ),
  );

  const numeroEsValido = validarNumero(valorAleatorio, 1, 10);

  if (!numeroEsValido) {
    alert("❌" + valorAleatorio + " es un número o caracter incorrecto");
    return;
  }

  if (valorAleatorio === 5 || valorAleatorio === 3 || valorAleatorio === 8) {
    alert("La suerte estuvo de parte de los dos; se salvaron!!");
    jugador.intentosDeAtaque = 0;
    return;
  }

  if (valorAleatorio > 5) {
    jugador.recibirDaño(70);
    jugador.intentosDeAtaque = 0;
    enemigo.intentosDeAtaque++;
    enemigo.curarse(35);
    
    const ataqueDehabilitado = jugador.deshabilitarAtaque()

    alert(
      "Ufff, Ouch!! Lo siento, tu nivel de vida está al: " +
        jugador.vida +
        "%" +
        "\n" +
        "Además perdiste un poder: " +
        ataqueDehabilitado.nombre +
        "\n" +
        "Adicionalmente tu enemigo recuperó vida al: " +
        enemigo.vida +
        "%",
    );
  }

  if (valorAleatorio < 5) {
    enemigo.recibirDaño(30);
    const ataqueHabilitado = jugador.habilitarAtaque()
    // const nuevoAtaque = jugador.ataques.find((ataque) => !ataque.habilitado);
    // if (nuevoAtaque) {
    //   nuevoAtaque.habilitado = true;
    // }
    // const nuevoAtaque = { id: 6, nombre: "Lanza", daño: 15, habilitado: true };
    // jugador.ataques.push(nuevoAtaque);
  
    alert(
      "Golpeaste al enemigo brutalmente, Quedó con vida al: " +
        enemigo.vida +
        "% \n" +
        "Ademas ganaste un nuevo ataque: " +
        ataqueHabilitado.nombre,

    );
    return;
  }
};


// SALIR DEL JUEGO
const salirDelJuego = () => {
  juegoEnMarcha = false;

  alert("❌ Nos vemos en la morgue!");

  return;
};

// COMPROBAR RESULTADO
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
    return;
  }
};

alert("⚔️ ¡COMIENZA LA PELEA!");

const nombreJugador = prompt("Dale nombre a tu personaje:");
const jugador = new Jugador(nombreJugador);

const nombreEnemigo = prompt("Dale nombre a tu enemigo:");
const enemigo = new Jugador(nombreEnemigo);

while (juegoEnMarcha) {
  const accion = mostrarMenu();

  const esValida = validarAccion(accion);

  if (esValida) {
    switch (accion) {
      case 1:
        const opcionAtaque = prompt(mostrarListadoAtaques(jugador.ataques));
        gestionAtaque(Number(opcionAtaque));
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

    comprobarEstadoDelJuego();
  }
}
