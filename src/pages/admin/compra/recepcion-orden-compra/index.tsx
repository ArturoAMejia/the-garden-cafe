import { AdminLayout } from "@/components/Layout/AdminLayout";
import { OrdenesAprobadasTable } from "@/components/tables";
import { DataTable } from "@/components/tables/Table";
import { ordenCompraAprobadasColumns } from "@/components/tables/compra/orden-compra/columns";
import { SolicitudCompraTable } from "@/components/tables/compra/solicitud-compra/SolicitudCompraTable";
import { Loader } from "@/components/ui/Loader";
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

      {isLoading === true ? (
        <Loader />
      ) : showCard === 1 ? (
        <>
          {isLoading && <Loader />}
          <DataTable
            columns={ordenCompraAprobadasColumns}
            data={ordenes_en_espera}
          />
        </>
      ) : (
        <>
          {isLoading && <Loader />}
          <DataTable
            columns={ordenCompraAprobadasColumns}
            data={ordenes_recepcionadas}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default RecepcionOrdenCompra;
