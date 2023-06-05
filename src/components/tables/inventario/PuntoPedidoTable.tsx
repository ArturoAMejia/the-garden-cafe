import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { IProducto } from "../../../interfaces";
import { useObtenerPuntoPedidoQuery } from "@/store/slices/inventario";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

const columnHelper = createColumnHelper<any>();

export const PuntoPedidoTable = () => {
  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor<"id", number>("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"producto", IProducto>("producto", {
        header: "Nombre",
        cell: (info) => info.getValue().nombre,
      }),
      columnHelper.accessor<"desviacion_estandar", number>(
        "desviacion_estandar",
        {
          header: "Desviación Estándar",
          cell: (info) => info.getValue(),
        }
      ),
      columnHelper.accessor<"dias", number>("dias", {
        header: "Días Trabajados",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"costo_producto", number>("costo_producto", {
        header: "Costo del Producto",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"semanas_trabajadas", number>(
        "semanas_trabajadas",
        {
          header: "Semanas trabajadas",
          cell: (info) => info.getValue(),
        }
      ),
      columnHelper.accessor<"tasa_anual", number>("tasa_anual", {
        header: "Tasa Anual %",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"punto_pedido", number>("punto_pedido", {
        header: "Punto de Pedido",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  const { data: punto_pedido, isLoading } = useObtenerPuntoPedidoQuery();

  const table = useReactTable({
    data: punto_pedido,
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
