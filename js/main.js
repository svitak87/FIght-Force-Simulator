const name = prompt("Ingresa tu nombre por favor:");

let message = "Hola, " + name + "." + " Bienvenido a mi aplicación de sumas!";

alert(message);

const lastName = prompt("Por favor, ahora ingresa tu apellido:");

alert(message = "Tu nombre completo, es: " + name + " " + lastName + ".");

alert(message = "Buenísimo, " + name + " " + lastName + "!!!");

const numA = prompt("Ingresa el primer número")
const numB = prompt("Ahora ingresa el segundo número")

alert(message = "Presiona 'Aceptar' para ver el resultado, " + name + ".")

const sumResult = parseFloat(numA) + parseFloat(numB)

alert(message = "El resultado es: " + sumResult)

alert(message = "Espero que te haya sido útil la aplicación. " + name  + ",  recuerda que puedes ver el resultado y el tipo de dato en la consola, presionando la tecla F12. Chauu!!")

console.log("Tipo de dato: " + typeof sumResult + "." + " Resultado de la suma: " + sumResult)

