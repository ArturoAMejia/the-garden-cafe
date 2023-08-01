import { AdminLayout } from "@/components/Layout/AdminLayout";
import { AgregarUnidadMedida } from "@/components";
import { UnidadMedidaTable } from "@/components/tables";
import { DataTable } from "@/components/tables/Table";
import { Loader } from "@/components/ui/Loader";
import { unidadMedidaColumns } from "@/components/tables/unidad-medida/columns";
import { useObtenerUnidadesMedidaQuery } from "@/store/slices/inventario";

const UnidadMedidaPage = () => {
  const { data, isLoading } = useObtenerUnidadesMedidaQuery();

  return (
    <AdminLayout title="Unidad de Medida">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Unidad de Medida
          </h1>
          <p className="mt-2 mb-4 text-sm text-gray-700">
            Añade una nueva unidad de medida dandole click al botón
          </p>
        </div>

        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarUnidadMedida />
        </div>
      </div>
      {isLoading === true ? (
        <Loader />
      ) : (
        <DataTable columns={unidadMedidaColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default UnidadMedidaPage;
