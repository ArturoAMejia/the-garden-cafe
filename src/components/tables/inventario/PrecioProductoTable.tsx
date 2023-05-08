import React, { useMemo } from "react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ICategoriaProducto,
  IIngrediente,
  IPrecioProducto,
  IUnidadMedida,
} from "../../../interfaces";

import {
  useObtenerPlatillosQuery,
  useObtenerProductosQuery,
} from "@/store/slices/inventario";
import { DesactivarProducto } from "@/components/admin/inventario/producto/DesactivarProducto";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import { DetallePlatillo } from "@/components/admin/inventario/producto/DetallePlatillo";

const columnHelper = createColumnHelper<any>();

export const PrecioProductoTable = () => {
  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor<"gasto", number>("gasto", {
        header: "Nombre",
        cell: (info) => info.getValue(),
      }),
      // columnHelper.accessor<"descripcion", string>("descripcion", {
      //   header: "descripcion",
      //   cell: (info) => info.getValue(),
      // }),
      columnHelper.accessor<"producto", IIngrediente>("producto", {
        header: "Categoría",
        cell: (info) => info.getValue().nombre,
      }),
      columnHelper.accessor<"precio_compra", number>("precio_compra", {
        header: "Precio de compra",
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: () => <span>Acciones</span>,
        cell: (props) => (
          <div className="flex justify-center">
            {/* //! TODO Hacer el editar platillo */}
            {/* <EditarProducto isProduct={true} producto={props.row.original} />
            <DesactivarProducto isProduct={true} id={props.row.original.id} /> */}
          </div>
        ),
      }),
    ],
    []
  );

  const { data: productos, isLoading } = useObtenerPlatillosQuery();

  const table = useReactTable({
    data: productos!,
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
