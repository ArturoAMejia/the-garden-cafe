import { EditarUnidadMedida, DesactivarUnidadMedida } from "@/components/admin";
import { ICatEstado, IUnidadMedida } from "@/interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IUnidadMedida>();

export const unidadMedidaColumns: ColumnDef<IUnidadMedida>[] = [
  columnHelper.accessor((row) => row.nombre, {
    id: "nombre_marca",
    header: () => <span>Nombre de Marca</span>,
  }),
  columnHelper.accessor((row) => row.siglas, {
    id: "descripcion",
    header: () => <span>Siglas</span>,
  }),
  columnHelper.accessor<"cat_estado", ICatEstado>("cat_estado", {
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
  columnHelper.display({
    id: "actions",
    header: () => <span>Acciones</span>,
    cell: (props) => (
      <div className="flex justify-center">
        <EditarUnidadMedida unidad_medida={props.row.original} />
        <DesactivarUnidadMedida id={props.row.original.id} />
      </div>
    ),
  }),
];
