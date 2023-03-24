import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { FC, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { CartContext } from "../../context/landing/cart";
import { IProductoCart } from "../../interfaces/producto";
import { IMenu, IProducto } from "../../interfaces";

interface Props {
  producto: any;
}

export const Card: FC<Props> = ({ producto }) => {
  const { addProductToCart } = useContext(CartContext);

  const [tempCartProducto, setTempCartProducto] = useState<IProductoCart>({
    id: Number(producto.id),
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    categoria: producto.categoria_producto.nombre,
    unidad_medida: producto!.unidad_medida.siglas,
    cantidad: 1,
    precio: producto.precio_producto,
    imagen: producto.imagen,
  });

  const onAddProduct = () => {
    toast.success("Producto añadido al carrito!");
    addProductToCart(tempCartProducto);
  };

  return (
    <div className="block rounded-lg border border-gray-100 bg-[#FFF9EA] shadow-xl">
      <Image
        height={350}
        width={500}
        alt={`imagen de ${producto.nombre}`}
        src={producto.imagen ? `${producto.imagen}` : ""}
        className="h-56 w-full rounded-lg object-center"
      />
      <div className="p-6">
        <h3 className="mt-1 text-lg font-bold">{producto.nombre}</h3>
        <p className="text-sm font-medium capitalize text-gray-600">
          {/* {producto.unidad_medida?.siglas} */}
        </p>
        <p className="text-md font-medium text-gray-600">
          ${producto?.precio_producto}
        </p>
        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-[#388C04] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#8CA862]"
          onClick={onAddProduct}
        >
          <span>Añadir al carrito</span>
          <ShoppingCartIcon className="ml-2 h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};
