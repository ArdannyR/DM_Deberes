// Declarar datos de tipo: int, str o booleans
//  Primer metodo 

let edad: number;
let nombre: string;
let esAdmin: boolean;
edad = 21;
nombre = "Ardanny";
esAdmin = false;

//  Segundo metodo
let age = 20;
let name = "Esau";
let isAdmin = false;

//  Tercer metodo
let edad_b: number = 21;
let nombre_b: string = "Ardanny";
let esAdmin_b: boolean = false;

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