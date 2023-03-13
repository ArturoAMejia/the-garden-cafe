import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { AgregarCliente } from "../../../../components";
import { ClientesTable } from "../../../../components/tables";

const PaginaCliente = () => {
  return (
    <AdminLayout title="Clientes">
      <div className="mb-4 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="px-1 text-xl font-semibold text-gray-900">Cliente</h1>
          <p className="mt-2 px-1 text-sm text-gray-700">
            Añade un nuevo cliente dandole click al botón
          </p>
        </div>
        <div className="mt-4 sm:mt-0  sm:ml-16 sm:flex-none">
          <AgregarCliente />
        </div>
      </div>
      <ClientesTable />
    </AdminLayout>
  );
};

export default PaginaCliente;
