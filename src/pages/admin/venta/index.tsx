import React, { FC } from "react";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { VentasTable } from "../../../components/tables/ventas/VentasTable";
import { useObtenerReservacionesQuery, useObtenerVentasQuery } from "@/store/slices/venta";

const VentaIndex = () => {
  const {data: reservaciones} = useObtenerReservacionesQuery();

  // console.log(ventas);
  console.log(reservaciones);
  return (
    <AdminLayout title="Ventas Realizadas">
      <h1 className="mb-4 text-2xl font-bold">Ventas Realizadas</h1>

      <VentasTable />
    </AdminLayout>
  );
};

export default VentaIndex;
