type Persona = { // definir las propiedades de un objeto hace que los demas sigan las mimsa estructura de porpiedades que la orinal tenga (alias)
    readonly id: number, // readonly impide que una propiedad sea modificada
    nombre: string,
    email?: string, // el ? hace que una propiedad sea opcional
    esAdmin: boolean // estos son ej de tipo de objeto anonimo 
} 

const persona_uno:Persona = {
    id: 1,
    nombre: "Esau",
    email: "esau@test.com",
    esAdmin: false
}

const persona_dos:Persona = {
    id: 2,
    nombre: "Ardany",
    esAdmin: true
}

persona_dos.nombre = "Ardanny"

console.table(persona_uno);
console.table(persona_dos);
