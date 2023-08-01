import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { IInventarioABC } from "../../../interfaces";
import { useObtenerPoliticasInventarioQuery } from "@/store/slices/inventario";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useObtenerInventarioAbcVentaQuery } from "@/store/slices/pedido";
import { Loader } from "@/components/ui/Loader";

const columnHelper = createColumnHelper<IInventarioABC>();

export const InventarioABCTable = () => {
  const { data: politicas, isLoading: isLoadingPoliticas } =
    useObtenerPoliticasInventarioQuery();

  const columns = useMemo<ColumnDef<IInventarioABC, any>[]>(
    () => [
      columnHelper.accessor<"id", number>("id", {
        header: "Código",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"nombre", string>("nombre", {
        header: "Nombre",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"demanda", number>("demanda", {
        header: "Demanda",
        cell: (info) => Number(info.getValue()),
      }),
      // columnHelper.accessor<"precio_producto", number>("precio_producto", {
      //   header: "Valor platillo",
      //   cell: (info) => info.getValue(),
      // }),
      columnHelper.accessor<"porcentaje", number>("porcentaje", {
        header: "%",
        cell: (info) => info.getValue().toFixed(2),
      }),
      columnHelper.accessor<"porcentaje_acumulado", number>(
        "porcentaje_acumulado",
        {
          header: "% Acumulado",
          cell: (info) => info.getValue().toFixed(2),
        }
      ),
      columnHelper.accessor<"clasificacion", string>("clasificacion", {
        header: "Clasificación",
        cell: (info) =>
          info.row.original.porcentaje_acumulado <= politicas[0].porcentaje ? (
            <Badge key={info.row.original.clasificacion} color="red">
              A
            </Badge>
          ) : info.row.original.porcentaje_acumulado <=
            politicas[0].porcentaje + politicas[1].porcentaje ? (
            <Badge key={info.row.original.clasificacion} color="blue">
              B
            </Badge>
          ) : (
            <Badge key={info.row.original.clasificacion} color="amber">
              C
            </Badge>
          ),
      }),
    ],
    [politicas]
  );

  const { data: inventarios, isLoading } = useObtenerInventarioAbcVentaQuery();

  const table = useReactTable({
    data: inventarios!,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log(inventarios);

  if (isLoading) return <Loader />;

  if (isLoadingPoliticas) return <Loader />;

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
