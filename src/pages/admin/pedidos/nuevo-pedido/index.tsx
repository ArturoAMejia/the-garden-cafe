import React, { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { AgregarPedido, ProductoFiltrado } from "../../../../components";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { prisma } from "./../../../../database";
import {
  ICaja,
  IIngrediente,
  IProducto,
  IProductoElaborado,
} from "../../../../interfaces";
import {
  useObtenerCategoriasQuery,
  useObtenerPlatillosQuery,
} from "@/store/slices/inventario";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { AppState } from "@/store/store";
import {
  añadirProductoPedido,
  borrarMesaSeleccionada,
  quitarProductoPedido,
} from "@/store/slices/pedido/pedidoSlice";
import { CategoriaFilter } from "@/components/menu/Filter/CategoriaFilter";
import { useMenu } from "@/hooks";
import { ResumenPedidoLocal } from "@/components/admin/pedido/ResumenPedidoLocal";
import { Button, TextInput } from "@tremor/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MesaPedido } from "@/components/admin/pedido/MesaPedido";
import { useObtenerMesasQuery } from "@/store/slices/pedido";
import { ProductoPorCategoria } from "@/components/admin/pedido/ProductoPorCategoria";
import { Loader } from "@/components/ui/Loader";

type propFilter = IProducto | IIngrediente | IProductoElaborado;
interface Props {
  cajas: ICaja[];
}
const NuevoPedidoPage: FC<Props> = ({ cajas }) => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");

  const { filtro, setFiltro, menuFiltrado } = useMenu();

  const { data: mesas, isLoading: isLoadingMesas } = useObtenerMesasQuery();
  const { productos, subtotal, total, id_mesa } = useAppSelector(
    ({ pedido }: AppState) => pedido
  );

  const { data: categorias, isLoading: isLoadingCategorias } =
    useObtenerCategoriasQuery();
  const { data: platillos, isLoading } = useObtenerPlatillosQuery();

  const platillosFiltrados =
    query === ""
      ? platillos
      : platillos.filter((producto: IProductoElaborado) => {
          return producto.nombre.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    dispatch(borrarMesaSeleccionada());
  }, [dispatch]);

  if (isLoadingMesas) return <p>Cargando...</p>;

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
        {cajas.length === 0 ? (
          <div className="flex items-center justify-center">
            <h2 className="ml-2 text-center text-3xl font-bold">
              No hay cajas abiertas para realizar un pedido
            </h2>
          </div>
        ) : !id_mesa ? (
          <div className="mt-4 flex flex-wrap gap-5">
            {mesas.map((mesa) => (
              <MesaPedido key={mesa.nombre} mesa={mesa} />
            ))}
          </div>
        ) : (
          <>
            <div className="w-full md:h-80 md:w-3/5">
              <ResumenPedidoLocal
                id_estado={1}
                productos={productos}
                quitarProducto={quitarProductoPedido}
                subtotal={subtotal}
                total={total}
                id_mesa={id_mesa}
                nuevo_pedido={true}
              />
              <AgregarPedido />
            </div>
            <div className="w-full md:h-5/6 md:w-2/5">
              {/* <TextInput
                className="mt-4 md:mt-0"
                icon={MagnifyingGlassIcon}
                placeholder="Buscar..."
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex justify-end pr-2 pt-2">
                <Button variant="light" onClick={() => setFiltro("")}>
                  Borrar Filtro
                </Button>
              </div> */}
              {isLoadingCategorias ? (
                <Loader/>
              ) : (
                // <CategoriaFilter
                //   categorias={categorias}
                //   setFiltro={setFiltro}
                // />
                <div className="grid grid-cols-3 gap-4">
                  {categorias
                    .filter((categoria) => categoria.id_tipo_categoria === 2)
                    .map((categoria) => (
                      <ProductoPorCategoria
                        key={categoria.nombre}
                        categoria={categoria}
                      />
                    ))}
                </div>
              )}

              {/* {isLoading ? (
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
              )} */}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default NuevoPedidoPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await prisma.$connect();

  const cajas = await prisma.caja.findMany({
    where: {
      id_estado: 1,
    },
  });
  await prisma.$disconnect();

  return {
    props: {
      cajas: JSON.parse(JSON.stringify(cajas)),
    },
  };
};
