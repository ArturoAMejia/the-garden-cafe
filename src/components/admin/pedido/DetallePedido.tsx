import React, { FC, useState } from "react";
import Image from "next/image";

interface Props {
  detalle: any;
  subtotal?: number;
  total?: number;
  impuesto?: number;
}
export const DetallePedido: FC<Props> = ({
  detalle,
  subtotal,
  total,
  impuesto,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-full px-4 sm:px-6 lg:px-8	">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-h-min min-w-full py-2 align-middle md:px-1">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Código
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Descripción
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Precio unitario
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Cantidad
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Imagen
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {detalle?.map((detalle: any, detalleIdx: number) => (
                      <tr
                        key={detalle.producto_elaborado.id}
                        className={
                          detalleIdx % 2 === 0 ? undefined : "bg-gray-50"
                        }
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                          {detalle.producto_elaborado.id}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                          {detalle.producto_elaborado.nombre}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                          {detalle.producto_elaborado.descripcion}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                          ${detalle!.precio}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                          {detalle!.cantidad}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                          ${detalle.monto}
                        </td>
                        <td className="flex justify-center whitespace-nowrap pt-2 text-sm text-gray-500">
                          <Image
                            width={56}
                            height={40}
                            src={detalle.producto_elaborado.imagen}
                            alt={detalle.producto_elaborado.nombre}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-white">
                    <tr>
                      <th
                        scope="row"
                        colSpan={7}
                        className="hidden pl-6 pr-3 pt-6 text-right  font-bold text-gray-500 sm:table-cell md:pl-0"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        className="pl-4 pr-3 pt-6 text-left font-bold text-gray-500 sm:hidden"
                      >
                        Subtotal
                      </th>
                      <td className="pl-3 pr-8 pt-6 text-right  text-gray-500 sm:pr-8 md:pr-8">
                        ${subtotal}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={7}
                        className="hidden pl-6 pr-3 pt-2 text-right font-bold text-gray-500 sm:table-cell md:pl-0"
                      >
                        Impuesto
                      </th>
                      <th
                        scope="row"
                        className="pl-4 pr-3 pt-2 text-left  font-bold text-gray-500 sm:hidden"
                      >
                        Tax
                      </th>
                      <td className="pl-3 pr-8 pt-2 text-right text-gray-500 sm:pr-8 md:pr-8">
                        ${impuesto}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={7}
                        className="hidden pl-6 pr-3 pt-2 text-right font-bold text-gray-900 sm:table-cell md:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        className="pl-4 pr-3 pt-2 text-left  font-extrabold text-gray-900 sm:hidden"
                      >
                        Total
                      </th>
                      <td className="mb-2 pl-3 pr-8 pt-2 text-right  text-black sm:pr-8 md:pr-8">
                        ${total?.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
