import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { FC, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { SolicitudCompraTable } from "@/components/tables/compra/solicitud-compra/SolicitudCompraTable";
import { prisma } from "database";
import { Tab, TabList } from "@tremor/react";
import {
  ArrowUturnDownIcon,
  CheckBadgeIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useObtenerSolicitudesCompraQuery } from "@/store/slices/compra";

interface Props {
  permisos: [];
}

const NuevaOrdenPage: FC<Props> = ({ permisos }) => {
  const [showCard, setShowCard] = useState(1);

  const { data: solicitudes_compra, isLoading } =
    useObtenerSolicitudesCompraQuery();

  const solicitudes_en_espera = solicitudes_compra?.filter(
    (solicitud) => solicitud.id_estado === 13
  );
  const solicitudes_aceptadas = solicitudes_compra?.filter(
    (solicitud) => solicitud.id_estado === 14
  );
  const solicitudes_revertidas = solicitudes_compra?.filter(
    (solicitud) => solicitud.id_estado === 16
  );
  const solicitudes_rechazadas = solicitudes_compra?.filter(
    (solicitud) => solicitud.id_estado === 15
  );

  if (isLoading) return <>Cargando...</>;

  return (
    <AdminLayout title="Nueva Orden de Compra">
      <div className="sm:flex-auto">
        <h1 className="px-2 text-xl font-semibold text-gray-900">
          Solicitudes Realizadas
        </h1>
        <p className="mt-2 mb-4 px-2 text-sm text-gray-700">
          Visualiza las solicitudes de compra realizadas
        </p>
      </div>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setShowCard(Number(value))}
        className="my-6"
      >
        <Tab value="1" text="En espera" icon={ClockIcon} />
        <Tab value="2" text="Aceptadas" icon={CheckBadgeIcon} />
        <Tab value="3" text="Revertidas" icon={ArrowUturnDownIcon} />
        <Tab value="4" text="Rechazadas" icon={XMarkIcon} />
      </TabList>

      {showCard === 1 ? (
        <>
          {isLoading && <p>Cargando...</p>}
          <SolicitudCompraTable solicitudes={solicitudes_en_espera} />
        </>
      ) : showCard === 2 ? (
        <>
          {isLoading && <p>Cargando...</p>}
          <SolicitudCompraTable solicitudes={solicitudes_aceptadas} />
        </>
      ) : showCard === 3 ? (
        <>
          {isLoading && <p>Cargando...</p>}
          <SolicitudCompraTable solicitudes={solicitudes_revertidas} />
        </>
      ) : (
        <>
          {isLoading && <p>Cargando...</p>}
          <SolicitudCompraTable solicitudes={solicitudes_rechazadas} />
        </>
      )}
    </AdminLayout>
  );
};

export default NuevaOrdenPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  await prisma.$connect();

  const permisos = await prisma.rol_permiso.findMany({
    where: {
      id_rol: session.user.id_rol,
      nombre: "Crear Orden de Compra",
    },
  });

  return {
    props: {
      permisos: JSON.parse(JSON.stringify(permisos)),
    },
  };
};
