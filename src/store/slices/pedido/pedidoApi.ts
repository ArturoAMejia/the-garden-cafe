import { IInventarioABC, IPedido } from "@/interfaces";
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
    anularPedido: builder.mutation<number, any>({
      query: (id) => ({
        url: "/pedido",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Pedidos"],
    }),
    actualizarEstadoPedido: builder.mutation<IPedido, any>({
      query: (pedido) => ({
        url: "/pedido/estado",
        method: "PATCH",
        body: pedido,
      }),
      invalidatesTags: ["Pedidos"],
    }),
    obtenerPedidosCocineros: builder.query<any[], void>({
      query: () => "pedido/cocinero",
      providesTags: ["Pedidos"],
    }),
    asignarCocineroPedido: builder.mutation<any, any>({
      query: (pedido) => ({
        url: "/pedido/cocinero",
        method: "POST",
        body: pedido,
      }),
      invalidatesTags: ["Pedidos"],
    }),
    actualizarEstadoCocineroPedido: builder.mutation<any, any>({
      query: (pedido) => ({
        url: "/pedido/cocinero",
        method: "PATCH",
        body: pedido,
      }),
      invalidatesTags: ["Pedidos"],
    }),
    obtenerInventarioAbcVenta: builder.query<IInventarioABC[], void>({
      query: () => "/inventario/inventario-abc/venta",
      providesTags: ["Pedidos"],
    }),
  }),
});

export const {
  useObtenerPedidosQuery,
  useCrearPedidoMutation,
  useActualizarPedidoMutation,
  useAnularPedidoMutation,
  useActualizarEstadoPedidoMutation,
  // Cocinero
  useObtenerPedidosCocinerosQuery,
  useAsignarCocineroPedidoMutation,
  useActualizarEstadoCocineroPedidoMutation,
  // Inventario ABC
  useObtenerInventarioAbcVentaQuery,
} = pedidoApi;
