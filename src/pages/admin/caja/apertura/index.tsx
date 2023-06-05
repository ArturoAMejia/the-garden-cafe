import React, { FC } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { AperturaCajaTable } from "../../../../components/tables/caja/AperturaCajaTable";
import { AbrirCaja } from "../../../../components/admin/caja/AbrirCaja";

const AperturaCajaIndex = () => {
  return (
    <AdminLayout title="Aperturas de Caja">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="px-2 text-xl font-semibold text-gray-900">
            Aperturas de Caja
          </h1>
          <p className="mt-2 px-2 text-sm text-gray-700">
            Da click al botón para aperturar una caja
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <AbrirCaja />
      </div>
      <AperturaCajaTable />
    </AdminLayout>
  );
};

export default AperturaCajaIndex;
