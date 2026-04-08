// Conjunto de constantes nombradas

enum EstadoPedido{
    Inicial, EnProceso, Enviado, Recibido
};

let estado_p: EstadoPedido;
estado_p = EstadoPedido.Enviado;
console.log(`Estado de pedido: ${estado_p}`); // por defecto solo manda un numero de 0 a ... por el orden puesto

enum EstadoCompra{
    Inicial = "I", Facturado = "F", Devuelto = "D", Recibido = "R"
};

let estado_c: EstadoCompra;
estado_c = EstadoCompra.Devuelto;
console.log(`Estado de compra: ${estado_c}`); 

enum EstadoCodigo{
    ok = 200, notFound = 404, serverError = 405
};

let estado_cod: EstadoCodigo;
estado_cod = EstadoCodigo.ok;
console.log(`Estado del codigo: ${estado_cod}`); 