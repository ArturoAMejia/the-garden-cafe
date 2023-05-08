import {
  IDetalleProductoElaborado,
  IIngrediente,
  IProductoElaborado,
} from "@/interfaces";
import { IProducto } from "@/interfaces/producto";

export const politicas = [
  {
    clasificacion: "A",
    porcentaje: 80,
  },
  {
    clasificacion: "B",
    porcentaje: 15,
  },
  {
    clasificacion: "C",
    porcentaje: 5,
  },
];

export const ingredientes = [
  // Carne de res
  {
    id_estado: 8,
    id_marca: 5,
    id_categoria_producto: 7, //Carnes
    id_sub_categoria_producto: 10, //Huevo
    id_tipo_producto: 1,
    id_unidad_medida: 1, //cajilla de 30 und (unidad)
    id_proveedor: 1,
    nombre: "Lomo de Res",
    descripcion: "Lomo de res",
    imagen: "/img/ingredientes/carne-res.jpg",
  },
  // Cebolla
  {
    id_estado: 8,
    id_marca: 5,
    id_categoria_producto: 8, // Verduras
    id_sub_categoria_producto: 11, // Verduras
    id_tipo_producto: 1,
    id_unidad_medida: 1, //cajilla de 30 und (unidad)
    id_proveedor: 1,
    nombre: "Cebolla",
    descripcion: "Cebolla blanca",
    imagen: "/img/ingredientes/cebolla.jpg",
  },
  // Cebolla Morada
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 8, //Verduras
    id_sub_categoria_producto: 11, // Verduras
    id_tipo_producto: 1,
    id_unidad_medida: 1, //libras
    id_proveedor: 1,
    nombre: "Cebolla",
    descripcion: "Cebolla morada grande ",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
  //  Chiltoma
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 8, //Verduras
    id_sub_categoria_producto: 9, //Pimiento
    id_tipo_producto: 1,
    id_unidad_medida: 1, //libras
    id_proveedor: 1,
    nombre: "Chiltoma",
    descripcion: "Chiltoma verde grande",
    imagen: "/img/Ingredientes/chiltoma.jpg",
  },
  // Aceite
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 9, //Aceites
    id_sub_categoria_producto: 10, //
    id_tipo_producto: 1,
    id_unidad_medida: 1, //Galones (valde de aceite contiene 5 galones)
    id_proveedor: 1,
    nombre: "Aceite",
    descripcion: "Aceite Vegetal de maíz sin colesterol",
    imagen: "/img/Ingredientes/aceite.jpg",
  },
  // Sal
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 10, //Condimento
    id_sub_categoria_producto: 11, //
    id_tipo_producto: 1,
    id_unidad_medida: 1, //Quintal  (100 libras)
    id_proveedor: 1,
    nombre: "Sal",
    descripcion: "Sal Nacional",
    imagen: "/img/Ingredientes/sal.jpg",
  },
  // Crema Acida
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 11, //Lácteo
    id_sub_categoria_producto: 12, //Salsa
    id_tipo_producto: 1,
    id_unidad_medida: 1, //Galon
    id_proveedor: 1,
    nombre: "Crema ácida",
    descripcion: "Crema ácida Nacional",
    imagen: "/img/Ingredientes/crema.jpg",
  },
  // Salsa de Queso
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 11, //Lácteo
    id_sub_categoria_producto: 13, //Salsa
    id_tipo_producto: 1,
    id_unidad_medida: 1, //Galon
    id_proveedor: 1,
    nombre: "Salsa Cheddar",
    descripcion: "Salsa de queso exquisito",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
  // Salsa Chipotle
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 12, //
    id_sub_categoria_producto: 14, //Salsa
    id_tipo_producto: 1,
    id_unidad_medida: 1, //Galon
    id_proveedor: 1,
    nombre: "Salsa Chipotle",
    descripcion:
      "Salsa Chipotle ideal para disfrutar con gran variedad de botanas",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
  // Banano
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 13, //Frutas
    id_sub_categoria_producto: 15, //
    id_tipo_producto: 1,
    id_unidad_medida: 1, //Unidades
    id_proveedor: 1,
    nombre: "Banano",
    descripcion: "Banano Nacional",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
  // Papaya
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 13, //Frutas
    id_sub_categoria_producto: 15, //
    id_tipo_producto: 1,
    id_unidad_medida: 1, //Unidades
    id_proveedor: 1,
    nombre: "Papaya",
    descripcion: "Papaya Nacional",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
  // Mandarina
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 13, //Frutas
    id_sub_categoria_producto: 15, //
    id_tipo_producto: 1,
    id_unidad_medida: 1, //Unidades (libras)
    id_proveedor: 1,
    nombre: "Mandarina",
    descripcion: "Mandarina Nacional",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
  // Ingredientes Tortilla
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 14, //Tortilla
    id_sub_categoria_producto: 16, //
    id_tipo_producto: 1,
    id_unidad_medida: 1, //gr(unidades bimbo vende bolsitas de 5und)
    id_proveedor: 1,
    nombre: "Tortilla de harina",
    descripcion: "Tortilla de harina bimbo",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
];

export const platillos: IProductoElaborado[] = [
  // Platillo Burrito
  {
    id_estado: 5,
    id_categoria_producto: 1,
    id_sub_categoria_producto: 3,
    id_unidad_medida: 1,
    nombre: "Burrito",
    descripcion:
      "Huevos revueltos, salsa cheddar, gallo pinto, crema ácida, salsa chiplote en tortilla de harina, acompañado de frutas tropicales",
    imagen: "/img/productos/dragon_fruit_bowl.jpg",
    cod_producto: "lorem12",
    id_zona_preparacion: 1,
    precio_producto: 12,
  },
];

export const platillo_ingredientes: IDetalleProductoElaborado[] = [
  {
    id_producto_elaborado: 15,
    id_producto: 1,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 15,
    id_producto: 2,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 15,
    id_producto: 4,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 15,
    id_producto: 8,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 15,
    id_producto: 9,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 15,
    id_producto: 10,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 15,
    id_producto: 11,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 15,
    id_producto: 12,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 15,
    id_producto: 13,
    cantidad: 1,
    id_estado: 5,
  },
];
