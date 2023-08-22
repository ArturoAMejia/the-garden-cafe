import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import {
  ICatEstado,
  ISolicitudCompra,
  ITrabajador,
} from "../../../../interfaces";

import { AceptarOrden, RechazarOrden } from "../../../admin";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useObtenerSolicitudesCompraQuery } from "@/store/slices/compra/compraApi";
import Link from "next/link";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import { useAppDispatch } from "@/hooks/hooks";
import { cargarSolicitud } from "@/store/slices/compra";
import { Loader } from "@/components/ui/Loader";

const columnHelper = createColumnHelper<ISolicitudCompra>();

export const OrdenCompraTable = () => {
  const dispatch = useAppDispatch();

  const columns = useMemo<ColumnDef<ISolicitudCompra, any>[]>(
    () => [
      columnHelper.accessor<"id", number>("id", {
        header: "Num Sol.",
        cell: (info) => info.row.original.id,
      }),
      columnHelper.accessor<"trabajador", ITrabajador>("trabajador", {
        header: "Trabajador",
        cell: (info) =>
          `${info.getValue().persona?.nombre} ${
            info.getValue().persona?.apellido_razon_social
          }`,
      }),
      columnHelper.accessor<"motivo", string>("motivo", {
        header: "Motivo de la Solicitud",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor<"fecha_solicitud", Date>("fecha_solicitud", {
        header: "Fecha de la Solicitud",
        cell: (info) =>
          format(new Date(info.getValue()), "EEEE dd 'de' MMMM 'del' yyyy", {
            locale: es,
          }),
      }),
      columnHelper.accessor<"fecha_vigencia", Date>("fecha_vigencia", {
        header: "Fecha Vigencia",
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
            <AceptarOrden solicitud_compra={props.row.original} />
            <RechazarOrden solicitud_compra={props.row.original} />
            <Link
              href={`/admin/compra/solicitud-compra/${props.row.original.id}`}
              passHref
              className="flex flex-row items-center gap-2 pt-1 text-center text-black"
              onClick={() =>
                dispatch(
                  cargarSolicitud(
                    props.row.original.detalle_solicitud_compra.map(
                      (producto) => ({
                        id: producto.id_producto,
                        nombre: producto.producto.nombre,
                        descripcion: producto.producto.descripcion,
                        unidad_medida: producto.producto.unidad_medida.nombre,
                        precio: producto.precio_unitario,
                        cantidad: producto.cantidad,
                      })
                    )
                  )
                )
              }
            >
              <IdentificationIcon className="h-6 w-6 text-black" />
            </Link>
          </div>
        ),
      }),
    ],
    [dispatch]
  );
  const { data: solicitudes_compra, isLoading } =
    useObtenerSolicitudesCompraQuery();

  const table = useReactTable({
    data: solicitudes_compra?.filter((solicitud: ISolicitudCompra) => {
      return solicitud.id_estado === 14;
    })!,
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
