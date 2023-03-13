import { IProductoCart } from "../../../interfaces/producto";

import { CartState } from ".";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: IProductoCart[];
    }
  | { type: "[Cart] - Update products in cart"; payload: IProductoCart[] }
  | { type: "[Cart] - Change cart quantity"; payload: IProductoCart }
  | { type: "[Cart] - Remove product in cart"; payload: IProductoCart }
  | {
      type: "[Cart] - Update order summary";
      payload: {
        numberOfItems: number;
        subtotal: number;
        tax: number;
        total: number;
      };
    }
  | { type: "[Cart] - Order complete" }
  | {
      type: "[Cart] - Cargar Pedido";
      payload: IProductoCart[];
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "[Cart] - Update products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Change cart quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id !== action.payload.id) return product;
          if (product.cantidad !== action.payload.cantidad) return product;
          return action.payload;
        }),
      };

    case "[Cart] - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product.id === action.payload.id &&
              product.nombre === action.payload.nombre
            )
        ),
      };

    case "[Cart] - Update order summary":
      return {
        ...state,
        ...action.payload,
      };

    // case '[Cart] - Update Address':
    // case '[Cart] - LoadAddress from Cookies':
    //    return {
    //       ...state,
    //       shippingAddress: action.payload
    //    }
    case "[Cart] - Order complete":
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subtotal: 0,
        tax: 0,
        total: 0,
      };
    case "[Cart] - Cargar Pedido":
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};
