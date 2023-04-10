import { IProductoCart } from "@/interfaces/producto";
import { createSlice } from "@reduxjs/toolkit";

interface CompraState {
  productos: IProductoCart[];
  total_productos: number;
  subtotal: number;
  total: number;
  impuesto: number;
  descuento: number;
}
const initialState: CompraState = {
  productos: [],
  total_productos: 0,
  descuento: 0,
  impuesto: 0,
  subtotal: 0,
  total: 0,
};

export const compraSlice = createSlice({
  name: "compraSlice",
  initialState,
  reducers: {
    añadirProductoSolicitud: (state, action) => {
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
    },
    actualizarProductosSolicitud: (state, action) => {
      state.productos = [...action.payload];
    },
    actualizarCantidadProductoSolicitud: (state, action) => {
      state.productos = state.productos.map((producto) => {
        if (producto.id !== action.payload.id) return producto;

        return action.payload;
      });
    },
    quitarProductoSolicitud: (state, action) => {
      state.productos = state.productos.filter(
        (producto) =>
          !(
            producto.id === action.payload.id &&
            producto.nombre === action.payload.nombre
          )
      );
    },
    solicitudCompleta: (state) => {
      state.productos = [];
      state.total_productos = 0;
      state.descuento = 0;
      state.impuesto = 0;
      state.subtotal = 0;
      state.total = 0;
    },
    cargarSolicitud: (state, action) => {
      state.productos = action.payload.productos;
      state.total_productos = action.payload.total_productos;
      state.descuento = action.payload.descuento;
      state.impuesto = action.payload.impuesto;
      state.subtotal = action.payload.subtotal;
      state.total = action.payload.total;
    },
  },
});

export const {
  actualizarCantidadProductoSolicitud,
  actualizarProductosSolicitud,
  añadirProductoSolicitud,
  cargarSolicitud,
  quitarProductoSolicitud,
  solicitudCompleta,
} = compraSlice.actions;
