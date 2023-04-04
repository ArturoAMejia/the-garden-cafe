import { IPedido } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pedidoApi = createApi({
  reducerPath: "pedidoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Pedidos"],
  endpoints: (builder) => ({
    obtenerPedidos: builder.query<IPedido[], void>({
      query: () => "pedido",
      providesTags: ["Pedidos"],
    }),
    crearPedido: builder.mutation<IPedido, any>({
      query: (pedido) => ({
        url: "/pedido",
        method: "POST",
        body: pedido,
      }),
      invalidatesTags: ["Pedidos"],
    }),
    actualizarPedido: builder.mutation<IPedido, any>({
      query: (pedido) => ({
        url: "/pedido",
        method: "PUT",
        body: pedido,
      }),
      invalidatesTags: ["Pedidos"],
    }),
    anularPedido: builder.mutation<IPedido, any>({
      query: (id) => ({
        url: "/pedido",
        method: "PATCH",
        body: id,
      }),
    }),
  }),
});
