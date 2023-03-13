import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { OrdenCompraTable } from "../../../../components/tables";

const NuevaOrdenPage = () => {
  return (
    <AdminLayout title="Nueva Orden de Compra">
      <div className="sm:flex-auto">
        <h1 className="px-2 text-xl font-semibold text-gray-900">
          Nueva Orden de Compra
        </h1>
        <p className="mt-2 mb-4 px-2 text-sm text-gray-700">
          Usa el filtro de productos para añadirlos la solicitud
        </p>
      </div>
      <OrdenCompraTable />
    </AdminLayout>
  );
};

export default NuevaOrdenPage;
