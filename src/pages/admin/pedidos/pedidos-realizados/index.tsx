import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { PedidosRealizadosTable } from "../../../../components/tables";

const PedidosRealizadosPage = () => {
  return (
    <AdminLayout title="Pedidos Realizados">
      <div>
        <h1 className="mb-2 text-2xl font-bold">Pedidos Realizados</h1>
        <p className="text-sm">
          Se muestran todos los pedidos que aún faltan por atender.
        </p>
      </div>
      <PedidosRealizadosTable />
    </AdminLayout>
  );
};

export default PedidosRealizadosPage;
