// El contrato define lo que iras manejando en tu response, a la final te ayuda a ver con certeza que propiedades vas usando
interface ProductoAPI{
    id: number,
    title: string,
    slug: string,
    price: number,
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
        slug: string
    };
    images: string[];
    creationAt: string; // estas 2 se veian aparte
    updatedAt: string;
}


async function obtenerProducto(idProducto: number):Promise<ProductoAPI> {
  const url = `https://api.escuelajs.co/api/v1/products/${idProducto}`;
  const response = await fetch(url);
  const data:ProductoAPI = await response.json();
  return data; 
}

async function obtenerTitulo(idProducto: number): Promise<string> {
  const producto = await obtenerProducto(idProducto);
  return producto.title;
}

async function test(idProducto: number) {
  const tituloProducto = await obtenerTitulo(idProducto);
  console.log("El título del producto es:",  tituloProducto);
}

test(14); // Nota: en la api dice tener 50 prodcutos, el 2, el 4 y posiblemente otros mas no funcionan... jsjsjs (usa la url para ver que viene en el jsno y asi identificar que vas a usar)

