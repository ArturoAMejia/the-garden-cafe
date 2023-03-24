import { useEffect, useState } from "react";
import { ICategoriaProducto, IMenu, IProducto } from "../../interfaces";
import tgcApi from "../../api/tgcApi";
import { useObtenerPlatillosQuery } from "@/store/slices/inventario";

export const useMenu = () => {
  const [categoriaProductos, setCategoriaProductos] = useState<
    ICategoriaProducto[]
  >([]);

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
    categoriaProductos,
    menuFiltrado,
  };
};
