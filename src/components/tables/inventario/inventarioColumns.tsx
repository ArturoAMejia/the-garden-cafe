import { IInventario, IProducto } from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IInventario>();

export const inventarioColumns: ColumnDef<IInventario>[] = [
  columnHelper.accessor<"id", number>("id", {
    header: "Código",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"producto", IProducto>("producto", {
    header: "Nombre",
    cell: (info) => info.getValue().nombre,
  }),
  columnHelper.accessor<"producto", IProducto>("producto", {
    header: "Descripción",
    cell: (info) => info.getValue().descripcion,
  }),
  columnHelper.accessor<"stock_min", number>("stock_min", {
    header: "Stock Mínimo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"stock_max", number>("stock_max", {
    header: "Stock Máximo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"stock_actual", number>("stock_actual", {
    header: "Stock Actual",
    cell: (info) => info.getValue(),
  }),
];
