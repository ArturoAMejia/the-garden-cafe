import { IProductoCart } from "@/interfaces/producto";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  productos: IProductoCart[];
  total_productos: number;
  subtotal: number;
  total: number;
  impuesto: number;
  descuento: number;
}

const initialState: CartState = {
  productos: [],
  total_productos: 0,
  descuento: 0,
  impuesto: 0,
  subtotal: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    añadirProducto: (state, action) => {
      const productos_en_pedido = state.productos.some(
        (p) => p.id === action.payload.id
      );
      if (!productos_en_pedido) {
        state.productos.push(action.payload);
      } else {
        const productoExistente = state.productos.find(
          (p) => p.id === action.payload.id
        );
        if (productoExistente) {
          productoExistente.cantidad!++;
        }
      }
      state.subtotal = state.productos.reduce(
        (acc, p) => acc + p.precio! * p.cantidad!,
        0
      );
      state.total =
        state.subtotal +
        state.subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE);
    },
    actualizarProductos: (state, action) => {
      state.productos = [...action.payload];
      state.subtotal = state.productos.reduce(
        (acc, p) => acc + p.precio! * p.cantidad!,
        0
      );
      state.total =
        state.subtotal +
        state.subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE);
    },
    actualizarCantidad: (state, action) => {
      state.productos = state.productos.map((producto) => {
        if (producto.id !== action.payload.id) return producto;

        return action.payload;
      });
      state.subtotal = state.productos.reduce(
        (acc, p) => acc + p.precio! * p.cantidad!,
        0
      );
      state.total =
        state.subtotal +
        state.subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE);
    },
    quitarProducto: (state, action) => {
      state.productos = state.productos.filter(
        (producto) =>
          !(
            producto.id === action.payload.id &&
            producto.nombre === action.payload.nombre
          )
      );
      state.subtotal = state.productos.reduce(
        (acc, p) => acc + p.precio! * p.cantidad!,
        0
      );
      state.total =
        state.subtotal +
        state.subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE);
    },
    pedidoCompleto: (state) => {
      state.productos = [];
      state.total_productos = 0;
      state.descuento = 0;
      state.impuesto = 0;
      state.subtotal = 0;
      state.total = 0;
    },
  },
});

export const {
  añadirProducto,
  actualizarProductos,
  actualizarCantidad,
  pedidoCompleto,
  quitarProducto,
} = cartSlice.actions;
