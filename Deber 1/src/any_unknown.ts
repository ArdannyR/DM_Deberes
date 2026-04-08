let apellido_uno: any;
apellido_uno = "Villamar";
console.log("Apellido: ", apellido_uno.toUpperCase());
console.log("Longitud de apellido: ", apellido_uno.length);


let apellido_dos: unknown;
apellido_dos = "Romero";
if (typeof apellido_dos === "string"){
    console.log("Apellido: ", apellido_dos.toUpperCase());
    console.log("Longitud de apellido: ", apellido_dos.length);
}
