import React, { FC } from "react";

import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { OrdenesAprobadasTable } from "../../../../components/tables";

const OrdenesCompraPage = () => {
  return (
    <AdminLayout title="Ordenes de Compra">
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-gray-900">
          Ordenes de Compra
        </h1>
        <p className="mt-2 mb-4 text-sm text-gray-700">
          Usa el filtro para buscar una orden de compra específica
        </p>
      </div>
      <OrdenesAprobadasTable />
    </AdminLayout>
  );
};

export default OrdenesCompraPage;
