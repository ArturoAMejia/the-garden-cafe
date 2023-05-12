import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { useObtenerPedidosQuery } from "@/store/slices/pedido";
import { PedidoCard } from "@/components";
import { Tab, TabList } from "@tremor/react";
import {
  BuildingStorefrontIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const PedidosPage = () => {
  const { data, isLoading } = useObtenerPedidosQuery();
  const [showCard, setShowCard] = useState(1);

  const { data: session } = useSession();
  if (isLoading) return <>Cargando...</>;

  const pedidoEnCola = data.filter(
    (pedido) =>
      pedido.id_estado === 3 &&
      ((pedido.id_trabajador !== session?.user?.id_trabajador &&
        session?.user.id_rol === 1) ||
        (pedido.id_trabajador !== session?.user?.id_trabajador &&
          session?.user.id_rol === 2) ||
        (pedido.id_trabajador !== session?.user?.id_trabajador &&
          session?.user.id_rol === 4) ||
        pedido.id_trabajador === session?.user?.id_trabajador)
  );
  const pedidosPreparación = data.filter(
    (pedido) =>
      pedido.id_estado === 4 &&
      ((pedido.id_trabajador !== session?.user?.id_trabajador &&
        session?.user.id_rol === 1) ||
        (pedido.id_trabajador !== session?.user?.id_trabajador &&
          session?.user.id_rol === 2) ||
        (pedido.id_trabajador !== session?.user?.id_trabajador &&
          session?.user.id_rol === 4) ||
        pedido.id_trabajador === session?.user?.id_trabajador)
  );

  const pedidosListos = data.filter(
    (pedido) =>
      pedido.id_estado === 5 &&
      ((pedido.id_trabajador !== session?.user?.id_trabajador &&
        session?.user.id_rol === 1) ||
        (pedido.id_trabajador !== session?.user?.id_trabajador &&
          session?.user.id_rol === 2) ||
        (pedido.id_trabajador !== session?.user?.id_trabajador &&
          session?.user.id_rol === 4) ||
        pedido.id_trabajador === session?.user?.id_trabajador)
  );

  const pedidosServido = data.filter(
    (pedido) =>
      pedido.id_estado === 6 &&
      ((pedido.id_trabajador !== session?.user?.id_trabajador &&
        session?.user.id_rol === 1) ||
        (pedido.id_trabajador !== session?.user?.id_trabajador &&
          session?.user.id_rol === 2) ||
        (pedido.id_trabajador !== session?.user?.id_trabajador &&
          session?.user.id_rol === 4) ||
        pedido.id_trabajador === session?.user?.id_trabajador)
  );

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
        onValueChange={(value) => setShowCard(Number(value))}
        className="my-6"
      >
        <Tab value="1" text="En el local" icon={BuildingStorefrontIcon} />
        <Tab value="2" text="Para llevar" icon={ShoppingBagIcon} />
        <Tab value="3" text="Entrega a Domicilio" icon={HomeIcon} />
      </TabList>

      {showCard === 1 ? (
        <div className="grid grid-cols-4 gap-8">
          <div className="">
            <h2 className="text-lg font-bold">En Cola</h2>

            {pedidoEnCola
              .filter((pedido) => pedido.tipo_pedido === "Local")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={4}
                  pedido={pedido}
                  color="amber"
                  asignarCocinero={true}
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">En Preparación</h2>

            {pedidosPreparación
              .filter((pedido) => pedido.tipo_pedido === "Local")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={5}
                  pedido={pedido}
                  color="amber"
                  undo={3}
                  asignarCocinero={false}
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
                  id_estado={6}
                  pedido={pedido}
                  color="blue"
                  undo={4}
                  asignarCocinero={false}
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">Servido</h2>
            {pedidosServido
              .filter((pedido) => pedido.tipo_pedido === "Local")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={7}
                  pedido={pedido}
                  color="green"
                  undo={5}
                  asignarCocinero={false}
                />
              ))}
          </div>
        </div>
      ) : showCard === 2 ? (
        <div className="grid grid-cols-4 gap-8">
          <div className="">
            <h2 className="text-lg font-bold">En Cola</h2>

            {pedidoEnCola
              .filter((pedido) => pedido.tipo_pedido === "Para llevar")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={4}
                  pedido={pedido}
                  color="amber"
                  asignarCocinero={true}
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">En Preparación para llevar</h2>

            {pedidosPreparación
              .filter((pedido) => pedido.tipo_pedido === "Para llevar")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={5}
                  pedido={pedido}
                  color="amber"
                  asignarCocinero={false}
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
                  id_estado={6}
                  pedido={pedido}
                  color="blue"
                  undo={3}
                  asignarCocinero={false}
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">Servido</h2>
            {pedidosServido
              .filter((pedido) => pedido.tipo_pedido === "Para llevar")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={7}
                  pedido={pedido}
                  color="green"
                  undo={4}
                  asignarCocinero={false}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8">
          <div className="">
            <h2 className="text-lg font-bold">En Cola</h2>

            {pedidoEnCola
              .filter((pedido) => pedido.tipo_pedido === "Entrega a domicilio")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={4}
                  pedido={pedido}
                  color="amber"
                  asignarCocinero={true}
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">En Preparación para domicilio</h2>

            {pedidosPreparación
              .filter((pedido) => pedido.tipo_pedido === "Entrega a domicilio")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={5}
                  pedido={pedido}
                  color="amber"
                  asignarCocinero={false}
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">Listos</h2>
            {pedidosListos
              .filter((pedido) => pedido.tipo_pedido === "Entrega a domicilio")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={6}
                  pedido={pedido}
                  color="blue"
                  undo={3}
                  asignarCocinero={false}
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-lg font-bold">Servido</h2>
            {pedidosServido
              .filter((pedido) => pedido.tipo_pedido === "Entrega a domicilio")
              .map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  id_estado={7}
                  pedido={pedido}
                  color="green"
                  undo={4}
                  asignarCocinero={false}
                />
              ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default PedidosPage;
