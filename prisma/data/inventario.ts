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
    nombre: "Cebolla blanca",
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
    nombre: "Cebolla Morada",
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
  // Pan
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 15, // Pan
    id_sub_categoria_producto: 17, //
    id_tipo_producto: 1,
    id_unidad_medida: 3, //gr(unidades bimbo vende bolsitas de 5und)
    id_proveedor: 1,
    nombre: "Pan de Molde",
    descripcion: "Pan blanco de molde",
    imagen: "/img/Ingredientes/pan.jpg",
  },
  // Chia
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 16, // Semilla
    id_sub_categoria_producto: 18, // Cereal
    id_tipo_producto: 1,
    id_unidad_medida: 1, //gr(unidades bimbo vende bolsitas de 5und)
    id_proveedor: 1,
    nombre: "Chia",
    descripcion: "Semilla de Chia",
    imagen: "/img/Ingredientes/chia.jpg",
  },
  // Huevo
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 7,
    id_sub_categoria_producto: 9,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Huevo",
    descripcion: "Huevo granjero, rojo granel, grande",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
  // Pitahaya
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 13,
    id_sub_categoria_producto: 15,
    id_tipo_producto: 1,
    id_unidad_medida: 3,
    id_proveedor: 1,
    nombre: "Pitahaya",
    descripcion: "Pitahaya Nacional",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
  // Piña
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 13,
    id_sub_categoria_producto: 15,
    id_tipo_producto: 1,
    id_unidad_medida: 3,
    id_proveedor: 1,
    nombre: "Piña",
    descripcion: "Piña Nacional",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
  // Yogurt
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 1,
    id_sub_categoria_producto: 3,
    id_tipo_producto: 1,
    id_unidad_medida: 1,
    id_proveedor: 1,
    nombre: "Yogurt",
    descripcion: " Yogurt griego, Sabor natural y sin azúcar ",
    imagen: "/img/Ingredientes/yogurt.jpg",
  },
  // Coco
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 13,
    id_sub_categoria_producto: 15,
    id_tipo_producto: 1,
    id_unidad_medida: 3,
    id_proveedor: 1,
    nombre: "Coco",
    descripcion: "Coco Nacional",
    imagen: "/img/Ingredientes/coco.jpg",
  },
  // Almendras
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 13,
    id_sub_categoria_producto: 15,
    id_tipo_producto: 1,
    id_unidad_medida: 3,
    id_proveedor: 1,
    nombre: "Almendras",
    descripcion: "Almendras Nacional",
    imagen: "/img/Ingredientes/almendra.jpg",
  },
  // Blueberries
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 13,
    id_sub_categoria_producto: 15,
    id_tipo_producto: 1,
    id_unidad_medida: 3,
    id_proveedor: 1,
    nombre: "Blueberries",
    descripcion: "Blueberries extranjero",
    imagen: "/img/Ingredientes/blueberry.jpg",
  },
  // Mango
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 13,
    id_sub_categoria_producto: 15,
    id_tipo_producto: 1,
    id_unidad_medida: 3,
    id_proveedor: 1,
    nombre: "Mango",
    descripcion: "Mango Nacional",
    imagen: "/img/Ingredientes/Huevo.jpg",
  },
  // Quinoa
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 16,
    id_sub_categoria_producto: 18,
    id_tipo_producto: 1,
    id_unidad_medida: 1,
    id_proveedor: 1,
    nombre: "Quinoa",
    descripcion: "Quinoa",
    imagen: "/img/Ingredientes/quinoa.jpg",
  },
  // Aguacate
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 8,
    id_sub_categoria_producto: 11,
    id_tipo_producto: 1,
    id_unidad_medida: 3,
    id_proveedor: 1,
    nombre: "Aguacate",
    descripcion: "Aguacate",
    imagen: "/img/Ingredientes/aguacate.jpg",
  },
  // Salmon
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 7,
    id_sub_categoria_producto: 22,
    id_tipo_producto: 1,
    id_unidad_medida: 1,
    id_proveedor: 1,
    nombre: "Salmon",
    descripcion: "Salmon fresco",
    imagen: "/img/Ingredientes/salmon.jpg",
  },
  // Queso crema
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 11,
    id_sub_categoria_producto: 16,
    id_tipo_producto: 1,
    id_unidad_medida: 1,
    id_proveedor: 1,
    nombre: "Queso Crema",
    descripcion: "Queso Crema Philadelphia",
    imagen: "/img/Ingredientes/queso-crema.jpg",
  },
  // Champagne
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 4,
    id_sub_categoria_producto: 23,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Champagne",
    descripcion: "Champagne Moet Chandon",
    imagen: "/img/Ingredientes/Champagne.jpg",
  },
  // Jugo de Naranja
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 17,
    id_sub_categoria_producto: 24,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Jugo de Naranja",
    descripcion: "Jugo de Naranja La Perfecta",
    imagen: "/img/Ingredientes/jugo-de-naranja.jpg",
  },
  //  Jugo de tomate
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 12,
    id_sub_categoria_producto: 23,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Jugo de tomate",
    descripcion: "Jugo de tomate ",
    imagen: "/img/Ingredientes/jugo-de-tomate.jpg",
  },
  // Vodka
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 4,
    id_sub_categoria_producto: 23,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Vodka",
    descripcion: "Vodka Smirnoff",
    imagen: "/img/Ingredientes/vodka.jpg",
  },
  // Jugo de limon
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 17,
    id_sub_categoria_producto: 24,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Jugo de Limon",
    descripcion: "Jugo de Limon Natural",
    imagen: "/img/Ingredientes/JugodeLimon.jpg",
  },
  // Jugo de toronja
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 17,
    id_sub_categoria_producto: 24,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Jugo de Toronja",
    descripcion: "Jugo de Toronja Natural",
    imagen: "/img/Ingredientes/JugodeToronja.jpg",
  },
  // Tequila
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 4,
    id_sub_categoria_producto: 23,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Tequila",
    descripcion: "Tequila Don Julio",
    imagen: "/img/Ingredientes/Tequila.jpg",
  },
  // Agua
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 5,
    id_sub_categoria_producto: 26,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Agua",
    descripcion: "Agua Fuente pura",
    imagen: "/img/Ingredientes/Agua.jpg",
  },
  // Cafe
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 5,
    id_sub_categoria_producto: 27,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Café",
    descripcion: "Café 100% puro",
    imagen: "/img/Ingredientes/Café.jpg",
  },
  // Leche
  {
    id_estado: 5,
    id_marca: 1,
    id_categoria_producto: 11,
    id_sub_categoria_producto: 28,
    id_tipo_producto: 1,
    id_unidad_medida: 5,
    id_proveedor: 1,
    nombre: "Leche",
    descripcion: "Leche Eskimo",
    imagen: "/img/Ingredientes/Leche.jpg",
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
  // Tostada de Aguacate
  {
    id_producto_elaborado: 1,
    id_producto: 20,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 1,
    id_producto: 21,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 1,
    id_producto: 22,
    cantidad: 1,
    id_estado: 5,
  },
  // Pitahaya bowl
  {
    id_producto_elaborado: 2,
    id_producto: 23,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 2,
    id_producto: 24,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 2,
    id_producto: 16,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 2,
    id_producto: 25,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 2,
    id_producto: 26,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 2,
    id_producto: 27,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 2,
    id_producto: 28,
    cantidad: 1,
    id_estado: 5,
  },
  // Fruta yogurt granola
  {
    id_producto_elaborado: 3,
    id_producto: 25,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 3,
    id_producto: 21,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 3,
    id_producto: 5,
    cantidad: 1,
    id_estado: 5,
  },
  // Mango Bowl
  {
    id_producto_elaborado: 4,
    id_producto: 29,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 4,
    id_producto: 24,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 4,
    id_producto: 16,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 4,
    id_producto: 25,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 4,
    id_producto: 26,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 4,
    id_producto: 27,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 4,
    id_producto: 28,
    cantidad: 1,
    id_estado: 5,
  },
  // Power bowl
  {
    id_producto_elaborado: 5,
    id_producto: 30,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 5,
    id_producto: 31,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 5,
    id_producto: 2,
    cantidad: 1,
    id_estado: 5,
  },
  // Tostadas superbe
  {
    id_producto_elaborado: 6,
    id_producto: 32,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 6,
    id_producto: 33,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 6,
    id_producto: 4,
    cantidad: 1,
    id_estado: 5,
  },
  // Yogurt granola
  {
    id_producto_elaborado: 7,
    id_producto: 3,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 7,
    id_producto: 5,
    cantidad: 1,
    id_estado: 5,
  },
  // Mimosa
  {
    id_producto_elaborado: 9,
    id_producto: 34,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 9,
    id_producto: 35,
    cantidad: 1,
    id_estado: 5,
  },
  // Blody mary
  {
    id_producto_elaborado: 8,
    id_producto: 36,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 8,
    id_producto: 37,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 8,
    id_producto: 38,
    cantidad: 1,
    id_estado: 5,
  },
  // Paloma
  {
    id_producto_elaborado: 10,
    id_producto: 39,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 10,
    id_producto: 40,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 10,
    id_producto: 38,
    cantidad: 1,
    id_estado: 5,
  },
  // Screwdriver
  {
    id_producto_elaborado: 11,
    id_producto: 37,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 11,
    id_producto: 35,
    cantidad: 1,
    id_estado: 5,
  },
  // Macchiato
  {
    id_producto_elaborado: 12,
    id_producto: 41,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 12,
    id_producto: 42,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 12,
    id_producto: 43,
    cantidad: 1,
    id_estado: 5,
  },
  // Capuccino
  {
    id_producto_elaborado: 13,
    id_producto: 41,
    cantidad: 1,
    id_estado: 5,
  },
  // Latte
  {
    id_producto_elaborado: 13,
    id_producto: 42,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 13,
    id_producto: 43,
    cantidad: 1,
    id_estado: 5,
  },
  // Macchiato
  {
    id_producto_elaborado: 14,
    id_producto: 41,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 14,
    id_producto: 42,
    cantidad: 1,
    id_estado: 5,
  },
  {
    id_producto_elaborado: 14,
    id_producto: 43,
    cantidad: 1,
    id_estado: 5,
  },
  // Burrito
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

export const inventario_productos = [
  {
    id_producto: 1,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 2,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 3,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 4,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 5,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 6,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 7,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 8,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 9,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 10,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 11,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 12,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 13,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 14,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 15,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 16,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 17,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 18,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 19,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 20,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 21,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 22,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 23,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 24,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 25,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 26,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 27,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 28,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 29,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 30,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 31,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 32,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 33,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 34,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 35,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 36,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 37,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 38,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 39,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
   {
    id_producto: 40,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 41,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 42,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
  {
    id_producto: 43,
    stock_min: 10,
    stock_max: 20,
    stock_actual: 15,
  },
];
