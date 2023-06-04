import {
  IAperturaCaja,
  IArqueoCaja,
  ICaja,
  ICierreCaja,
  IMovimientoCaja,
} from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cajaApi = createApi({
  reducerPath: "cajaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Caja", "Apertura", "Cierre", "Movimiento", "Arqueo"],
  endpoints: (builder) => ({
    obtenerCajas: builder.query<ICaja[], void>({
      query: () => "/caja",
      providesTags: ["Caja"],
    }),
    crearCaja: builder.mutation<ICaja, any>({
      query: (caja) => ({
        url: "/caja",
        method: "POST",
        body: caja,
      }),
      invalidatesTags: ["Caja"],
    }),
    actualizarCaja: builder.mutation<ICaja, any>({
      query: (caja) => ({
        url: "/caja/apertura",
        method: "PUT",
        body: caja,
      }),
      invalidatesTags: ["Caja"],
    }),
    desactivarCaja: builder.mutation<number, any>({
      query: (id) => ({
        url: "/caja/apertura",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Caja"],
    }),
    obtenerAperturaCaja: builder.query<IAperturaCaja[], void>({
      query: () => "/caja/apertura",
      providesTags: ["Apertura"],
    }),
    crearAperturaCaja: builder.mutation<IAperturaCaja, any>({
      query: (moneda) => ({
        url: "/caja/apertura",
        method: "POST",
        body: moneda,
      }),
      invalidatesTags: ["Apertura", "Caja"],
    }),
    obtenerMovimientoCaja: builder.query<IMovimientoCaja[], void>({
      query: () => "/caja/movimiento",
      providesTags: ["Movimiento"],
    }),
    obtenerCierresCaja: builder.query<ICierreCaja[], void>({
      query: () => "/caja/cierre",
      providesTags: ["Cierre"],
    }),
    crearCierreCaja: builder.mutation<ICierreCaja, any>({
      query: (cierre) => ({
        url: "/caja/cierre",
        method: "POST",
        body: cierre,
      }),
      invalidatesTags: ["Cierre", "Caja"],
    }),
    obtenerArqueoCaja: builder.query<IArqueoCaja[], void>({
      query: () => "/caja/arqueo",
      providesTags: ["Arqueo"],
    }),
    crearArqueoCaja: builder.mutation<IArqueoCaja, any>({
      query: (arqueo) => ({
        url: "/caja/arqueo",
        method: "POST",
        body: arqueo,
      }),
      invalidatesTags: ["Arqueo", "Caja"],
    }),
  }),
});

export const {
  // Caja
  useObtenerCajasQuery,
  useCrearCajaMutation,
  useActualizarCajaMutation,
  useDesactivarCajaMutation,
  // Apertura Caja
  useObtenerAperturaCajaQuery,
  useCrearAperturaCajaMutation,
  // Cierre Caja
  useObtenerCierresCajaQuery,
  useCrearCierreCajaMutation,
  // Arqueo Caja
  useObtenerArqueoCajaQuery,
  useCrearArqueoCajaMutation,

  // Movimiento de caja
  useObtenerMovimientoCajaQuery,
} = cajaApi;
