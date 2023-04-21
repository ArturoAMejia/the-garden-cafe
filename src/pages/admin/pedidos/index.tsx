import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { useObtenerPedidosQuery } from "@/store/slices/pedido";
import { PedidoCard } from "@/components";

const PedidosPage = () => {
  const { data, isLoading } = useObtenerPedidosQuery();

  if (isLoading) return <>Cargando...</>;

  const pedidosPreparación = data.filter((pedido) => pedido.id_estado === 3);

  const pedidosListos = data.filter((pedido) => pedido.id_estado === 4);

  const pedidosServidos = data.filter((pedido) => pedido.id_estado === 5);

  return (
    <AdminLayout title="Pedidos">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Pedidos En Cola</h1>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="">
          <h2 className="text-lg font-bold">En Preparación</h2>

          {pedidosPreparación.map((pedido) => (
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
          {pedidosListos.map((pedido) => (
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
          {pedidosServidos.map((pedido) => (
            <PedidoCard
              key={pedido.id}
              id_estado={5}
              pedido={pedido}
              color="green"
            />
          ))}
        </div>
      </div>
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
