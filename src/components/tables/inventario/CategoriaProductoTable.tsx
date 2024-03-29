import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { ICatEstado, ICategoriaProducto } from "../../../interfaces";

import {
  EditarCatProducto,
  DesactivarCategoriaProducto,
} from "../../admin/formularios/catalogos";
import { useObtenerCategoriasQuery } from "@/store/slices/inventario";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import { ReactivarCategoriaProducto } from "../../admin/formularios/catalogos/categoria-producto/ReactivarCategoriaProducto";
import { Loader } from "@/components/ui/Loader";

const columHelper = createColumnHelper<ICategoriaProducto>();

export const CategoriaProductoTable = () => {
  const columns = useMemo<ColumnDef<ICategoriaProducto, any>[]>(
    () => [
      columHelper.accessor<"nombre", string>("nombre", {
        header: "Nombre",
        cell: (info) => info.getValue(),
      }),
      columHelper.accessor<"descripcion", string>("descripcion", {
        header: "Descripcion",
        cell: (info) => info.getValue(),
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
            <EditarCatProducto cat_producto={props.row.original} />{" "}
            <DesactivarCategoriaProducto id={props.row.original.id} />
            <ReactivarCategoriaProducto id={props.row.original.id} />
          </div>
        ),
      }),
    ],
    []
  );

  const { data: categorias, isLoading } = useObtenerCategoriasQuery();

  const table = useReactTable({
    data: categorias!,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <Loader />

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
