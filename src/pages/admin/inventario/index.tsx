import { useContext, useEffect, useState } from "react";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { InventarioTable } from "../../../components/tables/inventario/InventarioTable";
import { AdminContext } from "../../../context";
import { AgregarInventario } from "../../../components/admin/inventario/CrearInventario";
import {
  BarList,
  Bold,
  Card,
  Flex,
  Tab,
  TabList,
  Title,
  Text,
  CategoryBar,
  Legend,
  Metric,
} from "@tremor/react";
import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  HomeIcon,
  ArchiveBoxArrowDownIcon,
  InboxStackIcon,
  ArchiveBoxIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { InventarioABCTable } from "@/components/tables/inventario/InventarioABCTable";
import PoliticasInventarioStats from "@/components/admin/inventario/PoliticasInventarioStats";
import { useObtenerPoliticasInventarioQuery } from "@/store/slices/inventario";

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
          <AgregarInventario />
        </div>
      </div>
      <TabList
        defaultValue="1"
        onValueChange={(value) => setShowCard(Number(value))}
        className="my-6"
      >
        <Tab value="1" text="Inventario de Productos" icon={InboxIcon} />
        <Tab value="2" text="Inventario ABC" icon={ArchiveBoxArrowDownIcon} />
        <Tab value="3" text="MRP" icon={InboxStackIcon} />
        <Tab value="4" text="Punto de Pedido" icon={ArchiveBoxIcon} />
      </TabList>

      {showCard === 1 ? (
        <InventarioTable />
      ) : showCard === 2 ? (
        <>
          <PoliticasInventarioStats />
          <InventarioABCTable />
        </>
      ) : // TODO
      showCard === 3 ? (
        <p>MRP</p>
      ) : (
        // TODO MRP
        // <InventarioMRP/>
        <p>Punto de Pedido</p>
        // TODO Punto de Pedido
        // <PuntoDePedido/>
      )}
    </AdminLayout>
  );
};

export default InventarioIndex;
