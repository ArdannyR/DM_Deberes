let frutas:string[] = ["Uvas", "Manzana verde", "Cereza"];
// o let frutas:string[]; frutas = ["Uvas", "Manzana verde", "Cereza"];
console.log(frutas[0]);
console.log(frutas[1]);
console.log(frutas[2]);

let calificaciones:number[] = [9,4,6,1];
// o let calificaciones: Array<number> = [9,4,6,1];
calificaciones.forEach(calificacion => {
    console.log(calificacion);
});