import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { NuevaCompraTable } from "../../../../components/tables/compra/nueva-compra/NuevaCompraTable";

const NuevaCompraPage = () => {
  return (
    <AdminLayout title="Nueva Compra">
      <h1 className="mb-4 text-2xl font-bold">Nueva Compra</h1>
      <NuevaCompraTable/>
    </AdminLayout>
  );
};

export default NuevaCompraPage;
