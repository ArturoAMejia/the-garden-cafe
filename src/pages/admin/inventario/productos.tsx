import React, { FC } from "react";
import { AdminLayout } from "../../../components/Layout/AdminLayout";

interface Props {
  productos: IProducto[];
  estados: ICatEstado[];
  marcas: IMarca[];
  unidad_medida: IUnidadMedida[];
  categorias: ICategoriaProducto[];
}

const ProductosPage: FC<Props> = ({
  productos,
  estados,
  categorias,
  marcas,
  unidad_medida,
}) => {
  return (
    <AdminLayout title="Productos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-4 px-1 text-xl font-semibold text-gray-900">
            Productos
          </h1>
        </div>
        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarProducto estados={estados} />
        </div>
      </div>
      <ProductoTable />
    </AdminLayout>
  );
};

export default ProductosPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { prisma } from "./../../../database";
import {
  ICategoriaProducto,
  IMarca,
  IProducto,
  ICatEstado,
  IUnidadMedida,
} from "../../../interfaces";
import { AgregarProducto } from "../../../components/admin/inventario/producto/AgregarProducto";
import { ProductoTable } from "../../../components/tables/inventario/ProductoTable";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await prisma.$connect();
  const productos = await prisma.producto.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      categoria_producto: true,
      marca: true,
      unidad_medida: true,
      cat_estado: true,
      fecha_ingreso: true,
      imagen: true,
      precio_producto: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  const estados = await prisma.cat_estado.findMany();
  const marcas = await prisma.marca.findMany();
  const categorias = await prisma.categoria_producto.findMany();
  const unidad_medida = await prisma.unidad_medida.findMany();

  await prisma.$disconnect();

  return {
    props: {
      productos: JSON.parse(JSON.stringify(productos)),
      estados: JSON.parse(JSON.stringify(estados)),
      marcas: JSON.parse(JSON.stringify(marcas)),
      categorias: JSON.parse(JSON.stringify(categorias)),
      unidad_medida: JSON.parse(JSON.stringify(unidad_medida)),
    },
  };
};
