import { prisma } from "database";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { OrdenCompraTable } from "../../../../components/tables";

interface Props {
  permisos: [];
}

const NuevaOrdenPage: FC<Props> = ({ permisos }) => {
  console.log(permisos);

  return (
    <AdminLayout title="Nueva Orden de Compra">
      <div className="sm:flex-auto">
        <h1 className="px-2 text-xl font-semibold text-gray-900">
          Nueva Orden de Compra
        </h1>
        <p className="mt-2 mb-4 px-2 text-sm text-gray-700">
          Usa el filtro de productos para añadirlos la solicitud
        </p>
      </div>
      {permisos.length !== 0 && <OrdenCompraTable />}
    </AdminLayout>
  );
};

export default NuevaOrdenPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { FC } from "react";

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
