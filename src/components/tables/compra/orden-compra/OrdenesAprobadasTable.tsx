import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC } from "react";
import { ICatEstado, IOrdenCompra, ITrabajador } from "../../../../interfaces";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { AnularOrden } from "../../../admin/compra/orden/AnularOrden";
import { IdentificationIcon } from "@heroicons/react/24/outline";

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";

interface Props {
  ordenes_compra: IOrdenCompra[];
  repecion_orden_compra?: boolean;
}

const columnHelper = createColumnHelper<IOrdenCompra>();

export const OrdenesAprobadasTable: FC<Props> = ({
  ordenes_compra,
  repecion_orden_compra,
}) => {
  const columns = [
    columnHelper.accessor((row) => row.num_orden, {
      id: "num_orden",
      header: () => <span>Número de Orden</span>,
      cell: (info) =>
        `
      OC-
      ${info.getValue()}
      `,
    }),
    columnHelper.accessor<"trabajador", ITrabajador>("trabajador", {
      header: "Autorizado por",
      cell: (info) =>
        `${info.getValue().persona?.nombre} ${
          info.getValue().persona?.apellido_razon_social
        }`,
    }),
    columnHelper.accessor((row) => row.comprobante?.descripcion, {
      id: "motivo",
      header: () => <span>Motivo de la Solicitud</span>,
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor((row) => row.fecha_orden, {
      id: "fecha_solicitud",
      header: () => <span>Fecha de la Solicitud</span>,
      cell: (info) =>
        format(new Date(info.getValue()), "EEEE dd 'de' MMMM 'del' yyyy", {
          locale: es,
        }),
    }),

    columnHelper.accessor<"cat_estado", ICatEstado>("cat_estado", {
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
    columnHelper.display({
      id: "actions",
      header: () => <span>Acciones</span>,
      cell: (props) => (
        <div className="flex justify-center gap-2">
          {/* <AceptarOrden solicitud_compra={props.row.original} />
          <RechazarOrden solicitud_compra={props.row.original} /> */}
          <AnularOrden orden={props.row.original} />
          {repecion_orden_compra ? (
            <Link
              className="flex flex-row items-center gap-2 text-center text-black"
              href={`/admin/compra/recepcion-orden-compra/${props.row.original.id}`}
              passHref
            >
              <IdentificationIcon className="h-6 w-6 text-black" />
              Ver Detalles
            </Link>
          ) : (
            <Link
              className="flex flex-row items-center gap-2 text-center text-black"
              href={`/admin/compra/ordenes/${props.row.original.id}`}
              passHref
            >
              <IdentificationIcon className="h-6 w-6 text-black" />
              Ver Detalles
            </Link>
          )}
        </div>
      ),
    }),
  ];
  const table = useReactTable({
    data: ordenes_compra,
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
