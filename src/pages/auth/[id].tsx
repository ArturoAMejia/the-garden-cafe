import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface Props {
  params: string;
  user: any;
}

const ConfirmarCuentaPage: React.FC<Props> = ({ params, user }) => {

  const [confirmarCuenta] = useConfirmarCuentaMutation();
  const onConfirmarCuenta = async () => {
    try {
      await confirmarCuenta(user.id).unwrap();

      toast.success("Cuenta confirmada correctamente");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  return (
    <Layout
      title="Confirmación de Cuenta"
      pageDescription="Página de confirmación de cuenta"
    >
      <section className="mx-auto max-w-2xl px-6 py-8 ">
        <header>
          <a href="#">
            {/* <Image
            className="h-7 w-auto sm:h-8"
            src="https://merakiui.com/images/full-logo.svg"
            alt=""
          /> */}
          </a>
        </header>
        <main className="mt-8">
          <h2 className="mb-16 text-3xl font-bold text-gray-700">
            Hola! Gracias por confirmar tu cuenta
          </h2>
          <button
            onClick={() => onConfirmarCuenta()}
            className="mt-16 transform rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium capitalize tracking-wider text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            Volver al inicio
          </button>
          <p className="mt-8 text-gray-600 ">
            Gracias, <br />
            The Garden Cafe
          </p>
        </main>
        <footer className="mt-8">
          <p className="text-gray-500 ">
            Este correo fue enviado por{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline "
              target="_blank"
            >
              admin@thegardencafe.com
            </a>
          </p>
        </footer>
      </section>
    </Layout>
  );
};

export default ConfirmarCuentaPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { prisma } from "database";
import { useConfirmarCuentaMutation } from "@/store/slices/auth";
import { toast } from "react-hot-toast";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params;

  console.log(params.id);
  await prisma.$connect();

  const user = await prisma.usuario.findFirst({
    where: {
      token: params.id as string,
    },
  });

  return {
    props: {
      params,
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
