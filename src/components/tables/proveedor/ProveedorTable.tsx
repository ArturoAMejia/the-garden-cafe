import React, { useMemo } from "react";
import { DesactivarProveedor, EditarProveedor } from "../..";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ICatEstado, IPersona, IProveedor } from "../../../interfaces";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useObtenerProveedoresQuery } from "@/store/slices/compra/compraApi";

const columHelper = createColumnHelper<IProveedor>();

export const ProveedorTable = () => {
  const columns = useMemo<ColumnDef<IProveedor, any>[]>(
    () => [
      columHelper.accessor<"persona", IPersona>("persona", {
        header: "Nº Cédula - RUC",
        cell: (info) => info.getValue().cedula_ruc,
      }),
      columHelper.accessor<"persona", IPersona>("persona", {
        header: "Nombre",
        cell: (info) => info.getValue().nombre,
      }),
      columHelper.accessor<"persona", IPersona>("persona", {
        header: "Apellido - Razón Social",
        cell: (info) => info.getValue().apellido_razon_social,
      }),
      columHelper.accessor<"sector_comercial", string>("sector_comercial", {
        header: "Sector Comercial",
        cell: (info) => info.getValue(),
      }),
      columHelper.accessor<"persona", IPersona>("persona", {
        header: "Dirección - Domicilio",
        cell: (info) => info.getValue().direccion_domicilio,
      }),
      columHelper.accessor<"persona", IPersona>("persona", {
        header: "Telefóno",
        cell: (info) => info.getValue().telefono,
      }),
      columHelper.accessor<"cat_estado", ICatEstado>("cat_estado", {
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
      columHelper.display({
        id: "acciones",
        header: "Acciones",
        cell: (props) => (
          <div className="flex justify-center">
            <EditarProveedor proveedor={props.row.original} />{" "}
            <DesactivarProveedor proveedor={props.row.original} />
          </div>
        ),
      }),
    ],
    []
  );

  const { data: proveedores, isLoading } = useObtenerProveedoresQuery();

  const table = useReactTable({
    data: proveedores!,
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
