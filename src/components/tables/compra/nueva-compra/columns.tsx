import { AnularCompra } from "@/components/admin/compra/nueva-compra/AnularCompra";
import { RealizarCompra } from "@/components/admin/compra/nueva-compra/RealizarCompra";
import {
  IOrdenCompra,
  ITrabajador,
  IProveedor,
  ICatEstado,
} from "@/interfaces";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

const columunHelper = createColumnHelper<IOrdenCompra>();

export const nuevaCompraColumns: ColumnDef<IOrdenCompra>[] = [
  columunHelper.accessor<"trabajador", ITrabajador>("trabajador", {
    header: "Trabajador",
    cell: (info) => `${info.getValue().persona?.nombre}
    ${""} ${info.getValue().persona?.apellido_razon_social}
    `,
  }),
  columunHelper.accessor<"proveedor", IProveedor>("proveedor", {
    header: "Proveedor",
    cell: (info) => `${info.getValue().persona?.nombre}
    ${""} ${info.getValue().persona?.apellido_razon_social}
    `,
  }),
  columunHelper.accessor<"fecha_orden", Date>("fecha_orden", {
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
        {/* // TODO Anular Pedido */}
        <RealizarCompra orden={props.row.original} />
        <AnularCompra id={props.row.original.id} />
        <Link
          href={`/admin/compra/ordenes/${props.row.original.id}`}
          passHref
          className="flex flex-row items-center gap-2 pt-1 text-center text-black"
        >
          <IdentificationIcon className="h-6 w-6 text-black" />
          Ver Detalles
        </Link>
      </div>
    ),
  }),
];
