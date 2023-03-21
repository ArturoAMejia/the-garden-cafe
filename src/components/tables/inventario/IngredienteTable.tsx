import { useMemo } from "react";

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
  IMarca,
  IProducto,
  IUnidadMedida,
} from "../../../interfaces";

import { useObtenerIngredientesQuery } from "@/store/slices/inventario";
import { EditarProducto } from "@/components/admin";
import { DesactivarProducto } from "@/components/admin/inventario/producto/DesactivarProducto";

const columnHelper = createColumnHelper<IProducto>();
export const IngredienteTable = () => {
  const columns = useMemo<ColumnDef<IProducto, any>[]>(
    () => [
      columnHelper.accessor<"id", number>("id", {
        header: "Código",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"nombre", string>("nombre", {
        header: "Nombre",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"descripcion", string>("descripcion", {
        header: "Descripción",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"categoria_producto", ICategoriaProducto>(
        "categoria_producto",
        {
          header: "Categoría",
          cell: (info) => info.getValue().nombre,
        }
      ),
      columnHelper.accessor<"unidad_medida", IUnidadMedida>("unidad_medida", {
        header: "Unidad de Medida",
        cell: (info) => info.getValue().nombre,
      }),
      columnHelper.accessor<"marca", IMarca>("marca", {
        header: "Marca",
        cell: (info) => info.getValue().nombre,
      }),
      columnHelper.display({
        id: "actions",
        header: () => <span>Acciones</span>,
        cell: (props) => (
          <div className="flex justify-center">
            <EditarProducto isIngredient={true} producto={props.row.original} />
            <DesactivarProducto isIngredient={true} id={props.row.original.id} />
          </div>
        ),
      }),
    ],
    []
  );

  const { data: ingredientes, isLoading } = useObtenerIngredientesQuery();
  const table = useReactTable({
    data: ingredientes!,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <>Cargando...</>;

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
