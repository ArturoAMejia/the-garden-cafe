import { IProducto, ITransaccion } from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const columnHelper = createColumnHelper<any>();

export const movimientoInventarioColumns: ColumnDef<any>[] = [
  columnHelper.accessor<"id", number>("id", {
    header: "Código",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"producto", IProducto>("producto", {
    header: "Nombre",
    cell: (info) => info.getValue().nombre,
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
  columnHelper.accessor<"cantidad", number>("cantidad", {
    header: "Cantidad",
    cell: (info) => info.getValue(),
  }),
];
