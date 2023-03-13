import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { FC, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { CartContext } from "../../context/landing/cart";
import { IProductoCart } from "../../interfaces/producto";
import { IMenu } from "../../interfaces";

interface Props {
  producto: IMenu;
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
    precio: producto.precio_producto![0].precio_venta,
    imagen: producto.imagen,
  });

  const onAddProduct = () => {
    toast.success("Producto añadido al carrito!");
    addProductToCart(tempCartProducto);
  };

  return (
    <div className="bg-[#FFF9EA] block border shadow-xl border-gray-100 rounded-lg">
      <Image
        height={350}
        width={500}
        alt={`imagen de ${producto.nombre}`}
        src={producto.imagen ? `${producto.imagen}` : ""}
        className="h-56 w-full object-center rounded-lg"
      />
      <div className="p-6">
        <h3 className="mt-1 text-lg font-bold">{producto.nombre}</h3>
        <p className="text-sm font-medium text-gray-600 capitalize">
          {/* {producto.unidad_medida?.siglas} */}
        </p>
        <p className="text-md font-medium text-gray-600">
          ${producto?.precio_producto[0].precio_venta}
        </p>
        <button
          type="submit"
          className="mt-4 w-full whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-[#388C04] hover:bg-[#8CA862]"
          onClick={onAddProduct}
        >
          <span>Añadir al carrito</span>
          <ShoppingCartIcon className="ml-2 h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};
