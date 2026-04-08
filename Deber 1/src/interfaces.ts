interface Producto_comercial{ // no me da error, pero aun asi deberia ser una buena practica (import and export problems)
    nombre: string,
    precio: number,
    stock: boolean,
    color?: string
}

const mi_producto: Producto_comercial = {
    nombre: "Computador",
    precio: 850,
    stock: true
}