import { EditarProducto } from "@/components/admin";
import { DesactivarProducto } from "@/components/admin/inventario/producto/DesactivarProducto";
import {
  ICategoriaProducto,
  IMarca,
  IProducto,
  IUnidadMedida,
} from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const productoColumns: ColumnDef<any>[] = [
  columnHelper.accessor<"id", number>("id", {
    header: "Código",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor<"nombre", string>("nombre", {
    header: "Nombre",
    cell: (info) => info.getValue(),
  }),
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
  columnHelper.accessor<"marca", IMarca>("marca", {
    header: "Marca",
    cell: (info) => info.getValue().nombre,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span>Acciones</span>,
    cell: (props) => (
      <div className="flex justify-center">
        <EditarProducto isProduct={true} producto={props.row.original} />
        <DesactivarProducto isProduct={true} id={props.row.original.id} />
      </div>
    ),
  }),
];
