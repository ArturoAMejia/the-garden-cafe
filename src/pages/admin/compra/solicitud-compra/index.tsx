import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { FilterBar, ResumenPedido } from "../../../../components";

import { useObtenerIngredientesQuery } from "@/store/slices/inventario";
import { ResumenSolicitud } from "@/components/admin/compra/solicitud-compra/ResumenSolicitud";
import {
  actualizarCantidadProductoSolicitud,
  añadirProductoSolicitud,
  quitarProductoSolicitud,
} from "@/store/slices/compra";
import { useAppSelector } from "@/hooks/hooks";
import { AppState } from "@/store/store";
import { ResumenSolicitudCompra } from "@/components/admin/compra/solicitud-compra/ResumenSolicitudCompra";

const NuevaOrdenCompraPage = () => {
  const { descuento, impuesto, productos, subtotal, total, total_productos } =
    useAppSelector((state: AppState) => state.compra);
  const { data: prod, isLoading } = useObtenerIngredientesQuery();

  return (
    <AdminLayout title="Nueva Solicitud de Compra">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="px-2 text-xl font-semibold text-gray-900">
            Nueva Solicitud de Compra
          </h1>
          <p className="mt-2 px-2 text-sm text-gray-700">
            Usa el filtro de productos para añadirlos la solicitud
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {isLoading ? (
            <>Cargando...</>
          ) : (
            <FilterBar
              isIngredient={true}
              isPlate={false}
              productos={prod!}
              añadirProductoOrden={añadirProductoSolicitud}
            />
          )}
        </div>
      </div>
      <div className="flex-row gap-4 md:flex">
        <div className="w-3/4">
          <ResumenSolicitudCompra
            productos={productos}
            quitarProducto={quitarProductoSolicitud}
            subtotal={subtotal}
            total={total}
          />
          {/* <ResumenPedido
            productos={productos}
            actualizarCantidadProducto={actualizarCantidadProductoSolicitud}
            quitarProducto={quitarProductoSolicitud}
            subtotal={subtotal}
            total={total}
            tax={impuesto}
          /> */}
        </div>
        <div className="w-1/4">
          <ResumenSolicitud />
        </div>
      </div>
    </AdminLayout>
  );
};

export default NuevaOrdenCompraPage;
