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
      <div className="flex gap-4">
        prueba
        <AgregarInventario />
      </div>
      <InventarioTable />
    </AdminLayout>
  );
};

export default InventarioIndex;
