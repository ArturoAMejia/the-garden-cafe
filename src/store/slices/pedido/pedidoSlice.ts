import { IProductoCart } from "@/interfaces/producto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PedidoState {
  productos: IProductoCart[];
  total_productos: number;
  subtotal: number;
  total: number;
  descuento: number;
  pago_cliente: number;
  cambio: number;
}

const initialState: PedidoState = {
  productos: [],
  total_productos: 0,
  descuento: 0,
  subtotal: 0,
  total: 0,
  pago_cliente: 0,
  cambio: 0,
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

      state.subtotal = state.productos.reduce(
        (acc, p) => acc + p.precio! * p.cantidad!,
        0
      );
      state.total =
        state.subtotal +
        state.subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE);
    },
    actualizarProductos: (state, action: PayloadAction<IProductoCart[]>) => {
      state.productos = [...action.payload];
      state.subtotal = state.productos.reduce(
        (acc, p) => acc + p.precio! * p.cantidad!,
        0
      );
      state.total =
        state.subtotal +
        state.subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE);
    },
    actualizarCantidadProducto: (
      state,
      action: PayloadAction<IProductoCart>
    ) => {
      state.productos = state.productos.map((producto) => {
        if (producto.id !== action.payload.id) return producto;
        producto.cantidad = action.payload.cantidad;
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
    quitarProductoPedido: (state, action: PayloadAction<IProductoCart>) => {
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
    cobrarPedido: (state, action: PayloadAction<{ pago_cliente: number }>) => {
      state.pago_cliente = action.payload.pago_cliente;
      state.cambio = state.pago_cliente - state.total;
    },
    asignarDescuento: (state, action: PayloadAction<{ descuento: number }>) => {
      state.descuento = state.subtotal * (action.payload.descuento / 100);
      state.total -= state.descuento;
    },
    pedidoCompletado: (state) => {
      (state.productos = []),
        (state.total_productos = 0),
        (state.descuento = 0),
        (state.subtotal = 0),
        (state.total = 0);
      state.pago_cliente = 0;
      state.cambio = 0;
    },
    cargarPedido: (state, action: PayloadAction<IProductoCart[]>) => {
      state.productos = action.payload;
      state.subtotal = state.productos.reduce(
        (acc, p) => acc + p.precio! * p.cantidad!,
        0
      );
      state.total =
        state.subtotal +
        state.subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE);
      state.pago_cliente = state.total;
    },
  },
});

export const {
  añadirProductoPedido,
  actualizarProductos,
  quitarProductoPedido,
  pedidoCompletado,
  actualizarCantidadProducto,
  cargarPedido,
  cobrarPedido,
  asignarDescuento,
} = pedidoSlice.actions;
