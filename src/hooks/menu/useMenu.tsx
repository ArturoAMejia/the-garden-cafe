import { useEffect, useState } from "react";
import { IProducto } from "../../interfaces";
import { useObtenerPlatillosQuery } from "@/store/slices/inventario";

export const useMenu = () => {
  const [menuFiltrado, setMenuFiltrado] = useState<IProducto[]>();

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
