import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC, useMemo } from "react";
import {
  IArqueoCaja,
  ICaja,
  ICatEstado,
  ITrabajador,
} from "../../../interfaces";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useObtenerArqueoCajaQuery } from "@/store/slices/caja";
import {
  ArquearCaja,
  DetalleArqueoCaja,
} from "@/components/admin/caja/ArquearCaja";

const columnHelper = createColumnHelper<IArqueoCaja>();

export const ArqueoCajaTable = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor<"id", number>("id", {
        header: "Id",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"caja", ICaja>("caja", {
        header: "Cajero",
        cell: (info) => info.getValue().tipo_caja,
      }),
      columnHelper.accessor<"trabajador", ITrabajador>("trabajador", {
        header: "Tipo de Caja",
        cell: (info) =>
          info.getValue().persona.nombre +
          " " +
          info.getValue().persona.apellido_razon_social,
      }),
      columnHelper.accessor<"fecha_arqueo", Date>("fecha_arqueo", {
        header: "Fecha de Arqueo",
        cell: (info) =>
          format(new Date(info.getValue()), "EEEE dd 'de' MMMM 'del' yyyy", {
            locale: es,
          }),
      }),
      columnHelper.accessor<"total", number>("total", {
        header: "Total Arqueo",
        cell: (info) => `C$${info.getValue().toFixed(2)}`,
      }),
      columnHelper.display({
        header: "",
        id: "detalles",
        cell: (props) => (
          <DetalleArqueoCaja
            arqueo={props.row.original}
            billetes={props.row.original.detalle_billete_arqueo}
            monedas={props.row.original.detalle_monedas_arqueo}
          />
        ),
      }),
    ],
    []
  );

  const { data: arqueos, isLoading } = useObtenerArqueoCajaQuery();

  const table = useReactTable({
    data: arqueos,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <>Cargando...</>;

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
