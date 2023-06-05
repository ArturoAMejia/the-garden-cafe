import { AdminLayout } from "@/components/Layout/AdminLayout";
import { CrearCaja } from "@/components/admin/caja/CrearCaja";
import { CajasTable } from "@/components/tables/caja/CajasTable";
import { MovimientoCajaTable } from "@/components/tables/caja/MovimientoCaja";

import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  HomeIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import { TabList, Tab } from "@tremor/react";
import React, { useState } from "react";

const CajaIndex = () => {
  const [showCard, setShowCard] = useState(1);

  return (
    <AdminLayout title="Cajas">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="px-2 text-xl font-semibold text-gray-900">
            {" "}
            {showCard === 1 ? "Cajas" : "Movimiento de Caja"}
          </h1>
          <p className="mt-2 px-2 text-sm text-gray-700">
            {showCard === 1
              ? "Da click al botón para crear una nueva caja"
              : "Visualiza todos los movimientos de caja"}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        {showCard === 1 ? <CrearCaja /> : ""}
      </div>
      <TabList
        defaultValue="1"
        onValueChange={(value) => setShowCard(Number(value))}
        className="my-6"
      >
        <Tab value="1" text="Cajas" icon={CurrencyDollarIcon} />
        <Tab value="2" text="Movimiento de Caja" icon={DocumentChartBarIcon} />
      </TabList>

      {showCard === 1 ? <CajasTable /> : <MovimientoCajaTable />}
    </AdminLayout>
  );
};

export default CajaIndex;
