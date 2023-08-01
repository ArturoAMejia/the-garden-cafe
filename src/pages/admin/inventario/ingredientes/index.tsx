import { AgregarProducto, EditarProducto } from "@/components";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { DataTable } from "@/components/tables/Table";
import { ingredientesColumns } from "@/components/tables/inventario/ingredienteColumns";
import { Loader } from "@/components/ui/Loader";
import { useObtenerIngredientesQuery } from "@/store/slices/inventario";
import React from "react";

const IngredientesPage = () => {
  const { data, isLoading } = useObtenerIngredientesQuery();

  return (
    <AdminLayout title="Ingredientes">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Ingredientes
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Añade un nuevo ingrediente dandole click al botón
          </p>
        </div>

        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          {/* //TODO Agregar Ingrediente */}
          <AgregarProducto isIngredient={true} />
        </div>
      </div>

      {isLoading === true ? (
        <Loader />
      ) : (
        <DataTable columns={ingredientesColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default IngredientesPage;
