import {
  ICompra,
  IOrdenCompra,
  IProveedor,
  ISolicitudCompra,
} from "@/interfaces";
import { IProductoCart } from "@/interfaces/producto";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const compraApi = createApi({
  reducerPath: "compraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Proveedores", "Solicitudes", "Ordenes", "Compras"],
  endpoints: (builder) => ({
    obtenerProveedores: builder.query<IProveedor[], void>({
      query: () => "/compra/proveedor",
      providesTags: ["Proveedores"],
    }),
    crearProveedor: builder.mutation<IProveedor, any>({
      query: (proveedor) => ({
        url: "/compra/proveedor",
        method: "POST",
        body: proveedor,
      }),
      invalidatesTags: ["Proveedores"],
    }),
    actualizarProveeedor: builder.mutation<IProveedor, any>({
      query: (proveedor) => ({
        url: "/compra/proveedor",
        method: "PUT",
        body: proveedor,
      }),
      invalidatesTags: ["Proveedores"],
    }),
    desactivarProveedor: builder.mutation<number, any>({
      query: (id) => ({
        url: "/compra/proveedor",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Proveedores"],
    }),
    obtenerSolicitudesCompra: builder.query<ISolicitudCompra[], void>({
      query: () => "/compra/solicitud",
      providesTags: ["Solicitudes"],
    }),
    crearSolicitudCompra: builder.mutation<ISolicitudCompra, any>({
      query: (solicitud_compra) => ({
        url: "/compra/solicitud",
        method: "POST",
        body: solicitud_compra,
      }),
      invalidatesTags: ["Solicitudes"],
    }),
    actualuzarSolicitudCompra: builder.mutation<ISolicitudCompra, any>({
      query: (solicitud_compra) => ({
        url: "/compra/solicitud",
        method: "PUT",
        body: solicitud_compra,
      }),
      invalidatesTags: ["Solicitudes"],
    }),
    rechazarSolicitudCompra: builder.mutation<ISolicitudCompra, number>({
      query: (id) => ({
        url: "/compra/solicitud",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Solicitudes"],
    }),
    obtenerOrdenesCompra: builder.query<IOrdenCompra[], void>({
      query: () => "/compra/orden",
      providesTags: ["Ordenes"],
    }),
    crearOrdenCompra: builder.mutation<IOrdenCompra, any>({
      query: (orden_compra) => ({
        url: "/compra/orden",
        method: "POST",
        body: orden_compra,
      }),
      invalidatesTags: ["Solicitudes", "Ordenes"],
    }),
    anularOrdenCompra: builder.mutation<IOrdenCompra, any>({
      query: (id) => ({
        url: "/compra/orden",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Ordenes"],
    }),
    obtenerCompras: builder.query<ICompra[], void>({
      query: () => "/compra",
      providesTags: ["Compras"],
    }),
    crearCompra: builder.mutation<ICompra, any>({
      query: (compra) => ({
        url: "/compra",
        method: "POST",
        body: compra,
      }),
      invalidatesTags: ["Compras"],
    }),
    anularCompra: builder.mutation<ICompra, number>({
      query: (id) => ({
        url: "/compra",
        method: "PATCH",
        body: id,
      }),
    }),
  }),
});

export const {
  // Proveedor
  useObtenerProveedoresQuery,
  useCrearProveedorMutation,
  useActualizarProveeedorMutation,
  useDesactivarProveedorMutation,
  // Solicitud Compra
  useObtenerSolicitudesCompraQuery,
  useCrearSolicitudCompraMutation,
  useActualuzarSolicitudCompraMutation,
  useRechazarSolicitudCompraMutation,
  // Orden Compra
  useObtenerOrdenesCompraQuery,
  useCrearOrdenCompraMutation,
  useAnularOrdenCompraMutation,
  // Compra
  useObtenerComprasQuery,
  useCrearCompraMutation,
  useAnularCompraMutation
} = compraApi;
