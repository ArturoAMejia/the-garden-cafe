import { DetallePlatillo } from "@/components/admin/inventario/producto/DetallePlatillo";
import {
  ICategoriaProducto,
  IProductoElaborado,
  IUnidadMedida,
} from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IProductoElaborado>();

export const platillosColumns: ColumnDef<IProductoElaborado>[] = [
  columnHelper.accessor<"id", number>("id", {
    header: "Código",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"nombre", string>("nombre", {
    header: "Nombre",
    cell: (info) => info.getValue(),
  }),
  // }),
  columnHelper.accessor<"categoria_producto", ICategoriaProducto>(
    "categoria_producto",
    {
      header: "Categoría",
      cell: (info) => info.getValue().nombre,
    }
  ),
  columnHelper.accessor<"unidad_medida", IUnidadMedida>("unidad_medida", {
    header: "Unidad de Medida",
    cell: (info) => info.getValue().nombre,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span>Acciones</span>,
    cell: (props) => (
      <div className="flex justify-center">
        {/* //! TODO Hacer el editar platillo */}
        {/* <EditarProducto isProduct={true} producto={props.row.original} />
        <DesactivarProducto isProduct={true} id={props.row.original.id} /> */}
      </div>
    ),
  }),
  columnHelper.display({
    id: "detalle",
    header: "Detalle",
    cell: (props) => (
      <DetallePlatillo
        key={props.row.original.id + "platillo"}
        detalle_platillo={props.row.original.detalle_producto_elaborado}
      />
    ),
  }),
];
