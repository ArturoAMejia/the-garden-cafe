import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import Cookie from "js-cookie";

import { CartContext, cartReducer } from ".";
import { IProductoCart } from "../../../interfaces/producto";
import axios from "axios";
import tgcApi from "../../../api/tgcApi";

export interface CartState {
  isLoaded: boolean;
  cart: IProductoCart[];
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // Efecto
  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (Cookie.get("firstName")) {
      const shippingAddress = {
        firstName: Cookie.get("firstName") || "",
        lastName: Cookie.get("lastName") || "",
        address: Cookie.get("address") || "",
        address2: Cookie.get("address2") || "",
        zip: Cookie.get("zip") || "",
        city: Cookie.get("city") || "",
        country: Cookie.get("country") || "",
        phone: Cookie.get("phone") || "",
      };

      // dispatch({
      //   type: "[Cart] - LoadAddress from Cookies",
      //   payload: shippingAddress,
      // });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current?.cantidad! + prev,
      0
    );
    const subtotal = state.cart.reduce(
      (prev, current) => current.precio * current?.cantidad! + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * (taxRate + 1),
    };

    dispatch({ type: "[Cart] - Update order summary", payload: orderSummary });
  }, [state.cart]);

  const addProductToCart = (product: IProductoCart) => {
    const productInCart = state.cart.some((p) => p.id === product.id);
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p.id === product.id && p.nombre === product.nombre
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    // Acumular
    const updatedProducts = state.cart.map((p) => {
      if (p.id !== product.id) return p;
      if (p.nombre !== product.nombre) return p;

      // Actualizar la cantidad
      p.cantidad!++;
      return p;
    });

    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updatedProducts,
    });
  };

const updateCartQuantity = (product: IProductoCart) => {
    dispatch({ type: "[Cart] - Change cart quantity", payload: product });
  };

  const removeCartProduct = (product: IProductoCart) => {
    dispatch({ type: "[Cart] - Remove product in cart", payload: product });
  };

  const orderComplete = () => {
    dispatch({ type: "[Cart] - Order complete" });
  };

  const cargarPedido = (productos: IProductoCart[]) => {
    dispatch({ type: "[Cart] - Cargar Pedido", payload: productos });
  };

  const actualizarPedido = async (
    id: number,
    id_cliente: number,
    id_trabajador: number,
    tipo_pedido: string,
    ubicacion_entrega: string,
    observacion: string,
    productos: IProductoCart[]
  ): Promise<{ hasError: boolean; message: string }> => {
    try {
      await tgcApi.put("api/pedido", {
        id,
        id_cliente,
        id_trabajador,
        tipo_pedido,
        ubicacion_entrega,
        observacion,
        productos,
      });
      return {
        hasError: false,
        message: "",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo actualizar el pedido - intente nuevamente.",
      };
    }
  };
  useEffect(() => {}, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProductToCart,
        removeCartProduct,
        updateCartQuantity,
        orderComplete,
        //updateAddress,
        //createOrder,
        cargarPedido,
        actualizarPedido,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
