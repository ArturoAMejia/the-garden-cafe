import React, { useState } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { Tab, TabList } from "@tremor/react";
import {
  CurrencyDollarIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import { ArqueoCajaTable } from "@/components/tables/caja/ArqueoCajaTable";
import { CajasAbiertasTable } from "@/components/tables/caja/CajasAbiertasTable";

const ArqueoCajaIndex = () => {
  const [showCard, setShowCard] = useState(1);

  return (
    <AdminLayout title="Aperturas de Caja">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="px-2 text-xl font-semibold text-gray-900">
            Arqueo de Caja
          </h1>
          <p className="mt-2 px-2 text-sm text-gray-700">
            Da click al botón para arquear una caja
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        {/* <AbrirCaja /> */}
        {/* <ArquearCaja /> */}
      </div>
      <TabList
        defaultValue="1"
        onValueChange={(value) => setShowCard(Number(value))}
        className="my-6"
      >
        <Tab value="1" text="Cajas Abiertas" icon={CurrencyDollarIcon} />
        <Tab value="2" text="Historial Arqueo" icon={DocumentChartBarIcon} />
      </TabList>

      {showCard === 1 ? (
        <CajasAbiertasTable cerrar_caja={false} />
      ) : (
        <ArqueoCajaTable />
      )}
    </AdminLayout>
  );
};

export default ArqueoCajaIndex;
