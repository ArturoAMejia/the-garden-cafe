import { IProducto } from "@/interfaces";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const stockeSeguridadColumns: ColumnDef<any>[] = [
  columnHelper.accessor<"id", number>("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"producto", IProducto>("producto", {
    header: "Nombre",
    cell: (info) => info.getValue().nombre,
  }),
  columnHelper.accessor<"desviacion_estandar", number>("desviacion_estandar", {
    header: "Desviación Estándar",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"tiempo_entrega", number>("tiempo_entrega", {
    header: "Tiempo de Entrega",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"probabilidad", number>("probabilidad", {
    header: "Probabilidad",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"stock_seguridad", number>("stock_seguridad", {
    header: "Stock de Seguridad",
    cell: (info) => info.getValue(),
  }),
];
