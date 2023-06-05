import { useState } from "react";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { InventarioTable } from "../../../components/tables/inventario/InventarioTable";

import { AgregarInventario } from "../../../components/admin/inventario/CrearInventario";
import { Tab, TabList } from "@tremor/react";
import {
  ArchiveBoxArrowDownIcon,
  InboxStackIcon,
  ArchiveBoxIcon,
  InboxIcon,
  FolderMinusIcon,
} from "@heroicons/react/24/outline";
import { InventarioABCTable } from "@/components/tables/inventario/InventarioABCTable";
import PoliticasInventarioStats from "@/components/admin/inventario/PoliticasInventarioStats";
import { ActualizarPoliticasABC } from "@/components/admin/inventario/ActualizarPoliticasABC";
import { MovimientoInventarioTable } from "@/components/tables/inventario/MovimientoInventarioTable";
import { CrearStockSeguridad } from "@/components/admin/inventario/CrearStockSeguridad";
import { PuntoPedidoTable } from "@/components/tables/inventario/PuntoPedidoTable";
import { CrearPuntoPedido } from "@/components/admin/inventario/CrearPuntoPedido";
import { StockSeguridadTable } from "@/components/tables/inventario/StockSeguridadTable";

const InventarioIndex = () => {
  const [showCard, setShowCard] = useState(1);
  return (
    <AdminLayout title="Gestión de Inventario">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-4 px-1 text-xl font-semibold text-gray-900">
            Inventario de Productos
          </h1>
          <p className="text-sm text-gray-700">
            Crea un nuevo inventario dándole click al botón
          </p>
        </div>

        <div className="my-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          {showCard === 1 ? (
            <AgregarInventario />
          ) : showCard === 2 ? (
            ""
          ) : showCard === 3 ? (
            <CrearStockSeguridad />
          ) : showCard === 4 ? (
            <CrearPuntoPedido />
          ) : (
            ""
          )}
        </div>
      </div>
      <TabList
        defaultValue="1"
        onValueChange={(value) => setShowCard(Number(value))}
        className="my-6"
      >
        <Tab value="1" text="Inventario de Productos" icon={InboxIcon} />
        <Tab value="2" text="Inventario ABC" icon={ArchiveBoxArrowDownIcon} />
        <Tab value="3" text="Stock de Seguridad" icon={InboxStackIcon} />
        <Tab value="4" text="Punto de Pedido" icon={ArchiveBoxIcon} />
        <Tab value="5" text="Movimiento de Inventario" icon={FolderMinusIcon} />
      </TabList>

      {showCard === 1 ? (
        <InventarioTable />
      ) : showCard === 2 ? (
        <>
          <div className="flex justify-between">
            <PoliticasInventarioStats />
            <ActualizarPoliticasABC />
          </div>
          <InventarioABCTable />
        </>
      ) : // TODO
      showCard === 3 ? (
        <StockSeguridadTable />
      ) : showCard === 4 ? (
        <>
          <div className="flex justify-end"></div>
          <PuntoPedidoTable />
        </>
      ) : (
        // <p>Movimiento de Inventario</p>
        <MovimientoInventarioTable />
      )}
    </AdminLayout>
  );
};

export default InventarioIndex;
