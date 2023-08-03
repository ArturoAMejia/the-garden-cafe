import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { VentasTable } from "../../../components/tables/ventas/VentasTable";
import { useObtenerReservacionesQuery } from "@/store/slices/venta";

const VentaIndex = () => {
  const { data: reservaciones } = useObtenerReservacionesQuery();

  return (
    <AdminLayout title="Ventas Realizadas">
      <h1 className="mb-4 text-2xl font-bold">Ventas Realizadas</h1>

      <VentasTable />
    </AdminLayout>
  );
};

export default VentaIndex;
