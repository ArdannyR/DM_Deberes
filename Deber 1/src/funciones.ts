// Funcion con retorno
function sumar(a:number, b:number){ // puedes definir si restorna un number, a lo que vaya o void 
    return a + b;
}

let resultadoSuma:number = sumar(4,9);
console.log(`Resultado de suma: ${resultadoSuma}`)

// Funcion sin retorno
function saludar(nombre: string): void {
    console.log(`Hi there, ${nombre}`);
}

saludar("Ana"); 

// Funcion con parametros opcionales
function saludarConApellido(nombre: string, apellido?: string): string { // si el dato no esta sale como sin definir
    if (apellido) {
        return `Hola, ${nombre} ${apellido}`;
    } else {
        return `Hola, ${nombre}`;
    }
}

console.log(saludarConApellido("Ardanny"));       
console.log(saludarConApellido("Pablo", "Tovar"));

// Funcion con valores por defecto
function saludarConCiudad(nombre: string, ciudad: string = "Desconocida (no se donde)"): string {
    return `Hola, ${nombre} vives en ${ciudad}`;
}

console.log(saludarConCiudad("Ariel"));             
console.log(saludarConCiudad("Andres", "Quito"));  