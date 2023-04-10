import { Combobox } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@tremor/react";

import { IMenu, IProducto } from "../../../interfaces";
import { IProductoCart } from "../../../interfaces/producto";
import { useAppDispatch } from "@/hooks/hooks";
import { Card, List, ListItem, Title } from "@tremor/react";

interface Props {
  producto: any;
  añadirProductoOrden: any;
  isIngredient: boolean;
  isPlate: boolean;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const ProductoFiltrado: FC<Props> = ({
  producto,
  añadirProductoOrden,
  isIngredient,
  isPlate,
}) => {
  const [tempCartProducto, setTempCartProducto] = useState<any>({
    id: Number(producto.id),
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    categoria: producto?.categoria_producto.nombre,
    unidad_medida: producto?.unidad_medida.siglas,
    cantidad: 1,
    precio: isIngredient
      ? producto.precio_producto![0].precio_venta
      : producto.precio_producto,
    imagen: producto.imagen,
  });

  const dispatch = useAppDispatch();
  const onAddProduct = () => {
    toast.success("Producto añadido al carrito!");

    dispatch(añadirProductoOrden(tempCartProducto));
  };
  return (
    <div className="flex flex-row my-2 px-1 justify-between">
      <Card className="w-full p-3">
        <List className="p-0">
          <ListItem className="p-0">
            <span>{producto.nombre}</span>
            <Button size="xs" onClick={onAddProduct} icon={ShoppingCartIcon}>
              Añadir
            </Button>

            {/* <ShoppingCartIcon className="ml-2 h-5 w-5 text-white" /> */}
          </ListItem>
        </List>
      </Card>
      {/* <p className="mt-2">{producto.nombre}</p> */}

      {/* <button
        type="submit"
        className="inline-flex w-auto items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-[#388C04] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#8CA862]"
        onClick={onAddProduct}
      >
        <span>Añadir</span>
        <ShoppingCartIcon className="ml-2 h-5 w-5 text-white" />
      </button> */}
    </div>
  );
};
