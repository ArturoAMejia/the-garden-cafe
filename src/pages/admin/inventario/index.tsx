import { useContext, useEffect } from "react";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { InventarioTable } from "../../../components/tables/inventario/InventarioTable";
import { AdminContext } from "../../../context";
import { AgregarInventario } from "../../../components/admin/inventario/CrearInventario";

const InventarioIndex = () => {
  const { obtenerInventarios } = useContext(AdminContext);

  useEffect(() => {
    obtenerInventarios();
  }, [obtenerInventarios]);

  return (
    <AdminLayout title="Gestión de Inventario">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-4 px-1 text-xl font-semibold text-gray-900">
            Inventario de Productos
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Crea un nuevo inventario dándole click al botón
          </p>
        </div>
        <div className="my-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarInventario />
        </div>
      </div>
      <InventarioTable />
    </AdminLayout>
  );
};

export default InventarioIndex;
