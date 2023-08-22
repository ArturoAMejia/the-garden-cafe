import { Loader } from "@/components/ui/Loader";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { DataTable } from "@/components/tables/Table";
import { useObtenerOrdenesCompraQuery } from "@/store/slices/compra";
import { nuevaCompraColumns } from "@/components/tables/compra/nueva-compra/columns";

const NuevaCompraPage = () => {
  const { data, isLoading } = useObtenerOrdenesCompraQuery();

  return (
    <AdminLayout title="Nueva Compra">
      <h1 className="mb-4 text-2xl font-bold">Nueva Compra</h1>
      {isLoading === true ? (
        <Loader />
      ) : (
        <DataTable columns={nuevaCompraColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default NuevaCompraPage;
