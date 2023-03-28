import { useContext } from "react";

import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { FilterBar, ResumenPedido } from "../../../../components";

import { AdminContext } from "../../../../context";
import { useObtenerIngredientesQuery } from "@/store/slices/inventario";
import { ResumenSolicitud } from "@/components/admin/compra/solicitud-compra/ResumenSolicitud";

const NuevaOrdenCompraPage = () => {
  const {
    productos,
    actualizarCantidadProducto,
    quitarProducto,
    subtotal,
    tax,
    total,
    añadirProductoOrden,
  } = useContext(AdminContext);

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
              añadirProductoOrden={añadirProductoOrden}
            />
          )}
        </div>
      </div>
      <div className="flex-row gap-4 md:flex">
        <div className="w-3/4">
          <ResumenPedido
            productos={productos}
            actualizarCantidadProducto={actualizarCantidadProducto}
            quitarProducto={quitarProducto}
            subtotal={subtotal}
            total={total}
            tax={tax}
          />
        </div>
        <div className="w-1/4">
          <ResumenSolicitud />
        </div>
      </div>
    </AdminLayout>
  );
};

export default NuevaOrdenCompraPage;
