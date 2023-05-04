import { AdminLayout } from "@/components/Layout/AdminLayout";
import { IngredienteTable } from "@/components/tables/inventario/IngredienteTable";
import { PlatilloTable } from "@/components/tables/inventario/PlatillosTable";
import React from "react";

const PlatillosPage = () => {
  return (
    <AdminLayout title="Platillos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Platillos
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Añade un nuevo platillo dandole click al botón
          </p>
        </div>

        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          {/* //TODO Agregar Platillo */}
          {/* <AgregarProducto isIngredient={true} /> */}
        </div>
      </div>
      <PlatilloTable />
    </AdminLayout>
  );
};

export default PlatillosPage;
