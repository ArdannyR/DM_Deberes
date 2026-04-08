let mensaje: unknown;
mensaje = "Hello world!";

let resultado = (mensaje as string).toUpperCase();
// let resultado = (<string>mensaje).toUpperCase(); // este como otra forma de asegurarle al compilador el tipo de dato que vendra ...

console.log(`Salida: ${resultado}`);