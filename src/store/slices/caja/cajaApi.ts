import { IAperturaCaja, ICaja, ICatFormaPago, IMoneda } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const catalogosApi = createApi({
  reducerPath: "catalogosApi",
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
        url: "/caja/apertura",
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
      invalidatesTags: ["Apertura"],
    }),
    // obtenerFormasPago: builder.query<ICatFormaPago[], any>({
    //   query: () => "/catalogos/forma-pago",
    //   providesTags: ["Forma Pago"],
    // }),
    // crearFormaPago: builder.mutation<ICatFormaPago, any>({
    //   query: (forma_pago) => ({
    //     url: "/catalogos/forma-pago",
    //     method: "POST",
    //     body: forma_pago,
    //   }),
    //   invalidatesTags: ["Forma Pago"],
    // }),
    // actualizarFormaPago: builder.mutation<ICatFormaPago, any>({
    //   query: (forma_pago) => ({
    //     url: "/catalogos/forma-pago",
    //     method: "PUT",
    //     body: forma_pago,
    //   }),
    //   invalidatesTags: ["Forma Pago"],
    // }),
    // desactivarFormaPago: builder.mutation<number, any>({
    //   query: (id) => ({
    //     url: "/catalogos/forma-pago",
    //     method: "PATCH",
    //     body: id,
    //   }),
    //   invalidatesTags: ["Forma Pago"],
    // }),
  }),
});

export const {
  // Caja
  useObtenerCajasQuery,
  useCrearCajaMutation,
  useActualizarCajaMutation,
  useDesactivarCajaMutation,
  
  useObtenerAperturaCajaQuery,
  useCrearAperturaCajaMutation,
  // Formas de Pago
  // useObtenerFormasPagoQuery,
  // useCrearFormaPagoMutation,
  // useActualizarFormaPagoMutation,
  // useDesactivarFormaPagoMutation,
} = catalogosApi;
