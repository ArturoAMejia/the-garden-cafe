import React, { useContext, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ItemCounter } from "../../components/checkout/ItemCounter";
import Layout from "../../components/Layout/Layout";
import { CartContext } from "@/context";
import { IProductoCart } from "../../interfaces/producto";

const Cart = () => {
  const router = useRouter();
  const {
    isLoaded,
    cart,
    addProductToCart,
    updateCartQuantity,
    removeCartProduct,
    total,
    subtotal,
    tax,
  } = useContext(CartContext);
  const onNewCartQuantityValue = (
    product: IProductoCart,
    newQuantityValue: number
  ) => {
    product.cantidad = newQuantityValue;
    updateCartQuantity(product);
  };

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/vacio");
    }
  }, [isLoaded, cart, router]);

  return (
    <Layout title="Carrito" pageDescription="Pagina carrito">
      <div className="bg-[#FFF9EA] pt-4">
        <div className="mx-auto max-w-2xl px-4 pt-4 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Carrito de Compras
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              {cart.length == 0 ? (
                <h1 className="text-3xl font-semibold">
                  No hay items en el carrito
                </h1>
              ) : (
                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-t border-b border-gray-200"
                >
                  {cart.map((item: IProductoCart, itemIdx) => (
                    <li key={item.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div className="rounded-md object-cover object-center">
                          <Image
                            width={96}
                            height={96}
                            src={item.imagen}
                            alt={item.nombre}
                          />
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={item.nombre}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {item.nombre}
                                </a>
                              </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              ${item.precio}.00
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label
                              htmlFor={`quantity-${itemIdx}`}
                              className="sr-only"
                            >
                              Quantity, {item.nombre}
                            </label>

                            <ItemCounter
                              currentValue={item.cantidad}
                              maxValue={5}
                              updatedQuantity={(value) =>
                                onNewCartQuantityValue(
                                  item as IProductoCart,
                                  value
                                )
                              }
                            />
                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                className="inline-flex  py-2 text-gray-400 hover:text-gray-500"
                                onClick={() => removeCartProduct(item)}
                              >
                                <TrashIcon className="h-6 w-6 text-black" />
                                <span className="sr-only">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            {cart.length !== 0 && (
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-[#FFF9EA] px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Resumen de la Compra
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Impuesto</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${tax.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${total.toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <Link href="/checkout/resumen">
                    <button
                      type="button"
                      className="mt-4 inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-[#FFCB43] px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-[#FDD567]"
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              </section>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
