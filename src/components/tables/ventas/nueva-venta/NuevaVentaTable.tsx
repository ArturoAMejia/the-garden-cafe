import { useMemo } from "react";
import Link from "next/link";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ICatEstado,
  ICliente,
  IPedido,
  ITrabajador,
} from "../../../../interfaces";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { RealizarVenta } from "../../../admin/ventas/nueva-venta/RealizarVenta";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import { useObtenerPedidosQuery } from "@/store/slices/pedido";
import { useAppDispatch } from "@/hooks/hooks";

const columunHelper = createColumnHelper<IPedido>();

export const NuevaVentaTable = () => {
  const dispatch = useAppDispatch();

  const columns = useMemo<ColumnDef<IPedido, any>[]>(
    () => [
      columunHelper.accessor<"cliente", ICliente>("cliente", {
        header: "Cliente",
        cell: (info) => `${info.getValue().persona?.nombre}
        ${""} ${info.getValue().persona?.apellido_razon_social}
        `,
      }),
      columunHelper.accessor<"trabajador", ITrabajador>("trabajador", {
        header: "Mesero",
        cell: (info) => `${info.getValue().persona?.nombre}
        ${""} ${info.getValue().persona?.apellido_razon_social}
        `,
      }),
      columunHelper.accessor<"tipo_pedido", string>("tipo_pedido", {
        header: "Tipo Pedido",
        cell: (info) => info.getValue(),
      }),
      columunHelper.accessor<"fecha_pedido", Date>("fecha_pedido", {
        header: "Fecha Pedido",
        cell: (info) =>
          format(new Date(info.getValue()), "EEEE dd 'de' MMMM 'del' yyyy", {
            locale: es,
          }),
      }),
      columunHelper.accessor<"cat_estado", ICatEstado>("cat_estado", {
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
      columunHelper.display({
        id: "actions",
        header: () => <span>Acciones</span>,
        cell: (props) => (
          <div className="flex justify-center gap-2">
            <Link
              href={`/admin/pedidos/pedidos-realizados/${props.row.original.id}`}
              className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white  hover:bg-lime-700"
            >
              Realizar venta
            </Link>
            {/* <RealizarVenta pedido={props.row.original} /> */}
            <Link
              className="flex flex-row items-center gap-2 pt-1 text-center text-black"
              href={`/admin/pedidos/pedidos-realizados/${props.row.original.id}`}
              passHref
            >
              <IdentificationIcon className="h-6 w-6 text-black" />
              Ver Detalles
            </Link>
          </div>
        ),
      }),
    ],
    []
  );

  const { data, isLoading } = useObtenerPedidosQuery();

  const table = useReactTable({
    data: data?.filter(
      (pedido) =>
        pedido.id_estado === 7 ||
        (pedido.tipo_pedido === "Para llevar" && pedido.id_estado !== 8)
    )!,
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
