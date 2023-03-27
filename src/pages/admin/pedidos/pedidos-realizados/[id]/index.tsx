import React, { FC, useContext } from "react";

import { GetServerSideProps } from "next";
import { prisma } from "../../../../../database";
import { IPedido } from "../../../../../interfaces";
import { FilterBar, ResumenPedido } from "../../../../../components";
import { AdminLayout } from "../../../../../components/Layout/AdminLayout";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CartContext } from "../../../../../context";
import { EditarPedido } from "../../../../../components/admin/pedido/EditarPedido";
import { useObtenerPlatillosQuery } from "@/store/slices/inventario";

interface Props {
  detalle: IPedido;
}

const DetallePedidoRealizadoPage: FC<Props> = ({ detalle }) => {
  const {
    addProductToCart,
    updateCartQuantity,
    cart,
    removeCartProduct,
    subtotal,
    tax,
    total,
  } = useContext(CartContext);

  const { data: platillos, isLoading } = useObtenerPlatillosQuery();

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
              {detalle.trabajador?.persona?.nombre}
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
          {/* {/* <p className="text-xl font-bold">
            Proveedor:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.proveedor?.persona?.nombre}{" "}
              {detalle.proveedor?.persona?.apellido_razon_social}
            </span>
          </p> */}
          <p className="text-xl font-bold">
            Tipo de Pedido:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.tipo_pedido}
            </span>
          </p>
        </div>
      </div>
      {/* <DetallePedido detalle={detalle.detalle_pedido} /> */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
        {isLoading && <>Cargando...</>}
        <FilterBar
          isIngredient={false}
          isPlate={true}
          productos={platillos!}
          añadirProductoOrden={addProductToCart}
        />
      </div>
      <ResumenPedido
        actualizarCantidadProducto={updateCartQuantity}
        productos={cart}
        quitarProducto={removeCartProduct}
        subtotal={subtotal}
        tax={tax}
        total={total}
      />
      <EditarPedido pedido={detalle} />
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
