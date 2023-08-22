import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { useObtenerOrdenesCompraQuery } from "@/store/slices/compra";
import { Loader } from "@/components/ui/Loader";
import { DataTable } from "@/components/tables/Table";
import { ordenCompraAprobadasColumns } from "@/components/tables/compra/orden-compra/columns";

const OrdenesCompraPage = () => {
  const { data, isLoading } = useObtenerOrdenesCompraQuery();

  return (
    <AdminLayout title="Ordenes de Compra">
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-gray-900">
          Ordenes de Compra
        </h1>
        <p className="mt-2 mb-4 text-sm text-gray-700">
          Usa el filtro para buscar una orden de compra específica
        </p>
      </div>

      {isLoading === true ? (
        <Loader />
      ) : (
        <DataTable columns={ordenCompraAprobadasColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default OrdenesCompraPage;
