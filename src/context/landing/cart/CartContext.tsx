import { createContext } from "react";
import { IProducto, IProductoCart } from "../../../interfaces/producto";

interface ContextProps {
  isLoaded: boolean;
  cart: IProductoCart[];
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;

  // Methods
  addProductToCart: (product: IProductoCart) => void;
  updateCartQuantity: (product: IProductoCart) => void;
  removeCartProduct: (product: IProductoCart) => void;
  orderComplete: () => void;
  // updateAddress: (address: ShippingAddress) => void;
  // createOrder: () => Promise<{
  //     hasError: boolean;
  //     message: string;
  // }>
  cargarPedido: (productos: IProductoCart[]) => void;
  actualizarPedido: (
    id: number,
    id_cliente: number,
    id_trabajador: number,
    tipo_pedido: string,
    ubicacion_entrega: string,
    observacion: string,
    productos: IProductoCart[]
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
}

export const CartContext = createContext({} as ContextProps);
