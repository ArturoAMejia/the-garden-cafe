import React, { FC } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { AgregarProveedor } from "../../../../components";
import { ProveedorTable } from "../../../../components/tables";

const ProveedorPage = () => {
  return (
    <AdminLayout title="Proveedores">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto mb-4">
          <h1 className="text-xl pt-4 font-semibold text-gray-900">
            Proveedor
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Añade un nuevo proveedor dandole click al botón
          </p>
        </div>
        <div className="sm:mt-0 px-1 sm:ml-16 sm:flex-none mb-4">
          <AgregarProveedor />
        </div>
      </div>
      <ProveedorTable />
    </AdminLayout>
  );
};

export default ProveedorPage;
