import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { useObtenerPedidosQuery } from "@/store/slices/pedido";
import { PedidoCard } from "@/components";
import { Tab, TabList } from "@tremor/react";
import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const PedidosPage = () => {
  const { data, isLoading } = useObtenerPedidosQuery();
  const [showCard, setShowCard] = useState(true);

  if (isLoading) return <>Cargando...</>;

  const pedidosPreparación = data.filter((pedido) => pedido.id_estado === 3);

  const pedidosListos = data.filter((pedido) => pedido.id_estado === 4);

  const pedidosServidos = data.filter((pedido) => pedido.id_estado === 5);

  return (
    <AdminLayout title="Pedidos">
      <div className="sm:flex-auto">
        <h1 className="px-2 text-xl font-semibold text-gray-900">
          Pedidos en Cola
        </h1>
        <p className="mt-2 px-2 text-sm text-gray-700">
          Usa el filtro de productos para añadirlos al pedido
        </p>
      </div>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setShowCard(value === "1")}
        className="my-6"
      >
        <Tab value="1" text="En el local" icon={BuildingStorefrontIcon} />
        <Tab value="2" text="Para llevar" icon={ShoppingBagIcon} />
      </TabList>

      {showCard === true ? (
        <div className="grid grid-cols-3 gap-8">
          <div className="">
            <h2 className="text-lg font-bold">En Preparación</h2>

            {pedidosPreparación
              .filter((pedido) => pedido.tipo_pedido === "Local")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={4}
                  pedido={pedido}
                  color="amber"
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">Listos</h2>
            {pedidosListos
              .filter((pedido) => pedido.tipo_pedido === "Local")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={5}
                  pedido={pedido}
                  color="blue"
                  undo={3}
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">Servidos</h2>
            {pedidosServidos
              .filter((pedido) => pedido.tipo_pedido === "Local")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={5}
                  pedido={pedido}
                  color="green"
                  undo={4}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          <div className="">
            <h2 className="text-lg font-bold">En Preparación para llevar</h2>

            {pedidosPreparación
              .filter((pedido) => pedido.tipo_pedido === "Para llevar")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={4}
                  pedido={pedido}
                  color="amber"
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">Listos</h2>
            {pedidosListos
              .filter((pedido) => pedido.tipo_pedido === "Para llevar")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={5}
                  pedido={pedido}
                  color="blue"
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">Servidos</h2>
            {pedidosServidos
              .filter((pedido) => pedido.tipo_pedido === "Para llevar")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={5}
                  pedido={pedido}
                  color="green"
                />
              ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default PedidosPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession();

  console.log(session);

  return {
    props: {},
  };
};
