import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import tgcApi from "../../../api/tgcApi";
import { AdminContext } from "./AdminContext";
import { adminReducer } from "./adminReducer";
import axios from "axios";
import {
  ICatFormaPago,
  IEstadoCivil,
  IGrupoUsuario,
  IInventario,
  IMoneda,
  IPedido,
  IProducto,
  ITipoOrdenCompra,
  ITrabajador,
} from "../../../interfaces";
import { IProductoCart } from "../../../interfaces/producto";

export interface AdminState {
  productos: IProductoCart[];
  inventarios: IInventario[];
  monedas: IMoneda[] | [];
  formas_pago: ICatFormaPago[] | [];
  pedidos: IPedido[];
  tipos_orden_compra: ITipoOrdenCompra[];
  productos_inventario: IProducto[];
  trabajadores: ITrabajador[];
  estado_civil: IEstadoCivil[];
  grupos_usuarios: IGrupoUsuario[];
  totalProductos: number;
  subtotal: number;
  total: number;
  tax: number;
}

const ADMIN_INITIAL_STATE: AdminState = {
  productos: [],
  inventarios: [],
  monedas: [],
  pedidos: [],
  formas_pago: [],
  tipos_orden_compra: [],
  productos_inventario: [],
  trabajadores: [],
  estado_civil: [],
  grupos_usuarios: [],
  totalProductos: 0,
  subtotal: 0,
  total: 0,
  tax: 0,
};

