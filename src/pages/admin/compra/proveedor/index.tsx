import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { AgregarProveedor } from "../../../../components";
import { proviederColumns } from "@/components/tables/proveedor/columns";
import { useObtenerProveedoresQuery } from "@/store/slices/compra";
import { DataTable } from "@/components/tables/Table";

import { Loader } from "@/components/ui/Loader";

const ProveedorPage = () => {
  const { data, isLoading } = useObtenerProveedoresQuery();

  return (
    <AdminLayout title="Proveedores">
      <div className="sm:flex sm:items-center">
        <div className="mb-4 sm:flex-auto">
          <h1 className="pt-4 text-xl font-semibold text-gray-900">
            Proveedor
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Añade un nuevo proveedor dandole click al botón
          </p>
        </div>
        <div className="mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarProveedor />
        </div>
      </div>
      {isLoading === true ? (
        <Loader />
      ) : (
        <DataTable columns={proviederColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default ProveedorPage;
