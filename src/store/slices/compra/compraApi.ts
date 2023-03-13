import {
  ICompra,
  IOrdenCompra,
  IProveedor,
  ISolicitudCompra,
} from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const compraApi = createApi({
  reducerPath: "compraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/compra",
  }),
  endpoints: (builder) => ({
    obtenerProveedores: builder.query<IProveedor, void>({
      query: () => "/proveedor",
    }),
    obtenerSolicitudesCompra: builder.query<ISolicitudCompra, void>({
      query: () => "/solicitud",
    }),
    obtenerOrdenesCompra: builder.query<IOrdenCompra, void>({
      query: () => "/orden",
    }),
    obtenerCompras: builder.query<ICompra, void>({
      query: () => "/",
    }),
  }),
});

export const {
  useObtenerProveedoresQuery,
  useObtenerSolicitudesCompraQuery,
  useObtenerOrdenesCompraQuery,
  useObtenerComprasQuery,
} = compraApi;
