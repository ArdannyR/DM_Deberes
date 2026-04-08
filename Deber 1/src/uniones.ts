// Union (una var puede tener un tipo de dato u otro)
type Id_persona_type = number | string;
let id_persona: Id_persona_type;
// o  let id_persona: number | string;

id_persona = "av-01";
id_persona = 49;

imprimirCodigo(id_persona);

function imprimirCodigo(id: Id_persona_type) { // narrowing por condiconal
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
}

// Intersecciones (convinar propiedades en una sola)
type Producto = {
    id: number;
    nombre: string;
    precio: number
}
type Con_descuento = {
    descuento: number;
}

type Producto_con_Descuento = Producto & Con_descuento;

const libro_en_oferta: Producto_con_Descuento = {
    id: 16,
    nombre: "El Cuervo",
    precio: 20.49,
    descuento: 0.12
};
