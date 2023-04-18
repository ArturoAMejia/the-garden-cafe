import { ICatFormaPago, IMoneda } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const catalogosApi = createApi({
  reducerPath: "catalogosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Monedas", "Forma Pago"],
  endpoints: (builder) => ({
    obtenerMonedas: builder.query<IMoneda[], any>({
      query: () => "/catalogos/monedas",
      providesTags: ["Monedas"],
    }),
    crearMoneda: builder.mutation<IMoneda, any>({
      query: (moneda) => ({
        url: "/catalogos/monedas",
        method: "POST",
        body: moneda,
      }),
      invalidatesTags: ["Monedas"],
    }),
    actualizarMoneda: builder.mutation<IMoneda, any>({
      query: (moneda) => ({
        url: "/catalogos/monedas",
        method: "PUT",
        body: moneda,
      }),
      invalidatesTags: ["Monedas"],
    }),
    desactivarMoneda: builder.mutation<number, any>({
      query: (id) => ({
        url: "/catalogos/monedas",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Monedas"],
    }),
    obtenerFormasPago: builder.query<ICatFormaPago[], any>({
      query: () => "/catalogos/forma-pago",
      providesTags: ["Forma Pago"],
    }),
    crearFormaPago: builder.mutation<ICatFormaPago, any>({
      query: (forma_pago) => ({
        url: "/catalogos/forma-pago",
        method: "POST",
        body: forma_pago,
      }),
      invalidatesTags: ["Forma Pago"],
    }),
    actualizarFormaPago: builder.mutation<ICatFormaPago, any>({
      query: (forma_pago) => ({
        url: "/catalogos/forma-pago",
        method: "PUT",
        body: forma_pago,
      }),
      invalidatesTags: ["Forma Pago"],
    }),
    desactivarFormaPago: builder.mutation<number, any>({
      query: (id) => ({
        url: "/catalogos/forma-pago",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Forma Pago"],
    }),
  }),
});

export const {
  // Monedas
  useObtenerMonedasQuery,
  useCrearMonedaMutation,
  useActualizarMonedaMutation,
  useDesactivarMonedaMutation,
  // Formas de Pago
  useObtenerFormasPagoQuery,
  useCrearFormaPagoMutation,
  useActualizarFormaPagoMutation,
  useDesactivarFormaPagoMutation,
} = catalogosApi;
