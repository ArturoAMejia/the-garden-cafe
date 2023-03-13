import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC, useMemo } from "react";
import {
  ICatEstado,
  ICliente,
  IPedido,
  ITrabajador,
} from "../../../interfaces";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { IVenta } from "../../../interfaces";
import { AnularVenta } from "../../admin";

const columunHelper = createColumnHelper<IVenta>();

interface Props {
  ventas: IVenta[];
}
export const VentasTable: FC<Props> = ({ ventas }) => {
  const columns = useMemo<ColumnDef<IVenta, any>[]>(
    () => [
      columunHelper.accessor<"cliente", ICliente>("cliente", {
        header: "Cliente",
        cell: (info) => `${info.getValue().persona?.nombre}
        ${""} ${info.getValue().persona?.apellido_razon_social}
        `,
      }),
      columunHelper.accessor<"trabajador", ITrabajador>("trabajador", {
        header: "Trabajador",
        cell: (info) => `${info.getValue().persona?.nombre}
        ${""} ${info.getValue().persona?.apellido_razon_social}
        `,
      }),
      columunHelper.accessor<"tipo_venta", string>("tipo_venta", {
        header: "Tipo Venta",
        cell: (info) => info.getValue(),
      }),
      columunHelper.accessor<"fecha_venta", Date>("fecha_venta", {
        header: "Fecha Venta",
        cell: (info) =>
          format(new Date(info.getValue()), "EEEE dd 'de' MMMM 'del' yyyy", {
            locale: es,
          }),
      }),
      columunHelper.accessor<"subtotal", number>("subtotal", {
        header: "Subtotal",
        cell: (info) => info.getValue(),
      }),
      columunHelper.accessor<"descuento", number>("descuento", {
        header: "Descuento",
        cell: (info) => info.getValue(),
      }),
      columunHelper.accessor<"impuesto", number>("impuesto", {
        header: "Impuesto",
        cell: (info) => info.getValue().toFixed(2),
      }),
      columunHelper.accessor<"total", number>("total", {
        header: "Total",
        cell: (info) => info.getValue().toFixed(2),
      }),
      columunHelper.accessor<"cat_estado", ICatEstado>("cat_estado", {
        header: "Estado",
        cell: (props) =>
          props.getValue().nombre === "Activo" ? (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {props.getValue().nombre}
            </span>
          ) : props.getValue().nombre === "Utilizable" ? (
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
              {props.getValue().nombre}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              {props.getValue().nombre}
            </span>
          ),
      }),
      columunHelper.display({
        id: "actions",
        header: () => <span>Acciones</span>,
        cell: (props) => (
          <div className="flex justify-center gap-2">
            {/* // TODO Anular Pedido */}
            {/* <EditarPedido pedido={props.row.original} /> */}
            <AnularVenta id={props.row.original.id} />
            <Link
              className="flex flex-row items-center gap-2 text-center text-black"
              href={`/admin/venta/${props.row.original.id}`}
              passHref
            >
              <IdentificationIcon className="h-6 w-6 text-black" />
              Ver Detalles
            </Link>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: ventas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-3 py-2 text-center text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between gap-1 border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Mostrando{" "}
            <span className="font-medium">
              {table.getRowModel().rows.length}
            </span>{" "}
            resultados <span className="font-medium">{}</span>
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <button
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </button>
          <button
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </button>
        </div>
      </nav>
    </div>
  );
};
