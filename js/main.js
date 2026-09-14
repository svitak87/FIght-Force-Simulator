let vidaJugador = 100;
let vidaEnemigo = 100;
let intentosDeCuracion = 0;
let intentosDeAtaque = 0;
let juegoEnMarcha = true;
const ataques = ["Puño", "Patada", "Espadazo", "Hechizo", "Flecha"];

// MOSTRAR MENÚ
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
      "-Tu vida está al: " +
        vidaJugador +
        "%\n" +
        "-La vida de tu enemigo está al: " +
        vidaEnemigo +
        "%\n" +
        "¿Qué quieres hacer?\n" +
        menuOpciones.join("\n").trim(),
    ),
  );
};

// VALIDAR ACCIÓN
const validarAccion = (accion) => {
  if (!Number(accion) || accion < 1 || accion > 5) {
    alert("❌ Acción inválida. Por favor, ingresa un número del 1 al 5.");
    return false;
  }
  return true;
};

// ATACAR
const seleccionDeAtaque = (opcionAtaque) => {

  const opcionEsNumero = Number(opcionAtaque);

  if ( typeof opcionEsNumero !== "number" || opcionEsNumero < 0 || opcionEsNumero > 4) {
    alert("❌ Acción inválida. Por favor, ingresa un número del 0 al 4.");
    return;
  }

  let ataqueSeleccionado = "";

  for (const ataque of ataques) {
    const indiceAtaque = ataques.indexOf(ataque);
    if (opcionEsNumero === indiceAtaque) {
      ataqueSeleccionado = ataque;
    }
  }
  return ataqueSeleccionado;
};

const mostrarListadoAtaques = () => {
  let listado = "";

  for (const ataque of ataques) {
    const indiceAtaque = ataques.indexOf(ataque);
    listado += indiceAtaque + ". " + ataque + "\n";
  }
  return listado;
};

const atacar = () => {
  if (intentosDeAtaque === 2) {
    intentosDeAtaque++;
    alert(
      "Estás golpeando mucho. Dejemos que la suerte juegue ahora. Selecciona sí o sí la opción 4.",
    );
    return;
  } else if (intentosDeAtaque > 2) {
    alert("Ya no puedes atacar más. Selecciona sí o sí la opción 4.");
    return;
  } else {
    const listadoAtaques = mostrarListadoAtaques();
    const opcionAtaque = prompt(listadoAtaques);
    const ataqueSeleccionado = seleccionDeAtaque(opcionAtaque);
    const existeAtaque = ataques.includes(ataqueSeleccionado);

    if (existeAtaque) {
      vidaEnemigo -= 20;
      intentosDeAtaque++;
      alert(
        "💥Golpeaste al enemigo con: " +
          ataqueSeleccionado +
          "\n" +
          "Vida enemiga: " +
          vidaEnemigo +
          " %",
      );
      return;
    } else {
      alert("❌ No tienes disponible ese poder");
      return;
    }
  }
};

// CURARSE
const curarse = () => {
  if (intentosDeAtaque > 2) {
    alert("❌ No puedes curarte. Selecciona sí o sí la opción 4.");
    return;
  }

  if (vidaJugador >= 50) {
    alert("❌ No seas nena!! Da un par de golpes más 😒");
    return;
  }

  if (intentosDeCuracion === 2) {
    alert(
      "❌ Superaste la cantidad de intentos de cura. Dale, dale, a pelear!!! 😒",
    );
    return;
  }

  vidaJugador = 100;
  intentosDeCuracion++;
  intentosDeAtaque = 0;

  alert("Te curaste. Muy bien!!! ❤️\nTu vida está al: " + vidaJugador + "%");
  return
};

// HUIR
const huir = () => {
  if (vidaJugador > 50) {
    alert(
      "❌ Sos una gallina!! Todavía tienes suficiente vida para seguir peleando. Vamos!!",
    );

    return;
  }

  juegoEnMarcha = false;

  alert("🏃 Escapaste de la pelea. 💀 PERDISTE!!");
};

// POCIÓN MÁGICA
const validarNumero = (valorAleatorio, minimo, maximo) => {
  return valorAleatorio >= minimo && valorAleatorio <= maximo;
};

const usarPocionMagica = () => {
  const valorAleatorio = parseInt(
    prompt(
      "Ingresa un número del 1 al 10. Si la suerte está de tu lado, te vas a curar; si no, te va a doler.",
    ),
  );

  const numeroEsValido = validarNumero(valorAleatorio, 1, 10);

  if (!numeroEsValido) {
    alert("❌" + valorAleatorio + " es un número incorrecto");
    return;
  }
  if(valorAleatorio === 5 || valorAleatorio === 3 || valorAleatorio === 8){
    alert("La suerte estuvo de parte de los dos; se salvaron!!")
    intentosDeAtaque = 0;
    return
  }

  if (valorAleatorio > 5) {
    vidaJugador -= 70;
    intentosDeAtaque = 0;
    const elementoEliminado = ataques.pop();

    alert(
      "Ufff, Ouch!! Lo siento, tu nivel de vida está al: " +
        vidaJugador +
        "%" +
        "\n" +
        "Ademas perdiste un poder: " +
        elementoEliminado,
    );

    return;
  }

  if (valorAleatorio < 5) {
    vidaEnemigo -= 30;
    const nuevoAtaque = "Lanza";
    ataques.push(nuevoAtaque);

    alert(
      "Golpeaste al enemigo brutalmente, Quedó con vida al: " +
        vidaEnemigo +
        "% \n" +
        "Ademas ganaste un nuevo ataque: " +
        nuevoAtaque,
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
  if (vidaEnemigo <= 0) {
    juegoEnMarcha = false;
    alert("🏆 ¡GANASTE!");
    return;
  }

  if (vidaJugador <= 0) {
    juegoEnMarcha = false;
    alert("💀 PERDISTE!!");
    return;
  }
};

alert("⚔️ ¡COMIENZA LA PELEA!");

while (juegoEnMarcha) {
  const accion = mostrarMenu();

  const esValida = validarAccion(accion);

  if (esValida) {
    switch (accion) {
      case 1:
        atacar();
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


