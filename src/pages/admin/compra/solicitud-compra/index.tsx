import React, { FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";

import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import {
  AgregarSolicitudCompra,
  FilterBar,
  ResumenPedido,
} from "../../../../components";

import { AdminContext } from "../../../../context";
import { useMenu } from "../../../../hooks";

import { prisma } from "../../../../database";
import { ICatEstado, ITipoOrdenCompra } from "../../../../interfaces";

interface Props {
  tipos_orden_compra: ITipoOrdenCompra[];
  estados: ICatEstado[];
}

const NuevaOrdenCompraPage: FC<Props> = ({ tipos_orden_compra, estados }) => {
  const [open, setOpen] = useState(false);

  const {
    productos,
    actualizarCantidadProducto,
    quitarProducto,
    subtotal,
    tax,
    total,
    añadirProductoOrden,
  } = useContext(AdminContext);
  const { productos: prod } = useMenu();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AdminLayout title="Nueva Solicitud de Compra">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="px-2 text-xl font-semibold text-gray-900">
            Nueva Solicitud de Compra
          </h1>
          <p className="mt-2 px-2 text-sm text-gray-700">
            Usa el filtro de productos para añadirlos la solicitud
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <FilterBar
            productos={prod}
            añadirProductoOrden={añadirProductoOrden}
          />
        </div>
      </div>
      <ResumenPedido
        productos={productos}
        actualizarCantidadProducto={actualizarCantidadProducto}
        quitarProducto={quitarProducto}
        subtotal={subtotal}
        total={total}
        tax={tax}
      />
      <AgregarSolicitudCompra />
    </AdminLayout>
  );
};

export default NuevaOrdenCompraPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await prisma.$connect();

  const estados = await prisma.cat_estado.findMany();
  const tipos_orden_compra = await prisma.tipo_orden_compra.findMany();
  await prisma.$disconnect();

  return {
    props: {
      tipos_orden_compra: JSON.parse(JSON.stringify(tipos_orden_compra)),
      estados,
    },
  };
};
