import { DesactivarSubCategoriaProducto } from "@/components/admin/formularios/catalogos/sub-categoria-producto/DesactivarSubCategoriaProducto";
import { EditarSubCategoriaProducto } from "@/components/admin/formularios/catalogos/sub-categoria-producto/EditarSubCategoriaProducto";
import {
  ICatEstado,
  ICategoriaProducto,
  ISubCategoriaProducto,
} from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columHelper = createColumnHelper<ISubCategoriaProducto>();

export const subcategoriaColumns: ColumnDef<ISubCategoriaProducto>[] = [
  columHelper.accessor<"nombre", string>("nombre", {
    header: "Nombre",
    cell: (info) => info.getValue(),
  }),
  columHelper.accessor<"categoria_producto", ICategoriaProducto>(
    "categoria_producto",
    {
      header: "Categoria",
      cell: (info) => info.getValue().nombre,
    }
  ),
  columHelper.accessor<"cat_estado", ICatEstado>("cat_estado", {
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
  columHelper.display({
    id: "acciones",
    header: "Acciones",
    cell: (props) => (
      <div className="flex justify-center">
        <EditarSubCategoriaProducto
          sub_categoria_producto={props.row.original}
        />
        <DesactivarSubCategoriaProducto id={props.row.original.id} />
      </div>
    ),
  }),
];
