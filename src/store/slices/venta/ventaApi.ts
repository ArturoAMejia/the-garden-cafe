import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICliente, IReservacion, IVenta } from "@/interfaces";

export const ventaApi = createApi({
  reducerPath: "ventaApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Clientes", "Venta", "Reservaciones"],
  endpoints: (builder) => ({
    obtenerClientes: builder.query<ICliente[], void>({
      query: () => "/venta/cliente",
      providesTags: ["Clientes"],
    }),
    crearCliente: builder.mutation<ICliente, any>({
      query: (cliente) => ({
        url: "/venta/cliente",
        method: "POST",
        body: cliente,
      }),
      invalidatesTags: ["Clientes"],
    }),
    actualizarCliente: builder.mutation({
      query: (cliente) => ({
        url: "/venta/cliente",
        method: "PUT",
        body: cliente,
      }),
      invalidatesTags: ["Clientes"],
    }),
    desactivarCliente: builder.mutation({
      query: (id) => ({
        url: "/venta/cliente",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Clientes"],
    }),
    obtenerVentas: builder.query<IVenta[], void>({
      query: () => "/venta",
      providesTags: ["Venta"],
    }),
    crearVenta: builder.mutation<IVenta, any>({
      query: (venta) => ({
        url: "/venta",
        method: "POST",
        body: venta,
      }),
      invalidatesTags: ["Venta"],
    }),
    actualizarVenta: builder.mutation<IVenta, any>({
      query: (venta) => ({
        url: "/",
        method: "PUT",
        body: venta,
      }),
      invalidatesTags: ["Venta"],
    }),
    anularVenta: builder.mutation<IVenta, any>({
      query: (id) => ({
        url: "/venta",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Venta"],
    }),
    obtenerVentaPorId: builder.query<IVenta, number>({
      query: (id) => ({
        url: "/",
        method: "GET",
        body: id,
      }),
    }),
    obtenerReservaciones: builder.query<IReservacion[], void>({
      query: () => "/venta/reservacion",
      providesTags: ["Reservaciones"],
    }),
    crearReservacion: builder.mutation<IReservacion, any>({
      query: (reservacion) => ({
        url: "/venta/reservacion",
        method: "POST",
        body: reservacion,
      }),
      invalidatesTags: ["Reservaciones"],
    }),
    actualizarReservacion: builder.mutation<IReservacion, any>({
      query: (reservacion) => ({
        url: "/venta/reservacion",
        method: "PUT",
        body: reservacion,
      }),
      invalidatesTags: ["Reservaciones"],
    }),
    anularReservacion: builder.mutation<IReservacion, any>({
      query: (id) => ({
        url: "/venta/reservacion",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Reservaciones"],
    }),
  }),
});

export const {
  // Clientes
  useObtenerClientesQuery,
  useCrearClienteMutation,
  useActualizarClienteMutation,
  useDesactivarClienteMutation,
  // Ventas
  useObtenerVentasQuery,
  useObtenerVentaPorIdQuery,
  useCrearVentaMutation,
  useActualizarVentaMutation,
  useAnularVentaMutation,
  // Reservacion
  useObtenerReservacionesQuery,
  useCrearReservacionMutation,
  useActualizarReservacionMutation,
  useAnularReservacionMutation,
} = ventaApi;
