import { CompraState } from ".";
import { IMenu, IOrdenCompra } from "../../interfaces";

type CompraActionType =
  | { type: "[Compra] - Crear Orden Compra"; payload: IOrdenCompra }
  | { type: "[Compra] - Obtener Ordenes de Compra"; payload: IOrdenCompra[] }
  | { type: "[Compra] - Actualizar productos en Orden"; payload: IMenu[] }
  | { type: "[Compra] - Quitar producto en Orden"; payload: IMenu }
  | {
      type: "[Compra] - Actualizar cantidad de producto en Orden";
      payload: IMenu;
    };

export const compraReducer = (
  state: CompraState,
  action: CompraActionType
): CompraState => {
  switch (action.type) {
    case "[Compra] - Obtener Ordenes de Compra":
      return {
        ...state,
        ordenesCompra: action.payload,
      };
    case "[Compra] - Actualizar productos en Orden":
      return {
        ...state,
        productos: [...action.payload],
      };
    case "[Compra] - Actualizar cantidad de producto en Orden":
      return {
        ...state,
        productos: state.productos.map((producto) => {
          if (producto.id !== action.payload.id) return producto;
          if (producto.cantidad !== action.payload.cantidad) return producto;
          return action.payload;
        }),
      };
    case "[Compra] - Quitar producto en Orden":
      return {
        ...state,
        productos: state.productos.filter(
          (producto) =>
            !(
              producto.id === action.payload.id &&
              producto.nombre === action.payload.nombre
            )
        ),
      };
    default:
      return state;
  }
};
