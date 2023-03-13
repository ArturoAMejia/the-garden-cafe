import { useEffect, useState } from "react";
import { ICategoriaProducto, IMenu } from "../../interfaces";
import tgcApi from "../../api/tgcApi";

export const useMenu = () => {
  const [productos, setProductos] = useState<IMenu[]>([]);
  const [categoriaProductos, setCategoriaProductos] = useState<
    ICategoriaProducto[]
  >([]);

  const [menuFiltrado, setMenuFiltrado] = useState<IMenu[]>()

  const [filtro, setFiltro] = useState("");

  const obtenerProductos = async () => {
    const { data } = await tgcApi.get<IMenu[]>("api/inventario/producto/menu");
    setProductos(data);
  };

  // const obtenerCategoriasProductos = async () => {
  //   const { data } = await tgcApi.get<ICategoriaProducto[]>(
  //     "/catalogos/categoria-producto"
  //   );
  //   setCategoriaProductos(data);
  // };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // useEffect(() => {
  //   obtenerCategoriasProductos();
  // }, []);

  useEffect(() => {
    if (filtro) {
      const menuFiltrado = productos?.filter(
        (producto) => producto.categoria_producto.nombre === filtro
      );
      setMenuFiltrado(menuFiltrado);
    }
  }, [filtro, productos]);

  return {
    productos,
    filtro,
    setFiltro,
    categoriaProductos,
    menuFiltrado
  };
};
