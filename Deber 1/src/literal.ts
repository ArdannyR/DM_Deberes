// literal solo acepta valores exactos/especificos

type Talla_camisa = 'small' | 'medium' | 'large';
let mi_talla:Talla_camisa;
mi_talla = 'small'; // solo puede ser de las 3 opciones, ninguna otra mas. no se limita solo con ser str.

type Calificacion = 1|2|3|4|5 // jsjsjs no hay como hacer esto mas corto, ojala no pida hasta el 100...
let mi_calif:Calificacion = 4;