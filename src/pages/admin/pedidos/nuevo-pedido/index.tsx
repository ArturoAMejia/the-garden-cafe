import React, { FC, useState } from "react";
import { GetServerSideProps } from "next";
import { AgregarPedido, ProductoFiltrado } from "../../../../components";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { prisma } from "./../../../../database";
import { ICatEstado, IProducto } from "../../../../interfaces";
import {
  useObtenerCategoriasQuery,
  useObtenerPlatillosQuery,
} from "@/store/slices/inventario";
import { useAppSelector } from "@/hooks/hooks";
import { AppState } from "@/store/store";
import {
  añadirProductoPedido,
  quitarProductoPedido,
} from "@/store/slices/pedido/pedidoSlice";
import { CategoriaFilter } from "@/components/menu/Filter/CategoriaFilter";
import { useMenu } from "@/hooks";
import { ResumenPedidoLocal } from "@/components/admin/pedido/ResumenPedidoLocal";
import { Button, TextInput } from "@tremor/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Props {
  estados: ICatEstado[];
}
const NuevoPedidoPage: FC<Props> = ({ estados }) => {
  const [query, setQuery] = useState("");

  const { filtro, setFiltro, menuFiltrado } = useMenu();

  const { productos, subtotal, total } = useAppSelector(
    ({ pedido }: AppState) => pedido
  );

  const { data: categorias, isLoading: isLoadingCategorias } =
    useObtenerCategoriasQuery();
  const { data: platillos, isLoading } = useObtenerPlatillosQuery();

  const platillosFiltrados =
    query === ""
      ? platillos
      : platillos.filter((producto: IProducto) => {
          return producto.nombre.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <AdminLayout title="Nuevo Pedido">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="px-2 text-xl font-semibold text-gray-900">
            Nuevo Pedido
          </h1>
          <p className="mt-2 px-2 text-sm text-gray-700">
            Usa el filtro de productos para añadirlos al pedido
          </p>
        </div>
      </div>
      <div className="flex-row gap-4 md:flex">
        <div className="w-full md:h-80 md:w-3/5">
          <ResumenPedidoLocal
            productos={productos}
            quitarProducto={quitarProductoPedido}
            subtotal={subtotal}
            total={total}
          />
          <AgregarPedido estados={estados} />
        </div>
        <div className="w-full md:h-5/6 md:w-2/5">
          <TextInput
            className="mt-4 md:mt-0"
            icon={MagnifyingGlassIcon}
            placeholder="Buscar..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex justify-end pr-2 pt-2">
            <Button variant="light" onClick={() => setFiltro("")}>
              Borrar Filtro
            </Button>
          </div>
          {isLoadingCategorias ? (
            <>Cargando...</>
          ) : (
            <CategoriaFilter categorias={categorias} setFiltro={setFiltro} />
          )}

          {isLoading ? (
            <>Cargando...</>
          ) : (
            <div className="mt-4 overflow-y-auto ">
              {filtro
                ? menuFiltrado?.map((prod) => (
                    <ProductoFiltrado
                      key={prod.nombre}
                      añadirProductoOrden={añadirProductoPedido}
                      isIngredient={false}
                      isPlate={true}
                      producto={prod}
                    />
                  ))
                : query
                ? platillosFiltrados.map((platillo) => (
                    <ProductoFiltrado
                      key={platillo.nombre}
                      añadirProductoOrden={añadirProductoPedido}
                      isIngredient={false}
                      isPlate={true}
                      producto={platillo}
                    />
                  ))
                : platillos?.map((prod) => (
                    <ProductoFiltrado
                      key={prod.nombre}
                      añadirProductoOrden={añadirProductoPedido}
                      isIngredient={false}
                      isPlate={true}
                      producto={prod}
                    />
                  ))}
              {}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NuevoPedidoPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await prisma.$connect();

  const estados = await prisma.cat_estado.findMany();
  await prisma.$disconnect();

  return {
    props: {
      estados,
    },
  };
};
