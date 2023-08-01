import { AgregarMarca } from "@/components";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { DataTable } from "@/components/tables/Table";
import { marcaColumns } from "@/components/tables/marca/columns";
import { Loader } from "@/components/ui/Loader";
import { useObtenerMarcasQuery } from "@/store/slices/inventario";

const MarcaInventario = () => {
  const { data, isLoading } = useObtenerMarcasQuery();

  return (
    <AdminLayout title="Marca de Productos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Marca de Productos
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Añade una nueva marca dandole click al botón
          </p>
        </div>
        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarMarca />
        </div>
      </div>

      {isLoading === true ? (
        <Loader />
      ) : (
        <DataTable columns={marcaColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default MarcaInventario;
