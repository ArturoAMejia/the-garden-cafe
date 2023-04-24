import Layout from "@/components/Layout/Layout";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <Layout title="Página no encontrada" pageDescription="">
      <div className="grid h-screen place-content-center bg-[#FFF9EA] px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-[#5c7c10]">404</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-500">
            No pudimos encontrar la página que estás buscando 😓.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded bg-[#FAB73A] px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring"
          >
            Regresar al inicio
          </Link>
        </div>
      </div>
    </Layout>
  );
}
