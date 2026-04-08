let respuesta: [number, string];
respuesta = [200, "Ok"];

console.log("Status: ", respuesta[0]);
console.log("Message: ", respuesta[1]);

let usuario: [number, string, boolean];
usuario = [4, "Ardanny", true]; // Arda recuerda que aqui podrias desestructurar esto

console.log(`User ID: ${usuario[0]} \nPassword: ${usuario[1]} \nStatus: ${usuario[2]}`); // Para mejor print :D (Arda recuerda que es con el ` y no el ')