import { ITrabajador } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const negocioApi = createApi({
  reducerPath: "negocioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Trabajadores"],

  endpoints: (builder) => ({
    obtenerTrabajadores: builder.query<ITrabajador[], void>({
      query: () => "/user/trabajadores",
      providesTags: ["Trabajadores"],
    }),
    crearTrabajador: builder.mutation<ITrabajador, any>({
      query: (trabajador) => ({
        url: "/user/trabajadores",
        method: "POST",
        body: trabajador,
      }),
      invalidatesTags: ["Trabajadores"],
    }),
    actualizarTrabajador: builder.mutation<ITrabajador, any>({
      query: (trabajador) => ({
        url: "/user/trabajadores",
        method: "PUT",
        body: trabajador,
      }),
      invalidatesTags: ["Trabajadores"],
    }),
    desactivarTrabajador: builder.mutation<number, any>({
      query: (id) => ({
        url: "/user/trabajadores",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Trabajadores"],
    }),
  }),
});

export const {
  useObtenerTrabajadoresQuery,
  useCrearTrabajadorMutation,
  useActualizarTrabajadorMutation,
  useDesactivarTrabajadorMutation,
} = negocioApi;
