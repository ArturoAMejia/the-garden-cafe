import { AdminLayout } from "@/components/Layout/AdminLayout";
import { OrdenesAprobadasTable } from "@/components/tables";
import { SolicitudCompraTable } from "@/components/tables/compra/solicitud-compra/SolicitudCompraTable";
import { useObtenerOrdenesCompraQuery } from "@/store/slices/compra";

import { ClockIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { TabList, Tab } from "@tremor/react";
import React, { useState } from "react";

const RecepcionOrdenCompra = () => {
  const [showCard, setShowCard] = useState(1);

  const { data: ordenes_compra, isLoading } = useObtenerOrdenesCompraQuery();

  const ordenes_en_espera = ordenes_compra?.filter(
    (orden) => orden.id_estado === 13
  );

  const ordenes_recepcionadas = ordenes_compra?.filter(
    (orden) => orden.id_estado === 17
  );

  if (isLoading) return <p>Cargando...</p>;

  return (
    <AdminLayout title="Recepción de Orden de Compra">
      <div className="sm:flex-auto">
        <h1 className="px-2 text-xl font-semibold text-gray-900">
          Recepción de Ordenes de Compra
        </h1>
        <p className="mt-2 mb-4 px-2 text-sm text-gray-700">
          Visualiza las ordenes de compra que han sido recepcionadas o están en
          espera
        </p>
      </div>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setShowCard(Number(value))}
        className="my-6"
      >
        <Tab value="1" text="En espera" icon={ClockIcon} />
        <Tab value="2" text="Recepcionadas" icon={CheckBadgeIcon} />
      </TabList>

      {showCard === 1 ? (
        <>
          {isLoading && <p>Cargando...</p>}
          <OrdenesAprobadasTable
            ordenes_compra={ordenes_en_espera}
            repecion_orden_compra={true}
          />
        </>
      ) : (
        <>
          {isLoading && <p>Cargando...</p>}
          <OrdenesAprobadasTable
            ordenes_compra={ordenes_recepcionadas}
            repecion_orden_compra={true}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default RecepcionOrdenCompra;
