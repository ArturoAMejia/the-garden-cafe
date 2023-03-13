import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format, getHours, getMinutes } from "date-fns";
import { es } from "date-fns/locale";
import React, { useEffect, useMemo, useState } from "react";
import {
  ITrabajador,
  ICaja,
  IDetalleApertura,
  ICierreCaja,
} from "../../../interfaces";
import tgcApi from "../../../api/tgcApi";

const columnHelper = createColumnHelper<ICierreCaja>();

export const CierreCajaTable = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor<"trabajador", ITrabajador>("trabajador", {
        header: "Cajero",
        cell: (info) =>
          `${info.getValue().persona?.nombre} ${
            info.getValue().persona?.apellido_razon_social
          }`,
      }),

      columnHelper.accessor<"caja", ICaja>("caja", {
        header: "Caja",
        cell: (info) => info.getValue().id,
      }),

      columnHelper.accessor<"fecha_cierre", Date>("fecha_cierre", {
        header: "Fecha de Cierref",
        cell: (info) =>
          format(new Date(info.getValue()), "dd 'de' MMMM 'del' yyyy", {
            locale: es,
          }),
      }),
      columnHelper.accessor<"fecha_cierre", Date>("fecha_cierre", {
        header: "Hora de Cierre",
        cell: (info) =>
          `${getHours(new Date(info.getValue()))}:${getMinutes(
            new Date(info.getValue())
          )}`,
      }),

      columnHelper.accessor<"total", number>("total", {
        header: "Monto de Cierre",
        cell: (info) => `C$ ${info.getValue()}`,
      }),
    ],
    []
  );

  const [cierres, setCierres] = useState<ICierreCaja[]>([]);

  const obtenerCierres = async () => {
    const { data } = await tgcApi.get("api/caja/cierre");
    setCierres(data);
  };
  useEffect(() => {
    obtenerCierres();
  }, []);

  const table = useReactTable({
    data: cierres,
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
