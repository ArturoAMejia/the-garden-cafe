import React, { FC } from "react";
import { Card } from "./Card";
import Link from "next/link";
import { IMenu } from "../../interfaces";

interface Props {
  productos: IMenu[];
}
export const ProductCard: FC<Props> = ({ productos }) => {
  return (
    <section className="scale-up-center">
      <div className="mx-auto max-w-screen-xl px-4 mb-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inset-x-0 top-1/2 h-px -translate-y-1/2" />
          <h2 className="inline-block bg-[#FFF9EA] px-4 text-center text-2xl font-bold">
            Nuestro Menú
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 ">
          {productos?.map((prod) => (
            <Card key={prod.id} producto={prod} />
          ))}
        </div>
      </div>
      <div className="text-center my-12">
        <Link href="/menu" className="text-md text-gray-500">
          Ver todo el menú
        </Link>
      </div>
    </section>
  );
};
