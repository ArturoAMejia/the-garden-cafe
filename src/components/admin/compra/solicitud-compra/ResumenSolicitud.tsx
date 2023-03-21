import React from "react";

export const ResumenSolicitud = () => {
  return (
    <>
      <div
        className="w-max rounded-md bg-gray-100 p-8 pt-4 shadow-md"
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
      >
        <div className="mt-6 space-y-6">
          <ul className="space-y-4">
            <div className="col-span-2 mt-2">
              <label
                htmlFor="direccion"
                className="block font-medium text-gray-700"
              >
                Descripción de Solicitud de Compra
              </label>
              <div className="mt-1">
                <textarea
                  rows={2}
                  id="direccion"
                  className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  // {...register("motivo")}
                />
              </div>
            </div>
            {/* Fecha Vigencia */}
            <div className="mt-2">
              <label
                htmlFor="fecha_vigencia"
                className="block  font-medium text-gray-700"
              >
                Fecha Vigencia
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="date"
                  id="fecha_vigencia"
                  // {...register("fecha_vigencia")}
                />
              </div>
            </div>
          </ul>
          <div className="space-y-4 text-center">
            <a
              href="#"
              className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
            >
              View my cart (2)
            </a>
            <a
              href="#"
              className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
            >
              Checkout
            </a>
            <a
              href="#"
              className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            >
              Continue shopping
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
