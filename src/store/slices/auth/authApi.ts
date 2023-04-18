import { IUsuario } from "@/interfaces";
import { IRol } from "@/interfaces/seguridad/rol-modulo";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Roles", "Usuarios"],
  endpoints: (builder) => ({
    obtenerRoles: builder.query<IRol[], void>({
      query: () => "/catalogos/rol",
      providesTags: ["Roles"],
    }),
    crearRol: builder.mutation<IRol, any>({
      query: (rol) => ({
        url: "/catalogos/rol",
        method: "POST",
        body: rol,
      }),
      invalidatesTags: ["Roles"],
    }),
    actualizarRol: builder.mutation<IRol, any>({
      query: (rol) => ({
        url: "/catalogos/rol",
        method: "PUT",
        body: rol,
      }),
      invalidatesTags: ["Roles"],
    }),
    desactivarRol: builder.mutation<number, any>({
      query: (id) => ({
        url: "/catalogos/rol",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Roles"],
    }),
    obtenerUsuarios: builder.query<IUsuario[], void>({
      query: () => "/catalogos/usuario",
      providesTags: ["Usuarios"],
    }),
    crearUsuario: builder.mutation<IUsuario, any>({
      query: (usuario) => ({
        url: "/catalogos/usuario",
        method: "POST",
        body: usuario,
      }),
      invalidatesTags: ["Usuarios"],
    }),
    actualizarUsuario: builder.mutation<IUsuario, any>({
      query: (usuario) => ({
        url: "/catalogos/usuario",
        method: "PUT",
        body: usuario,
      }),
      invalidatesTags: ["Usuarios"],
    }),
    desactivarUsuario: builder.mutation<number, any>({
      query: (id) => ({
        url: "/catalogos/usuario",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Usuarios"],
    }),
  }),
});

export const {
  // Roles
  useObtenerRolesQuery,
  useCrearRolMutation,
  useActualizarRolMutation,
  useDesactivarRolMutation,
  // Usuarios
  useObtenerUsuariosQuery,
  useCrearUsuarioMutation,
  useActualizarUsuarioMutation,
  useDesactivarUsuarioMutation,
} = authApi;