export const AdminProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, ADMIN_INITIAL_STATE);

  const obtenerInventarios = async () => {
    const { data } = await tgcApi.get<IInventario[]>("api/inventario");
    dispatch({ type: "[Inventario] - Obtener Inventario", payload: data });
  };

  const crearInventario = async (
    id_producto: number,
    stock_min: number,
    stock_max: number,
    stock_actual: number
  ): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    try {
      await tgcApi.post("api/inventario", {
        id_producto,
        stock_min,
        stock_max,
        stock_actual,
      });

      return {
        hasError: false,
        message: "",
      };
      obtenerInventarios();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el inventario",
      };
    }
  };

  const obtenerTiposOrdenCompra = async () => {
    const { data } = await tgcApi.get<ITipoOrdenCompra[]>(
      "api/catalogos/tipo-orden-compra"
    );
    dispatch({
      type: "[Compra] - Obtener Tipos de Orden de Compra",
      payload: data,
    });
  };

  const añadirProductoOrden = (producto: IProductoCart) => {
    const productoEnOrden = state.productos.some((p) => p.id === producto.id);

    if (!productoEnOrden) {
      return dispatch({
        type: "[Compra] - Actualizar productos en Orden",
        payload: [...state.productos, producto],
      });
    }

    const actualizarProductos = state.productos.map((p) => {
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

  const actualizarCantidadProducto = (producto: IProductoCart) => {
    dispatch({
      type: "[Compra] - Actualizar cantidad de producto en Orden",
      payload: producto,
    });
  };

  const quitarProducto = (producto: IProductoCart) => {
    dispatch({
      type: "[Compra] - Quitar producto en Orden",
      payload: producto,
    });
  };

  const solicitudCompleta = () => {
    dispatch({ type: "[Compra] - Solicitud Completada" });
  };

  const crearPedido = async (
    pedido: IPedido
  ): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    try {
      await tgcApi.post("api/pedido", pedido);

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
        message: "No se pudo realizar el pedido - intente de nuevo.",
      };
    }
  };

  const anularPedido = async (id: number) => {
    await tgcApi.patch("api/pedido", { id });
  };

  const obtenerMonedas = async () => {
    const { data } = await tgcApi.get<IMoneda[]>("api/catalogos/moneda");
    dispatch({ type: "[Ventas] - Obtener Monedas", payload: data });
  };

  const crearMoneda = async (
    moneda: IMoneda
  ): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    try {
      const { data } = await tgcApi.post<IMoneda>(
        "api/catalogos/moneda",
        moneda
      );

      dispatch({ type: "[Ventas] - Crear Monedas", payload: data });

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
        message: "No se pudo crear la moneda - intente nuevamente.",
      };
    }
  };

  const actualizarMoneda = async (
    moneda: IMoneda
  ): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    try {
      const { data } = await tgcApi.put<IMoneda>(
        "api/catalogos/moneda",
        moneda
      );

      dispatch({ type: "[Ventas] - Actualizar Moneda", payload: data });

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
        message: "No se pudo actualizar la moneda - intente nuevamente.",
      };
    }
  };

  const desactivarMoneda = async (id: number) => {
    const { data } = await tgcApi.patch("api/catalogos/monedas", { id });
    dispatch({ type: "[Ventas] - Desactivar Moneda", payload: data });
  };

  const obtenerFormasPago = async () => {
    const { data } = await tgcApi.get<ICatFormaPago[]>(
      "api/catalogos/forma-pago"
    );
    dispatch({ type: "[Ventas] - Obtener Formas Pago", payload: data });
  };

  const crearFormaPago = async (
    forma_pago: ICatFormaPago
  ): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    try {
      const { data } = await tgcApi.post<ICatFormaPago>(
        "api/catalogos/moneda",
        forma_pago
      );

      dispatch({ type: "[Ventas] - Crear Formas Pago", payload: data });

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
        message: "No se pudo crear la forma de pago - intente nuevamente.",
      };
    }
  };

  const actualizarFormaPago = async (
    forma_pago: ICatFormaPago
  ): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    try {
      const { data } = await tgcApi.put<ICatFormaPago>(
        "api/catalogos/moneda",
        forma_pago
      );

      dispatch({ type: "[Ventas] - Crear Formas Pago", payload: data });

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
        message: "No se pudo actualizar la forma de pago - intente nuevamente.",
      };
    }
  };

  const desactivarFormaPago = async (id: number) => {
    const { data } = await tgcApi.patch("api/catalogos/forma-pago", { id });
    dispatch({ type: "[Ventas] - Desactivar Formas Pago", payload: data });
  };

  const obtenerPedidos = async () => {
    const { data } = await tgcApi.get<IPedido[]>("api/pedido");
    dispatch({ type: "[Ventas] - Obtener Pedidos", payload: data });
  };

  const realizarVenta = async (
    id_trabajador: number,
    id_cliente: number,
    id_pedido: number,
    id_cat_forma_pago: number,
    id_moneda: number,
    subtotal: number,
    descuento: number,
    tipo_venta: string,
    descripcion: string,
    productos: []
  ): Promise<{ hasError: boolean; message: string }> => {
    try {
      await tgcApi.post("api/venta", {
        id_trabajador,
        id_cliente,
        id_pedido,
        id_cat_forma_pago,
        id_moneda,
        subtotal,
        descuento,
        tipo_venta,
        descripcion,
        productos,
      });
      await tgcApi.patch("api/pedido", { id: id_pedido });
      obtenerPedidos();
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
        message: "No se pudo realizar la venta - intente nuevamente.",
      };
    }
  };

  const anularVenta = async (id: number) => {
    await tgcApi.patch("api/venta", { id });
    // TODO Obtener Ventas
  };

  const obtenerTrabajadores = async () => {
    const { data } = await tgcApi.get<ITrabajador[]>("api/user/trabajadores");
    dispatch({ type: "[Seguridad] - Obtener Trabajadores", payload: data });
  };

  const registrarTrabajador = async (
    cedula_ruc: string,
    nombre: string,
    apellido_razon_social: string,
    fecha_nacimiento_constitucion: Date,
    telefono: number,
    direccion_domicilio: string,
    correo: string,
    id_cargo: string,
    codigo_inss: string,
    genero: string,
    id_estado_civil: string
  ): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    try {
      await tgcApi.post("api/user/trabajadores", {
        cedula_ruc,
        nombre,
        apellido_razon_social,
        fecha_nacimiento_constitucion,
        telefono,
        direccion_domicilio,
        correo,
        id_cargo,
        codigo_inss,
        genero,
        id_estado_civil,
      });
      obtenerTrabajadores();
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
        message: "No se pudo registrar al trabajador - Intente nuevamente",
      };
    }
  };

  const actualizarTrabajador = async (
    id: number,
    cedula_ruc: string,
    nombre: string,
    apellido_razon_social: string,
    fecha_nacimiento_constitucion: Date,
    telefono: number,
    direccion_domicilio: string,
    correo: string,
    id_cargo: string,
    codigo_inss: string,
    genero: string,
    id_estado_civil: string
  ): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    try {
      await tgcApi.put("api/user/trabajadores", {
        id,
        cedula_ruc,
        nombre,
        apellido_razon_social,
        fecha_nacimiento_constitucion,
        telefono,
        direccion_domicilio,
        correo,
        id_cargo,
        codigo_inss,
        genero,
        id_estado_civil,
      });
      obtenerTrabajadores();
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
        message: "No se pudo actualizar al trabajador - Intente nuevamente",
      };
    }
  };

  const desactivarTrabajador = async (id: number) => {
    await tgcApi.patch("api/user/trabajadores", { id });
    obtenerTrabajadores();
  };
  const obtenerEstadoCivil = async () => {
    const { data } = await tgcApi.get<IEstadoCivil[]>(
      "api/catalogos/estado-civil"
    );
    dispatch({ type: "[Seguridad] - Obtener Estados Civil", payload: data });
  };
  const obtenerGrupoUsuario = async () => {
    const { data } = await tgcApi.get<IGrupoUsuario[]>(
      "api/catalogos/grupo-usuario"
    );
    dispatch({ type: "[Seguridad] - Obtener Grupos", payload: data });
  };

  const crearGrupo = async (
    nombre: string,
    descripcion: string
  ): Promise<{ hasError: boolean; message: string }> => {
    try {
      await tgcApi.post("api/catalogos/grupo-usuario", {
        nombre,
        descripcion,
      });
      obtenerGrupoUsuario();
      return {
        hasError: false,
        message: "",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el grupo - intente de nuevo",
      };
    }
  };

  const actualizarGrupo = async (
    id: number,
    nombre: string,
    descripcion: string
  ): Promise<{ hasError: boolean; message: string }> => {
    try {
      await tgcApi.put("api/catalogos/grupo-usuario", {
        id,
        nombre,
        descripcion,
      });
      obtenerGrupoUsuario();
      return {
        hasError: false,
        message: "",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo actualizar el grupo - intente de nuevo",
      };
    }
  };

  const desactivarGrupo = async (id: number) => {
    await tgcApi.patch("api/catalogos/grupo-usuario", { id });
    obtenerGrupoUsuario();
  };

  const cargarPedido = (productos: IProductoCart[]) => {
    dispatch({ type: "[Compra] - Cargar Orden compra", payload: productos });
  };

  useEffect(() => {
    obtenerEstadoCivil();
  }, []);

  useEffect(() => {
    obtenerGrupoUsuario();
  }, []);

  useEffect(() => {
    obtenerTrabajadores();
  }, []);

  useEffect(() => {
    obtenerMonedas();
  }, []);

  useEffect(() => {
    obtenerFormasPago();
  }, []);

  useEffect(() => {
    obtenerPedidos();
  }, []);

  useEffect(() => {
    obtenerTiposOrdenCompra();
  }, []);

  useEffect(() => {
    const subtotal = state.productos.reduce(
      (prev, current) => current.precio * current?.cantidad! + prev,
      0
    );
    const tasaImpuesto = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const resumen = {
      subtotal,
      tax: subtotal * tasaImpuesto,
      total: subtotal * (tasaImpuesto + 1),
    };
    dispatch({
      type: "[Compra] - Actualiza resumen de la Orden de Compra",
      payload: resumen,
    });
  }, [state.productos]);

  return (
    <AdminContext.Provider
      value={{
        ...state,
        obtenerInventarios,
        crearInventario,
        añadirProductoOrden,
        actualizarCantidadProducto,
        quitarProducto,
        solicitudCompleta,
        crearPedido,
        anularPedido,
        crearMoneda,
        actualizarMoneda,
        desactivarMoneda,
        crearFormaPago,
        actualizarFormaPago,
        desactivarFormaPago,
        cargarPedido,
        registrarTrabajador,
        actualizarTrabajador,
        desactivarTrabajador,
        crearGrupo,
        actualizarGrupo,
        desactivarGrupo,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
