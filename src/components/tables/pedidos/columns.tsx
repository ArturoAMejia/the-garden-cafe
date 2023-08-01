import { AnularPedido } from "@/components/admin/pedido/AnularPedido";
import { EditarPedido } from "@/components/admin/pedido/EditarPedido";
import { ICatEstado, ICliente, IPedido, ITrabajador } from "@/interfaces";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

const columunHelper = createColumnHelper<IPedido>();

export const pedidosRealizadosColumns: ColumnDef<IPedido>[] = [
  columunHelper.accessor<"id", number>("id", {
    header: "Num Pedido",
    cell: (info) => info.getValue(),
  }),
  columunHelper.accessor<"cliente", ICliente>("cliente", {
    header: "Cliente",
    cell: (info) => `${info.getValue().persona?.nombre}
    ${""} ${info.getValue().persona?.apellido_razon_social}
    `,
  }),
  columunHelper.accessor<"trabajador", ITrabajador>("trabajador", {
    header: "Trabajador",
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
      props.getValue().nombre === "Activo" ||
      props.getValue().nombre === "Cancelado" ? (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          {props.getValue().nombre}
        </span>
      ) : props.getValue().nombre === "Servido" ? (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
          {props.getValue().nombre}
        </span>
      ) : props.getValue().nombre === "Listos" ? (
        <span className="inline-flex items-center rounded-full bg-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-800">
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
        {props.row.original.cat_estado.nombre === "Anulado" ||
        props.row.original.cat_estado.nombre === "Cancelado" ? null : (
          <EditarPedido pedido={props.row.original} />
        )}
        <AnularPedido
          id={props.row.original.id}
          disable={props.row.original.id_estado !== 2 ? false : true}
        />
        <Link
          href={`/admin/pedidos/pedidos-realizados/${props.row.original.id}`}
          passHref
          className="flex flex-row items-center gap-2 pt-1 text-center text-black"
        >
          <IdentificationIcon className="h-6 w-6 text-black" />
        </Link>
      </div>
    ),
  }),
];
