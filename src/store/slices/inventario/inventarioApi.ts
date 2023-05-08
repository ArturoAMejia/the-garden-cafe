import {
  ICategoriaProducto,
  IMarca,
  IProducto,
  ISubCategoriaProducto,
  IUnidadMedida,
  ITipoCategoria,
  IInventario,
  IProductoElaborado,
  IIngrediente,
  IPrecioProducto,
  IInventarioABC,
} from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const inventarioApi = createApi({
  reducerPath: "inventarioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: [
    "Productos",
    "Platillos",
    "Ingredientes",
    "Unidades de Medida",
    "Marcas",
    "Categorias",
    "Subcategorias",
    "Tipo de Productos",
    "Tipo de Categorias",
    "Inventario",
  ],
  endpoints: (builder) => ({
    obtenerProductos: builder.query<IProducto[], void>({
      query: () => "/inventario/producto",
      providesTags: ["Productos"],
    }),
    crearProducto: builder.mutation<IProducto, any>({
      query: (producto) => ({
        url: "/inventario/producto",
        method: "POST",
        body: producto,
      }),
      invalidatesTags: ["Productos"],
    }),
    actualizarProducto: builder.mutation<IProducto, any>({
      query: (producto) => ({
        url: "/inventario/producto",
        method: "PUT",
        body: producto,
      }),
      invalidatesTags: ["Productos"],
    }),
    desactivarProducto: builder.mutation<number, any>({
      query: (id) => ({
        url: "/inventario/producto",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Productos"],
    }),
    obtenerPlatillos: builder.query<IProductoElaborado[], void>({
      query: () => "/inventario/producto/platillos",
      providesTags: ["Platillos"],
    }),
    crearPlatillo: builder.mutation<IProductoElaborado, any>({
      query: (platillo) => ({
        url: "/inventario/producto/platillo",
        method: "POST",
        body: platillo,
      }),
      invalidatesTags: ["Platillos"],
    }),
    actualizarPlatillo: builder.mutation<IProductoElaborado, any>({
      query: (platillo) => ({
        url: "/inventario/producto/platillo",
        method: "PUT",
        body: platillo,
      }),
      invalidatesTags: ["Platillos"],
    }),
    desactivarPlatillo: builder.mutation<number, any>({
      query: (id) => ({
        url: "/inventario/producto/platillo",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Platillos"],
    }),
    obtenerIngredientes: builder.query<IIngrediente[], void>({
      query: () => "/inventario/producto/ingrediente",
      providesTags: ["Ingredientes"],
    }),
    crearIngrediente: builder.mutation<IProducto, any>({
      query: (ingrediente) => ({
        url: "/inventario/producto/ingrediente",
        method: "POST",
        body: ingrediente,
      }),
      invalidatesTags: ["Ingredientes"],
    }),
    actualizarIngrediente: builder.mutation<IProducto, any>({
      query: (ingrediente) => ({
        url: "/inventario/producto/ingrediente",
        method: "PUT",
        body: ingrediente,
      }),
      invalidatesTags: ["Ingredientes"],
    }),
    desactivarIngrediente: builder.mutation<number, any>({
      query: (id) => ({
        url: "/inventario/producto/ingrediente",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Ingredientes"],
    }),
    obtenerUnidadesMedida: builder.query<IUnidadMedida[], void>({
      query: () => "/catalogos/unidad-medida",
      providesTags: ["Unidades de Medida"],
    }),
    crearUnidadMedida: builder.mutation<IUnidadMedida, any>({
      query: (unidadMedida) => ({
        url: "/catalogos/unidad-medida",
        method: "POST",
        body: unidadMedida,
      }),
      invalidatesTags: ["Unidades de Medida"],
    }),
    actualizarUnidadMedida: builder.mutation<IUnidadMedida, any>({
      query: (unidadMedida) => ({
        url: "/catalogos/unidad-medida",
        method: "PUT",
        body: unidadMedida,
      }),
      invalidatesTags: ["Unidades de Medida"],
    }),
    desactivarUnidadMedida: builder.mutation<number, any>({
      query: (unidadMedida) => ({
        url: "/catalogos/unidad-medida",
        method: "PATCH",
        body: unidadMedida,
      }),
      invalidatesTags: ["Unidades de Medida"],
    }),
    obtenerMarcas: builder.query<IMarca[], void>({
      query: () => "/catalogos/marca",
      providesTags: ["Marcas"],
    }),
    crearMarca: builder.mutation<IMarca, any>({
      query: (marca) => ({
        url: "/catalogos/marca",
        method: "POST",
        body: marca,
      }),
      invalidatesTags: ["Marcas"],
    }),
    actualizarMarca: builder.mutation<IMarca, any>({
      query: (marca) => ({
        url: "/catalogos/marca",
        method: "PUT",
        body: marca,
      }),
      invalidatesTags: ["Marcas"],
    }),
    desactivarMarca: builder.mutation<number, any>({
      query: (marca) => ({
        url: "/catalogos/marca",
        method: "PATCH",
        body: marca,
      }),
      invalidatesTags: ["Marcas"],
    }),
    obtenerCategorias: builder.query<ICategoriaProducto[], void>({
      query: () => "/catalogos/categoria-producto",
      providesTags: ["Categorias"],
    }),
    crearCategoria: builder.mutation<ICategoriaProducto, any>({
      query: (categoria) => ({
        url: "/catalogos/categoria-producto",
        method: "POST",
        body: categoria,
      }),
      invalidatesTags: ["Categorias"],
    }),
    actualizarCategoria: builder.mutation<ICategoriaProducto, any>({
      query: (categoria) => ({
        url: "/catalogos/categoria-producto",
        method: "PUT",
        body: categoria,
      }),
      invalidatesTags: ["Categorias"],
    }),
    desactivarCategoria: builder.mutation<number, any>({
      query: (id) => ({
        url: "/catalogos/categoria-producto",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Categorias"],
    }),
    obtenerSubcategorias: builder.query<ISubCategoriaProducto[], void>({
      query: () => "/catalogos/subcategoria",
      providesTags: ["Subcategorias"],
    }),
    crearSubcategoria: builder.mutation<ISubCategoriaProducto, any>({
      query: (subcategoria) => ({
        url: "/catalogos/subcategoria",
        method: "POST",
        body: subcategoria,
      }),
      invalidatesTags: ["Subcategorias"],
    }),
    actualizarSubcategoria: builder.mutation<ISubCategoriaProducto, any>({
      query: (subcategoria) => ({
        url: "/catalogos/subcategoria",
        method: "PUT",
        body: subcategoria,
      }),
      invalidatesTags: ["Subcategorias"],
    }),
    desactivarSubcategoria: builder.mutation<number, any>({
      query: (subcategoria) => ({
        url: "/catalogos/subcategoria",
        method: "PATCH",
        body: subcategoria,
      }),
      invalidatesTags: ["Subcategorias"],
    }),
    obtenerTiposCategoria: builder.query<ITipoCategoria[], void>({
      query: () => "/catalogos/tipo-categoria",
      providesTags: ["Tipo de Categorias"],
    }),
    crearTipoCategoria: builder.mutation<ITipoCategoria, any>({
      query: (tipoCategoria) => ({
        url: "/catalogos/tipo-categoria",
        method: "POST",
        body: tipoCategoria,
      }),
      invalidatesTags: ["Tipo de Categorias"],
    }),
    actualizarTipoCategoria: builder.mutation<ITipoCategoria, any>({
      query: (tipoCategoria) => ({
        url: "/catalogos/tipo-categoria",
        method: "PUT",
        body: tipoCategoria,
      }),
      invalidatesTags: ["Tipo de Categorias"],
    }),
    desactivarTipoCategoria: builder.mutation<number, any>({
      query: (id) => ({
        url: "/catalogos/tipo-categoria",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["Tipo de Categorias"],
    }),
    obtenerInventario: builder.query<IInventario[], void>({
      query: () => "/inventario",
      providesTags: ["Inventario"],
    }),
    crearInventario: builder.mutation<IInventario, any>({
      query: (inventario) => ({
        url: "/inventario",
        method: "POST",
        body: inventario,
      }),
      invalidatesTags: ["Inventario"],
    }),
    obtenerPrecioProducto: builder.query<IPrecioProducto[], void>({
      query: () => "/inventario/producto/precio-producto",
      providesTags: ["Inventario"],
    }),
    crearPrecioProducto: builder.mutation<IPrecioProducto, any>({
      query: (precioProducto) => ({
        url: "/inventario/producto/precio-producto",
        method: "POST",
        body: precioProducto,
      }),
      invalidatesTags: ["Inventario"],
    }),
    obtenerInventarioAbcVenta: builder.query<IInventarioABC[], void>({
      query: () => "/inventario/inventario-abc/venta",
      providesTags: ["Inventario"],
    }),
    obtenerPoliticasInventario: builder.query<any[], void>({
      query: () => "/inventario/politica-inventario",
      providesTags: ["Inventario"],
    }),
    actualizarPoliticaInventario: builder.mutation<any, any>({
      query: (politica) => ({
        url: "/inventario/politica-inventario",
        method: "PUT",
        body: politica,
      }),
      invalidatesTags: ["Inventario"],
    }),
  }),
});

export const {
  // Ingredientes
  useObtenerIngredientesQuery,
  useCrearIngredienteMutation,
  useActualizarIngredienteMutation,
  useDesactivarIngredienteMutation,
  // Platillos
  useObtenerPlatillosQuery,
  useCrearPlatilloMutation,
  useActualizarPlatilloMutation,
  useDesactivarPlatilloMutation,
  // Producto
  useObtenerProductosQuery,
  useCrearProductoMutation,
  useActualizarProductoMutation,
  useDesactivarProductoMutation,
  // Unidades de Medida
  useObtenerUnidadesMedidaQuery,
  useCrearUnidadMedidaMutation,
  useActualizarUnidadMedidaMutation,
  useDesactivarUnidadMedidaMutation,
  // Marcas
  useObtenerMarcasQuery,
  useCrearMarcaMutation,
  useActualizarMarcaMutation,
  useDesactivarMarcaMutation,
  // Categorias
  useObtenerCategoriasQuery,
  useCrearCategoriaMutation,
  useActualizarCategoriaMutation,
  useDesactivarCategoriaMutation,
  // Subcategorias
  useObtenerSubcategoriasQuery,
  useCrearSubcategoriaMutation,
  useActualizarSubcategoriaMutation,
  useDesactivarSubcategoriaMutation,
  // Tipo de Categorias
  useObtenerTiposCategoriaQuery,
  useCrearTipoCategoriaMutation,
  useActualizarTipoCategoriaMutation,
  useDesactivarTipoCategoriaMutation,
  // Inventario
  useObtenerInventarioQuery,
  useCrearInventarioMutation,
  // Precio Producto
  useObtenerPrecioProductoQuery,
  useCrearPrecioProductoMutation,
  // Inventario ABC
  useObtenerInventarioAbcVentaQuery,
  // Politicas de Inventario
  useObtenerPoliticasInventarioQuery,
  useActualizarPoliticaInventarioMutation,
} = inventarioApi;
