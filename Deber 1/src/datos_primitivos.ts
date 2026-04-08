// Declarar datos de tipo: number, string o boolean
//  Primer metodo 
let edad_a: number;
let nombre_a: string;
let esAdmin_a: boolean;
edad_a = 21;
nombre_a = "Ardanny";
esAdmin_a = false;

//  Segundo metodo
let edad_b = 20;
let nombre_b = "Esau";
let esAdmin_b = false;

//  Tercer metodo
let edad_c: number = 21;
let nombre_c: string = "Ardanny";
let esAdmin_c: boolean = false;

// Declarar datos de null y undefined
let profesion: string | null; // Aqui puedes usar el | para decir si es uno u otro
profesion = null;
profesion = "programador";

let pais;
//este dato todavía no se le ha asignado algun valor (undefined es no hay nada y null es hay vacio, a mi forma de entender...)


/*
Dato curioso: null == undefined es true pues los == toman como igual al valor que representan, 
mas null === undefined es false, pues el === considera tambien el tipo de datos a comparacion
*/