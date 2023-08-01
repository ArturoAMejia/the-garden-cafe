import { IProducto } from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const puntoPedidoColumns: ColumnDef<any>[] = [
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
  columnHelper.accessor<"dias", number>("dias", {
    header: "Días Trabajados",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"costo_producto", number>("costo_producto", {
    header: "Costo del Producto",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"semanas_trabajadas", number>("semanas_trabajadas", {
    header: "Semanas trabajadas",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"tasa_anual", number>("tasa_anual", {
    header: "Tasa Anual %",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"punto_pedido", number>("punto_pedido", {
    header: "Punto de Pedido",
    cell: (info) => info.getValue(),
  }),
];
