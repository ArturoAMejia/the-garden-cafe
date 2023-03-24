import React, { FC, useContext } from "react";
import { GetServerSideProps } from "next";

import { AgregarPedido, ResumenPedido } from "../../../../components";
import { FilterBar } from "../../../../components/admin/pedido/FilterBar";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";

import { prisma } from "./../../../../database";
import { ICatEstado } from "../../../../interfaces";
import { CartContext } from "../../../../context";
import { useObtenerPlatillosQuery } from "@/store/slices/inventario";

interface Props {
  estados: ICatEstado[];
}
const NuevoPedidoPage: FC<Props> = ({ estados }) => {
  const {
    cart,
    updateCartQuantity,
    removeCartProduct,
    subtotal,
    total,
    tax,
    addProductToCart,
  } = useContext(CartContext);

  const { data: platillos } = useObtenerPlatillosQuery();

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
        <FilterBar
          productos={platillos!}
          añadirProductoOrden={addProductToCart}
          isIngredient={false}
          isPlate={true}
        />
      </div>
      <ResumenPedido
        productos={cart}
        actualizarCantidadProducto={updateCartQuantity}
        quitarProducto={removeCartProduct}
        subtotal={subtotal}
        total={total}
        tax={tax}
      />
      <AgregarPedido estados={estados} />
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
