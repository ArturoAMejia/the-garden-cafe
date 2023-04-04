import { IProductoCart } from "@/interfaces/producto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PedidoState {
  productos: IProductoCart[];
  total_productos: number;
  subtotal: number;
  total: number;
  impuesto: number;
  descuento: number;
}

const initialState: PedidoState = {
  productos: [],
  total_productos: 0,
  descuento: 0,
  impuesto: 0,
  subtotal: 0,
  total: 0,
};

export const pedidoSlice = createSlice({
  name: "pedidoSlice",
  initialState,
  reducers: {
    añadirProductoPedido: (state, action: PayloadAction<IProductoCart>) => {
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
    actualizarProductos: (state, action: PayloadAction<IProductoCart[]>) => {
      state.productos = [...action.payload];
    },
    quitarProductoPedido: (state, action: PayloadAction<IProductoCart>) => {
      state.productos = state.productos.filter(
        (producto) =>
          !(
            producto.id === action.payload.id &&
            producto.nombre === action.payload.nombre
          )
      );
    },
    pedidoCompletado: (state) => {
      (state.productos = []),
        (state.total_productos = 0),
        (state.descuento = 0),
        (state.impuesto = 0),
        (state.subtotal = 0),
        (state.total = 0);
    },
  },
});


export const {
  añadirProductoPedido,
  actualizarProductos,
  quitarProductoPedido,
  pedidoCompletado,
} = pedidoSlice.actions;
