import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  ICatEstado,
  IOrdenCompra,
  IProveedor,
  ISolicitudCompra,
  ITrabajador,
} from "../../../../interfaces";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AceptarOrden, AnularOrden, RechazarOrden } from "@/components/admin";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const columnHelper = createColumnHelper<ISolicitudCompra>();
const columnHelperOrdenAprobada = createColumnHelper<IOrdenCompra>();

export const ordenCompraColumns: ColumnDef<ISolicitudCompra>[] = [
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
        >
          <IdentificationIcon className="h-6 w-6 text-black" />
        </Link>
      </div>
    ),
  }),
];

export const ordenCompraAprobadasColumns: ColumnDef<IOrdenCompra>[] = [
  columnHelperOrdenAprobada.accessor((row) => row.num_orden, {
    id: "num_orden",
    header: () => <span>Número de Orden</span>,
    cell: (info) =>
      `
    OC-
    ${info.getValue()}
    `,
  }),
  columnHelperOrdenAprobada.accessor<"trabajador", ITrabajador>("trabajador", {
    header: "Autorizado por",
    cell: (info) =>
      `${info.getValue().persona?.nombre} ${
        info.getValue().persona?.apellido_razon_social
      }`,
  }),
  columnHelperOrdenAprobada.accessor((row) => row.comprobante?.descripcion, {
    id: "motivo",
    header: () => <span>Motivo de la Solicitud</span>,
    cell: (info) => info.getValue(),
  }),

  columnHelperOrdenAprobada.accessor((row) => row.fecha_orden, {
    id: "fecha_solicitud",
    header: () => <span>Fecha de la Solicitud</span>,
    cell: (info) =>
      format(new Date(info.getValue()), "EEEE dd 'de' MMMM 'del' yyyy", {
        locale: es,
      }),
  }),

  columnHelperOrdenAprobada.accessor<"cat_estado", ICatEstado>("cat_estado", {
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
  columnHelperOrdenAprobada.display({
    id: "actions",
    header: () => <span>Acciones</span>,
    cell: (props) => (
      <div className="flex justify-center gap-2">
        {/* <AceptarOrden solicitud_compra={props.row.original} />
        <RechazarOrden solicitud_compra={props.row.original} /> */}
        <AnularOrden orden={props.row.original} />
        {props.row.original.cat_estado.id !== 17 ? (
          <Link
            className="flex flex-row items-center gap-2 text-center text-black"
            href={`/admin/compra/recepcion-orden-compra/${props.row.original.id}`}
            passHref
          >
            <IdentificationIcon className="h-6 w-6 text-black" />
            Ver Detalles
          </Link>
        ) : (
          <Link
            className="flex flex-row items-center gap-2 text-center text-black"
            href={`/admin/compra/ordenes/${props.row.original.id}`}
            passHref
          >
            <IdentificationIcon className="h-6 w-6 text-black" />
            Ver Detalles
          </Link>
        )}
      </div>
    ),
  }),
];
