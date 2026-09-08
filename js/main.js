let vidaJugador = 100;
let vidaEnemigo = 100;
let intentosDeCuracion = 0;
let intentosDeAtaque = 0;
let juegoEnMarcha = true;


// MOSTRAR MENÚ

const mostrarMenu = () => {
  return parseInt(
    prompt(
      "-Tu vida está al: " +
        vidaJugador +
        "%\n" +
        "-La vida de tu enemigo está al: " +
        vidaEnemigo +
        "%\n" +
        "¿Qué quieres hacer?\n" +
        "1. Golpear\n" +
        "2. Curarte\n" +
        "3. Huir\n" +
        "4. Poción mágica (Puede debilitar al enemigo o a ti)\n" +
        "5. Salir de la pelea sin siquiera intentarlo",
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
    vidaEnemigo -= 20;
    intentosDeAtaque++;
    alert("💥 Golpeaste al enemigo.\nVida enemiga: " + vidaEnemigo + "%");
    return;
  }
};


// CURARSE

const curarse = () => {
  if (intentosDeAtaque > 2) {
    alert("No puedes curarte. Selecciona sí o sí la opción 4.");
    return;
  }

  if (vidaJugador >= 50) {
    alert("No seas nena!! Da un par de golpes más 😒");
    return;
  }

  if (intentosDeCuracion === 3) {
    alert(
      "Superaste la cantidad de intentos de cura. Dale, dale, a pelear!!! 😒",
    );
    return;
  }

  vidaJugador = 100;
  intentosDeCuracion++;
  intentosDeAtaque = 0;

  alert("Te curaste. Muy bien!!! ❤️\nTu vida está al: " + vidaJugador + "%");
};


// HUIR

const huir = () => {
  if (vidaJugador > 50) {
    alert(
      "Sos una gallina!! Todavía tienes suficiente vida para seguir peleando. Vamos!!",
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
    alert(valorAleatorio + " es un número incorrecto");
    return;
  }

  if (valorAleatorio >= 5) {
    vidaJugador -= 20;
    intentosDeAtaque = 0;

    alert(
      "Ufff, Ouch!! Lo siento, tu nivel de vida está al: " + vidaJugador + "%",
    );

    return;
  }

  if (vidaJugador > 50) {
    vidaEnemigo -= 30;
    alert(
      "Golpeaste al enemigo brutalmente, Quedó con vida al: " + vidaEnemigo,
    );
    return;
  }

  vidaJugador = 100;
  intentosDeAtaque = 0;
  alert(
    "La suerte estuvo de tu lado. Tu nivel de vida está al: " +
      vidaJugador +
      "%",
  );
};

// SALIR DEL JUEGO

const salirDelJuego = () => {
  juegoEnMarcha = false;

  alert("Nos vemos en la morgue!");

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





