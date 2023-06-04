import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { ICaja, IComprobante, IMoneda } from "../../../interfaces";
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
import { useObtenerMovimientoCajaQuery } from "@/store/slices/caja";

const columnHelper = createColumnHelper<any>();
export const MovimientoCajaTable = () => {
  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      columnHelper.accessor<"id", number>("id", {
        header: "Código",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"comprobante", IComprobante>("comprobante", {
        header: "Num. Comprobante",
        cell: (info) => info.getValue().numeracion,
      }),
      columnHelper.accessor<"caja", ICaja>("caja", {
        header: "Nombre",
        cell: (info) => info.getValue().tipo_caja,
      }),
      columnHelper.accessor<"concepto", string>("concepto", {
        header: "Concepto",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"tipo_movimiento", string>("tipo_movimiento", {
        header: "Tipo de Movimiento",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"fecha_movimiento", Date>("fecha_movimiento", {
        header: "Fecha Movimiento",
        cell: (info) =>
          format(new Date(info.getValue()), "EEEE dd 'de' MMMM 'del' yyyy", {
            locale: es,
          }),
      }),
      columnHelper.accessor<"moneda", IMoneda>("moneda", {
        header: "Moneda",
        cell: (info) => info.getValue().nombre,
      }),
      columnHelper.accessor<"monto", number>("monto", {
        header: "Monto",
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      }),
    ],
    []
  );

  const { data: movimiento_caja, isLoading } = useObtenerMovimientoCajaQuery();

  const table = useReactTable({
    data: movimiento_caja!,
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
