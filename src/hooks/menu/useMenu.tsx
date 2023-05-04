import { useEffect, useState } from "react";
import { IIngrediente, IProducto, IProductoElaborado } from "../../interfaces";
import { useObtenerPlatillosQuery } from "@/store/slices/inventario";

type stateType = IProducto | IIngrediente | IProductoElaborado;

export const useMenu = () => {
  const [menuFiltrado, setMenuFiltrado] = useState<stateType[]>();

  const [filtro, setFiltro] = useState("");

  const { data: productos } = useObtenerPlatillosQuery();

  useEffect(() => {
    if (filtro) {
      const menuFiltrado = productos?.filter(
        (producto) => producto!.categoria_producto!.nombre === filtro
      );
      setMenuFiltrado(menuFiltrado);
    }
  }, [filtro, productos]);

  return {
    productos,
    filtro,
    setFiltro,
    menuFiltrado,
  };
};
