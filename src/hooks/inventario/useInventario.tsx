import { useEffect, useState } from "react";
import { ICategoriaProducto } from "../../interfaces";
import tgcApi from "../../api/tgcApi";
import { fetcher } from "../../helpers";
import useSWR from 'swr'

export const useInventario = () => {
  const [categorias, setCategorias] = useState<ICategoriaProducto[]| undefined>([]);

  const { isValidating, data, error } = useSWR<ICategoriaProducto[]>(
    "/api/catalogos/categoria-producto",
    fetcher
  );

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
    data, 
    error
  };
};
