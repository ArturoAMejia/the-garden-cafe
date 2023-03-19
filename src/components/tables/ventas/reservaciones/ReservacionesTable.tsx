import { FC, useContext, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AdminContext } from "../../../../context";
import { AnularReservacion, EditarReservacion } from "../../../admin";
import { ICatEstado, ICliente, IReservacion } from "../../../../interfaces";
import { useObtenerReservacionesQuery } from "@/store/slices/venta";

interface Props {}
const columnHelper = createColumnHelper<IReservacion>();
export const ReservacionesTable: FC<Props> = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor<"cliente", ICliente>("cliente", {
        header: "Cliente",
        cell: (info) => `${info.getValue().persona?.nombre}
      ${""} ${info.getValue().persona?.apellido_razon_social}
      `,
      }),
      columnHelper.accessor<"tipo_reservacion", string>("tipo_reservacion", {
        header: "Tipo de Reservación",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"fecha_reservacion", Date>("fecha_reservacion", {
        header: "Fecha Reservada",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"horas_reservadas", number>("horas_reservadas", {
        header: "Horas Reservada",
        cell: (info) => info.getValue(),
      }),
      // columnHelper.accessor<"detalle_reservacion", number>(
      //   "detalle_reservacion",
      //   {
      //     header: "Total Persona",
      //     cell: (info) => info.getValue(),
      //   }
      // ),
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
          <div className="flex justify-center">
            <EditarReservacion reservacion={props.row.original} />
            <AnularReservacion id={props.row.original.id} />
          </div>
        ),
      }),
    ],
    []
  );

  const {
    data: reservaciones,
    error,
    isError,
    isLoading,
  } = useObtenerReservacionesQuery();

  const table = useReactTable({
    data: reservaciones!,
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
