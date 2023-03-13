import React, { FC } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { NuevaVentaTable } from "../../../../components/tables/ventas/nueva-venta";
import { IPedido } from "../../../../interfaces";

const NuevaVentaPage = () => {
  return (
    <AdminLayout title="Nueva Venta">
      <h1 className="mb-4 text-2xl font-bold">Nueva Venta</h1>

      <NuevaVentaTable />
    </AdminLayout>
  );
};

export default NuevaVentaPage;
