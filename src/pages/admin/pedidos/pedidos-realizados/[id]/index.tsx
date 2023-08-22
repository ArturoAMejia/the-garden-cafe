import React, { FC, useEffect, useState } from "react";

import { GetServerSideProps } from "next";
import { prisma } from "../../../../../database";
import {
  ICatEstado,
  IPedido,
  IProductoElaborado,
} from "../../../../../interfaces";
import { AdminLayout } from "../../../../../components/Layout/AdminLayout";

import { format } from "date-fns";
import { es } from "date-fns/locale";

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
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { RealizarVenta } from "@/components/admin/ventas/nueva-venta/RealizarVenta";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ProductoPorCategoria } from "@/components/admin/pedido/ProductoPorCategoria";
import { Loader } from "@/components/ui/Loader";

interface Props {
  detalle: IPedido;
  estados: ICatEstado[];
}

const DetallePedidoRealizadoPage: FC<Props> = ({ detalle, estados }) => {
  const { productos, subtotal, total } = useAppSelector(
    ({ pedido }: AppState) => pedido
  );

  const { data: session } = useSession();

  const { data: categorias, isLoading: isLoadingCategorias } =
    useObtenerCategoriasQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      cargarPedido(
        detalle.detalle_pedido.map((producto) => ({
          id: producto.id_producto_elaborado,
          nombre: producto.producto_elaborado.nombre,
          precio: producto.precio,
          id_estado: producto.id_estado,
          cantidad: producto.cantidad,
        }))
      )
    );
  }, [dispatch, detalle]);

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
            Cliente:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.cliente?.persona?.nombre}{" "}
              {detalle.cliente?.persona?.apellido_razon_social}
            </span>
          </p>
          <p className="text-xl font-bold">
            Tipo de Pedido:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.tipo_pedido}
            </span>
          </p>
          <p className="text-xl font-bold">
            Observaciones:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.observacion}
            </span>
          </p>
          <p className="text-xl font-bold">
            Estado:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.cat_estado.nombre}
            </span>
          </p>
          <p className="text-xl font-bold">
            Mesa:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.id_mesa}
            </span>
          </p>
        </div>
        {session?.user.id_rol === 5 ||
        session?.user.id_rol === 1 ||
        session?.user.id_rol === 2 ? (
          detalle.cat_estado.id !== 8 ? (
            detalle.cat_estado.id !== 15 ? (
              <RealizarVenta pedido={detalle} />
            ) : null
          ) : null
        ) : null}
      </div>
      <div className="mt-4 flex-row gap-4 md:flex">
        <div
          className={`w-full  md:h-80 ${
            session?.user.id_trabajador === detalle.id_trabajador ||
            (session?.user.id_trabajador !== detalle.id_trabajador &&
              session?.user.id_rol === 1) ||
            (session?.user.id_trabajador === detalle.id_trabajador &&
              session?.user.id_rol === 2)
              ? "md:w-3/5"
              : ""
          }`}
        >
          <ResumenPedidoLocal
            id_estado={detalle.cat_estado.id}
            productos={productos}
            quitarProducto={quitarProductoPedido}
            subtotal={subtotal}
            total={total}
            id_trabajador={detalle.id_trabajador}
            nuevo_pedido={false}
            estados={estados}
          />
          <div className="flex gap-4">
            {session?.user.id_trabajador === detalle.id_trabajador ||
            (session?.user.id_trabajador !== detalle.id_trabajador &&
              session?.user.id_rol === 1) ||
            (session?.user.id_trabajador === detalle.id_trabajador &&
              session?.user.id_rol === 2) ||
            (session?.user.id_trabajador !== detalle.id_trabajador &&
              session?.user.id_rol === 5) ? (
              detalle.cat_estado.id !== 8 ? (
                detalle.cat_estado.id !== 15 ? (
                  <EditarPedido pedido={detalle} />
                ) : null
              ) : null
            ) : null}
          </div>
        </div>
        {session?.user.id_trabajador === detalle.id_trabajador ||
        (session?.user.id_trabajador !== detalle.id_trabajador &&
          session?.user.id_rol === 1) ||
        (session?.user.id_trabajador !== detalle.id_trabajador &&
          session?.user.id_rol === 2) ? (
          <>
            {detalle.cat_estado.id !== 8 ? (
              detalle.cat_estado.id !== 15 ? (
                <div
                  className={`w-full md:h-5/6 ${
                    session?.user.id_trabajador === detalle.id_trabajador ||
                    (session?.user.id_trabajador !== detalle.id_trabajador &&
                      session?.user.id_rol === 1 &&
                      detalle.cat_estado.id !== 8) ||
                    (session?.user.id_trabajador === detalle.id_trabajador &&
                      session?.user.id_rol === 2 &&
                      detalle.cat_estado.id !== 15)
                      ? "md:w-2/5"
                      : ""
                  }`}
                >
                  {isLoadingCategorias ? (
                    <Loader />
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      {categorias
                        .filter(
                          (categoria) => categoria.id_tipo_categoria === 2
                        )
                        .map((categoria) => (
                          <ProductoPorCategoria
                            key={categoria.nombre}
                            categoria={categoria}
                          />
                        ))}
                    </div>
                  )}
                </div>
              ) : null
            ) : null}
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default DetallePedidoRealizadoPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);


  await prisma.$connect();
  const detalle = await prisma.pedido.findFirst({
    select: {
      id: true,
      id_cliente: true,
      id_mesa: true,
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
          id_estado: true,
          monto: true,
          cantidad: true,
          precio: true,
        },
      },
    },
    where: { id: Number(ctx.query.id) },
  });

  const estados = await prisma.cat_estado.findMany();
  await prisma.$disconnect();
  return {
    props: {
      detalle: JSON.parse(JSON.stringify(detalle)),
      estados: JSON.parse(JSON.stringify(estados)),
    },
  };
};
