import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import {
  IAperturaCaja,
  ICaja,
  IDetalleApertura,
  ITrabajador,
} from "../../../interfaces";
import tgcApi from "../../../api/tgcApi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { format, getHours, getMinutes } from "date-fns";
import { es } from "date-fns/locale";

const columnHelper = createColumnHelper<IAperturaCaja>();

export const AperturaCajaTable = () => {
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

      columnHelper.accessor<"fecha_apertura", Date>("fecha_apertura", {
        header: "Fecha de Apertura",
        cell: (info) =>
          format(new Date(info.getValue()), "EEEE dd 'de' MMMM 'del' yyyy", {
            locale: es,
          }),
      }),
      columnHelper.accessor<"fecha_apertura", Date>("fecha_apertura", {
        header: "Hora de Apertura",
        cell: (info) =>
          `${getHours(new Date(info.getValue()))}:${getMinutes(
            new Date(info.getValue())
          )}`,
      }),

      columnHelper.accessor<"detalle_apertura_caja", IDetalleApertura>(
        "detalle_apertura_caja",
        {
          header: "Monto de Apertura",
          cell: (info) => `C$ ${info.getValue().monto_cordobas.toFixed()}`,
        }
      ),
    ],
    []
  );

  const [aperturas, setAperturas] = useState<IAperturaCaja[]>([]);

  const obtenerAperturas = async () => {
    const { data } = await tgcApi.get("/api/caja/apertura");
    setAperturas(data);
  };

  useEffect(() => {
    obtenerAperturas();
  }, []);

  const table = useReactTable({
    data: aperturas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <Table className="mt-5 rounded-md">
        <TableHead className="border-black bg-black">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeaderCell
                  key={header.id}
                  className="text-center text-white"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHeaderCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
