import React, { FC, useEffect, useState } from "react";

import { GetServerSideProps } from "next";
import { prisma } from "../../../../../database";
import { IPedido, IProducto } from "../../../../../interfaces";
import { ProductoFiltrado } from "../../../../../components";
import { AdminLayout } from "../../../../../components/Layout/AdminLayout";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button, TextInput } from "@tremor/react";

import { EditarPedido } from "../../../../../components/admin/pedido/EditarPedido";
import {
  useObtenerCategoriasQuery,
  useObtenerPlatillosQuery,
} from "@/store/slices/inventario";
import { CategoriaFilter } from "@/components/menu/Filter/CategoriaFilter";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ResumenPedidoLocal } from "@/components/admin/pedido/ResumenPedidoLocal";
import { useMenu } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  quitarProductoPedido,
  añadirProductoPedido,
  cargarPedido,
} from "@/store/slices/pedido/pedidoSlice";
import { AppState } from "@/store/store";

interface Props {
  detalle: IPedido;
}

const DetallePedidoRealizadoPage: FC<Props> = ({ detalle }) => {
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      cargarPedido(
        detalle.detalle_pedido.map((producto) => ({
          id: producto.id_producto_elaborado,
          nombre: producto.producto_elaborado.nombre,
          precio: producto.precio,
          cantidad: producto.cantidad,
        }))
      )
    );
  }, [dispatch, detalle]);

  console.log(detalle);

  return (
    <AdminLayout title={`Detalle del Pedido - ${detalle.id}`}>
      <div className="px-1 sm:flex-auto">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          Pedido Nº - {detalle.id}
        </h1>

        <div className="grid grid-cols-2 gap-2">
          <p className="text-xl font-bold">
            Trabajador:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.trabajador?.persona?.nombre}{" "}
              {detalle.trabajador?.persona?.apellido_razon_social}
            </span>
          </p>
          <p className="text-xl font-bold">
            Fecha de Pedido:{" "}
            <span className="text-lg font-medium">
              {format(
                new Date(detalle.fecha_pedido),
                "EEEE dd 'de' MMMM 'del' yyyy",
                { locale: es }
              )}
            </span>
          </p>
          <p className="text-xl font-bold">
            Tipo de Pedido:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.tipo_pedido}
            </span>
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
          <EditarPedido pedido={detalle} />
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

export default DetallePedidoRealizadoPage;

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  await prisma.$connect();
  const detalle = await prisma.pedido.findFirst({
    select: {
      id: true,
      id_cliente: true,
      cliente: {
        select: {
          id: true,
          id_estado: true,
          cat_estado: true,
          id_persona: true,
          persona: true,
          tipo_cliente: true,
        },
      },
      id_trabajador: true,
      trabajador: {
        select: {
          id: true,
          id_persona: true,
          persona: true,
          id_estado_civil: true,
          id_estado: true,
        },
      },
      tipo_pedido: true,
      fecha_pedido: true,
      ubicacion_entrega: true,
      id_estado: true,
      cat_estado: true,
      vigencia: true,
      observacion: true,
      detalle_pedido: {
        select: {
          id_producto_elaborado: true,
          producto_elaborado: {
            select: {
              nombre: true,
            },
          },
          producto: true,
          monto: true,
          cantidad: true,
          precio: true,
        },
      },
    },
    where: { id: Number(id) },
  });
  await prisma.$disconnect();
  return {
    props: {
      detalle: JSON.parse(JSON.stringify(detalle)),
    },
  };
};
