import {
  EditarCatProducto,
  DesactivarCategoriaProducto,
} from "@/components/admin";
import { ReactivarCategoriaProducto } from "@/components/admin/formularios/catalogos/categoria-producto/ReactivarCategoriaProducto";
import { ICatEstado, ICategoriaProducto } from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columHelper = createColumnHelper<ICategoriaProducto>();

export const categoriaProductoColumns: ColumnDef<ICategoriaProducto>[] = [
  columHelper.accessor<"nombre", string>("nombre", {
    header: "Nombre",
    cell: (info) => info.getValue(),
  }),
  columHelper.accessor<"descripcion", string>("descripcion", {
    header: "Descripcion",
    cell: (info) => info.getValue(),
  }),
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
        <EditarCatProducto cat_producto={props.row.original} />{" "}
        <DesactivarCategoriaProducto id={props.row.original.id} />
        <ReactivarCategoriaProducto id={props.row.original.id} />
      </div>
    ),
  }),
];
