import React, { FC } from "react";

import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { OrdenesAprobadasTable } from "../../../../components/tables";
import { useObtenerOrdenesCompraQuery } from "@/store/slices/compra";

const OrdenesCompraPage = () => {
  const { data: ordenes_compra, isLoading } = useObtenerOrdenesCompraQuery();

  if (isLoading) return <p>Cargando...</p>;

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
      <OrdenesAprobadasTable ordenes_compra={ordenes_compra} />
    </AdminLayout>
  );
};

export default OrdenesCompraPage;
