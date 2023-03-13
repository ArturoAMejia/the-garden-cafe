import { useEffect, useReducer } from "react";
import { IMenu, IOrdenCompra } from "../../interfaces";
import { compraReducer } from "./compraReducer";
import tgcApi from "../../api/tgcApi";

export interface CompraState {
  productos: IMenu[];
  ordenesCompra: IOrdenCompra[];
  totalProductos: number;
  subtotal: number;
  total: number;
  tax: number;
}

const COMPRA_INITIAL_STATE: CompraState = {
  productos: [],
  ordenesCompra: [],
  totalProductos: 0,
  subtotal: 0,
  total: 0,
  tax: 0,
};

export const useCompra = () => {
  const [state, dispatch] = useReducer(compraReducer, COMPRA_INITIAL_STATE);

  const { ordenesCompra, productos, subtotal, tax, total, totalProductos } =
    state;

  const obtenerOrdenesCompra = async () => {
    const { data } = await tgcApi.get<IOrdenCompra[]>("api/compra/orden");
    dispatch({ type: "[Compra] - Obtener Ordenes de Compra", payload: data });
  };

  const añadirProductoOrden = (producto: IMenu) => {
    const productoEnOrden = productos.some((p) => p.id === producto.id);

    if (!productoEnOrden) {
      return dispatch({
        type: "[Compra] - Actualizar productos en Orden",
        payload: [...productos, producto],
      });
    }

    const actualizarProductos = productos.map((p) => {
      if (p.id !== producto.id) return p;
      if (p.nombre !== producto.nombre) return p;

      p.cantidad!++;
      return p;
    });

    dispatch({
      type: "[Compra] - Actualizar productos en Orden",
      payload: actualizarProductos,
    });
  };

  const actualizarCantidadProducto = (producto: IMenu) => {
    dispatch({
      type: "[Compra] - Actualizar cantidad de producto en Orden",
      payload: producto,
    });
  };

  const quitarProducto = (producto: IMenu) => {
    dispatch({
      type: "[Compra] - Quitar producto en Orden",
      payload: producto,
    });
  };

  useEffect(() => {
    obtenerOrdenesCompra();
  }, []);

  return {
    ordenesCompra,
    productos,
    subtotal,
    tax,
    total,
    totalProductos,
    añadirProductoOrden,
    actualizarCantidadProducto,
    quitarProducto,
  };
};
