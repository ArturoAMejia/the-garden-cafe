import { Dispatch, FC, SetStateAction } from "react";
import { ICategoriaProducto } from "../../../interfaces";

interface Props {
  categoria: ICategoriaProducto;
  setFiltro: Dispatch<SetStateAction<string>>
}

export const FilterItem: FC<Props> = ({ categoria, setFiltro }) => {

  return (
    <div className="flex items-center">
      <input
        id={`${categoria.id}-${categoria.nombre}`}
        type="radio"
        name={"filtro"}
        value={categoria.nombre}
        onChange={() => setFiltro(categoria.nombre)}
        className="h-5 w-5 rounded border-gray-300"
      />
      <label
        htmlFor={`${categoria.id}-${categoria.nombre}`}
        className="ml-3 text-sm font-medium"
      >
        {categoria.nombre}
      </label>
    </div>
  );
};
