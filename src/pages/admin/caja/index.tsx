import { AdminLayout } from "@/components/Layout/AdminLayout";
import { CrearCaja } from "@/components/admin/caja/CrearCaja";
import { CajasTable } from "@/components/tables/caja/CajasTable";
import React from "react";

const CajaIndex = () => {
  return (
    <AdminLayout title="Cajas">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="px-2 text-xl font-semibold text-gray-900">Cajas</h1>
          <p className="mt-2 px-2 text-sm text-gray-700">
            Da click al botón para crear una nueva caja
          </p>
        </div>
      </div>
      <CrearCaja />
      <CajasTable />
    </AdminLayout>
  );
};

export default CajaIndex;
