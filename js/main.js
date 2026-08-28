let playerHealth = 100;
let enemyHealth = 100;
let healingAttepms = 0;
let attackAttemps = 0;
let gameRunning = true;
let message = "";

alert("⚔️ ¡COMIENZA LA PELEA!");

while (gameRunning) {
  let action = parseInt(
    prompt(
      "-Tu vida está al: " +
        playerHealth +
        "%\n" +
        "-La vida de tu enemigo está al: " +
        enemyHealth +
        "%\n" +
        "¿Qué quieres hacer? \n" +
        "1. Golpear\n" +
        "2. Curarte\n" +
        "3. Huir\n" +
        "4. Posión mágica (Puede debilitar al enémigo o a ti)",
    ),
  );

  switch (action) {
    case 1:
      if (attackAttemps == 2) {
        message =
          "Estas golpeando mucho. Dejemos que la suerte juegue ahora. Selecciona sí o sí la opción 4.";

        alert(message);
      } else {
        enemyHealth -= 20;
        attackAttemps++;
        message =
          "💥Golpeaste al enemigo.\n Vida enemiga: " + enemyHealth + "%";
        alert(message);
      }
      break;

    case 2:
      if (playerHealth >= 50) {
        message = "No seas nena!! da un par de golpes más 😒";
        alert(message);
      } else if (healingAttepms == 3) {
        message =
          "Superaste las cantidades de intentos de cura. Dale, dale, a pelear!!! 😒";
        alert(message);
      } else {
        playerHealth = 100;
        healingAttepms++;
        message = "Te curaste. Muy bien!!! ❤️" + playerHealth + "%";
        alert(message);
      }
      break;

    case 3:
      gameRunning = false;
      message = "🏃 Escapaste de la pelea. 💀 PERDISTE!!";
      alert(message);
      break;

    case 4:
      let randomValue = parseInt(
        prompt(
          "Ingresa un número del 1 al 10. Si la suerte está de tu lado, te vas a curar; si no, te va a doler.",
        ),
      );

      if (randomValue < 1 || randomValue > 10) {
        message = randomValue + " es un número incorrecto";
        alert(message);
        break
      }

      if (randomValue >= 5) {
        playerHealth = playerHealth - 20;
        attackAttemps = 0;

        ((message =
          "Ufff, Ouch!! Lo siento, tu nivel de vida está al: " +
          playerHealth +
          "%"),
          alert(message));
      } else {
        playerHealth = 100;
        attackAttemps = 0;

        ((message =
          "La suerte estuvo de tu lado. Tu nivel de vida está al: " +
          playerHealth +
          "%"),
          alert(message));
      }
      break;

    default:
      message = "❌ Acción inválida.";
      alert(message);
  }
  if (enemyHealth <= 0) {
    gameRunning = false;
    message = "🏆 ¡GANASTE!";
    alert(message);
  }
  if (playerHealth <= 0) {
    gameRunning = false;
    message = "💀 PERDISTE!!";
    alert(message);
  }
}
