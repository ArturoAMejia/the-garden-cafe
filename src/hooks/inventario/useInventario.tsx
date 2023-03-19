import { useEffect, useState } from "react";
import { ICategoriaProducto } from "../../interfaces";
import tgcApi from "../../api/tgcApi";
import { fetcher } from "../../helpers";
export const useInventario = () => {
  const [categorias, setCategorias] = useState<
    ICategoriaProducto[] | undefined
  >([]);

  const obtenerCategorias = async () => {
    const { data } = await tgcApi.get<ICategoriaProducto[]>(
      "api/catalogos/categoria-producto"
    );
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);
  return {
    categorias,
    setCategorias,
  };
};
