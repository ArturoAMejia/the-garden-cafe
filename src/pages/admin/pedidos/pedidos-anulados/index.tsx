import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { PedidosRealizadosTable } from "../../../../components/tables";

const PedidosAnuladosPage = () => {
  return (
    <AdminLayout title="Pedidos Anulados">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Pedidos Anulados</h1>
      </div>
      <PedidosRealizadosTable />
    </AdminLayout>
  );
};

export default PedidosAnuladosPage;
