import React, { FC, useState } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { CierreCajaTable } from "../../../../components/tables/caja/CierreCajaTable";
import { Tab, TabList } from "@tremor/react";
import {
  CurrencyDollarIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

import { CajasAbiertasTable } from "@/components/tables/caja/CajasAbiertasTable";

const CierreCajaPage = () => {
  const [showCard, setShowCard] = useState(1);

  return (
    <AdminLayout title="Cierre de Cajas">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="px-2 text-xl font-semibold text-gray-900">
            Cerrar Caja
          </h1>
          <p className="mt-2 px-2 text-sm text-gray-700">
            Da click al botón para cerrar una caja
          </p>
        </div>
      </div>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setShowCard(Number(value))}
        className="my-6"
      >
        <Tab value="1" text="Cajas Abiertas" icon={CurrencyDollarIcon} />
        <Tab value="2" text="Historial Cierre" icon={DocumentChartBarIcon} />
      </TabList>

      {showCard === 1 ? (
        <CajasAbiertasTable cerrar_caja={true} />
      ) : (
        <CierreCajaTable />
      )}
    </AdminLayout>
  );
};

export default CierreCajaPage;
