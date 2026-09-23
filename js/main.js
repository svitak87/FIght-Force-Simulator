let juegoEnMarcha = true;

class Jugador {
  constructor(nombre) {
    this.nombre = nombre;
    this.intentosDeCuracion = 0;
    this.intentosDeAtaque = 0;
    this.vida = 100;
    this.ataques = [
      { nombre: "Puño", daño: 20 },
      { nombre: "Patada", daño: 25 },
      { nombre: "Espadazo", daño: 30 },
      { nombre: "Hechizo", daño: 35 },
      { nombre: "Flecha", daño: 40 },
    ];
  }
  atacar(opcionAtaque) {
    if (this.intentosDeAtaque > 2) {
      alert("Ya no puedes atacar más. Selecciona sí o sí la opción 4.");
      return;
    }
    if (this.intentosDeAtaque === 2) {
      this.intentosDeAtaque++;
      alert(
        "Estás golpeando mucho. Dejemos que la suerte juegue ahora. Selecciona sí o sí la opción 4.",
      );
      return;
    }

    if (
      typeof opcionAtaque !== "number" ||
      opcionAtaque < 0 ||
      opcionAtaque > 4 ||
      isNaN(opcionAtaque)
    ) {
      alert("❌ Acción inválida. Por favor, ingresa un número del 0 al 4.");
      return;
    }

    let ataqueSeleccionado = "";

    for (const ataque of this.ataques) {
      const indiceAtaque = this.ataques.indexOf(ataque);
      if (opcionAtaque === indiceAtaque) {
        ataqueSeleccionado = ataque;
      }
    }
    let estadoVida = null;
    if (ataqueSeleccionado) {
      estadoVida = enemigo.vida -= ataqueSeleccionado.daño;
      if (estadoVida <= 0) {
        estadoVida = 0;
        enemigo.vida = estadoVida;
      }
      this.intentosDeAtaque++;
      alert(
        "💥Golpeaste al enemigo con: " +
          ataqueSeleccionado.nombre +
          "\n" +
          "Vida enemiga: " +
          enemigo.vida +
          " %",
      );
      return;
    } else {
      alert("❌ No tienes disponible ese poder");
      return;
    }
  }
}

// MOSTRAR MENÚ
const validarAccion = (accion) => {
  if (!Number(accion) || accion < 1 || accion > 5) {
    alert("❌ Acción inválida. Por favor, ingresa un número del 1 al 5.");
    return false;
  }
  return true;
};
const mostrarMenu = () => {
  const menuOpciones = [
    "1. Golpear",
    "2. Curarte",
    "3. Huir",
    "4. Poción mágica (Puede debilitar al enemigo o a ti)",
    "5. Salir de la pelea sin siquiera intentarlo",
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
        menuOpciones.join("\n").trim(),
    ),
  );
};

// ATACAR
const mostrarListadoAtaques = (ataques) => {
  let listadoAtaques = "";

  for (const ataque of ataques) {
    const indiceAtaque = ataques.indexOf(ataque);
    listadoAtaques += indiceAtaque + ". " + ataque.nombre + "\n";
  }
  return listadoAtaques;
};

// CURARSE
const curarse = () => {
  if (jugador.intentosDeAtaque > 2) {
    jugador.intentosDeCuracion++
    alert("❌ No puedes curarte. Selecciona sí o sí la opción 4.");
    return;
  }

  if (jugador.vida >= 50) {
    jugador.intentosDeCuracion++
    alert("❌ No seas nena!! Da un par de golpes más 😒");
    return;
  }

  if (jugador.intentosDeCuracion === 2) {
    jugador.intentosDeCuracion++
    alert(
      "❌ Superaste la cantidad de intentos de cura. Dale, dale, a pelear!!! 😒",
    );
    return;
  }

  jugador.vida += 20;
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

  let resultadoVida = null;
  if (valorAleatorio > 5) {
    resultadoVida = jugador.vida -= 70;

    if (resultadoVida <= 0) {
      resultadoVida = 0;
      jugador.vida = resultadoVida;
    }
    jugador.intentosDeAtaque = 0;
    enemigo.intentosDeAtaque++;
    const elementoEliminado = jugador.ataques.pop();

    alert(
      "Ufff, Ouch!! Lo siento, tu nivel de vida está al: " +
        jugador.vida +
        "%" +
        "\n" +
        "Ademas perdiste un poder: " +
        elementoEliminado.nombre,
    );

    return;
  }

  if (valorAleatorio < 5) {
    enemigo.vida -= 30;
    const nuevoAtaque = { nombre: "Lanza", daño: 15 };
    jugador.ataques.push(nuevoAtaque);

    alert(
      "Golpeaste al enemigo brutalmente, Quedó con vida al: " +
        enemigo.vida +
        "% \n" +
        "Ademas ganaste un nuevo ataque: " +
        nuevoAtaque.nombre,
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
    enemigo.vida = 0;
    juegoEnMarcha = false;
    alert(
      "🏆 ¡GANASTE! En la consola presionando F12, veras las estadísticas finales de la partida",
    );
    console.log("Estadísticas:", "\nJugador:", jugador, "\nEnemigo:", enemigo);
    return;
  }

  if (jugador.vida <= 0) {
    jugador.vida = 0;
    juegoEnMarcha = false;
    alert(
      "💀 PERDISTE!! En la consola presionando F12, veras las estadísticas finales de la partida",
    );
    console.log("Estadísticas:\n", "Jugador:", jugador, "\nEnemigo:", enemigo);
    return;
  }
};

alert("⚔️ ¡COMIENZA LA PELEA!");

const jugador = new Jugador("Oscar");
const enemigo = new Jugador("enemigo");


while (juegoEnMarcha) {
  const accion = mostrarMenu();

  const esValida = validarAccion(accion);

  if (esValida) {
    switch (accion) {
      case 1:
        const opcionAtaque = prompt(mostrarListadoAtaques(jugador.ataques));
        jugador.atacar(Number(opcionAtaque));
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


