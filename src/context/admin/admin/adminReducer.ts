import { AdminState } from "./AdminProvider";
import { AdminReducerType } from "./adminTypes";

type AdminActionType = AdminReducerType;

export const adminReducer = (
  state: AdminState,
  action: AdminActionType
): AdminState => {
  switch (action.type) {
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
    case "[Compra] - Obtener Tipos de Orden de Compra":
      return {
        ...state,
        tipos_orden_compra: [...action.payload],
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

    case "[Compra] - Actualiza resumen de la Orden de Compra":
      return {
        ...state,
        ...action.payload,
      };

    case "[Compra] - Solicitud Completada":
      return {
        ...state,
        productos: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        totalProductos: 0,
      };
    case "[Compra] - Cargar Orden compra":
      return {
        ...state,
        productos: action.payload,
      };
    case "[Ventas] - Obtener Monedas":
      return {
        ...state,
        monedas: [...action.payload],
      };
    case "[Ventas] - Crear Monedas":
      return {
        ...state,
        monedas: [...state.monedas, action.payload],
      };
    case "[Ventas] - Actualizar Moneda":
      return {
        ...state,
        monedas: [...state.monedas, action.payload],
      };
    case "[Ventas] - Desactivar Moneda":
      return {
        ...state,
        monedas: [...state.monedas, action.payload],
      };
    case "[Ventas] - Obtener Formas Pago":
      return {
        ...state,
        formas_pago: [...action.payload],
      };
    case "[Ventas] - Crear Formas Pago":
      return {
        ...state,
        formas_pago: [...state.formas_pago, action.payload],
      };
    case "[Ventas] - Actualizar Formas Pago":
      return {
        ...state,
        formas_pago: [...state.formas_pago, action.payload],
      };
    case "[Ventas] - Desactivar Formas Pago":
      return {
        ...state,
        formas_pago: [...state.formas_pago, action.payload],
      };
    case "[Ventas] - Obtener Pedidos":
      return {
        ...state,
        pedidos: [...action.payload],
      };
    case "[Seguridad] - Obtener Trabajadores":
      return {
        ...state,
        trabajadores: [...action.payload],
      };
    case "[Seguridad] - Obtener Estados Civil":
      return {
        ...state,
        estado_civil: [...action.payload],
      };
    case "[Seguridad] - Obtener Grupos":
      return {
        ...state,
        grupos_usuarios: [...action.payload],
      };

    default:
      return state;
  }
};
