import {
  BookmarkIcon,
  CheckCircleIcon,
  CreditCardIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import Layout from "../../components/Layout/Layout";
import { CartContext } from "../../context/landing/cart";
import { RadioGroup } from "@headlessui/react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import tgcApi from "../../api/tgcApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const paymentMethods = [
  { id: "credit-card", title: "Tarjeta de Crédito" },
  { id: "efectivo", title: "Pago en efectivo" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type FormData = {
  nombre: string;
  apellido_razon_social: string;
  correo: string;
  telefono: string;
  direccion_domicilio: string;
  tipo_pedido: string;
  metodo_pago: string;
};

const ResumenPage = () => {
  const router = useRouter();
  const {
    cart,
    numberOfItems,
    subtotal,
    tax,
    total,
    removeCartProduct,
    orderComplete,
  } = useContext(CartContext);
  const tipoPedido = [
    {
      id: 1,
      title: "Recoger",
      price: total * 0.1,
    },
    {
      id: 2,
      title: "Entrega a domicilio",
      price: total * 0.2,
    },
  ];
  const [tipoPedidoSeleccionado, settipoPedidoSeleccionado] = useState(
    tipoPedido[0]
  );

  console.log(tipoPedidoSeleccionado);

  const prod = cart.map((pro) => {
    return {
      ...pro,
    };
  });

  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] =
    useState("Tarjeta de Crédito");

  useEffect(() => {
    metodoPagoSeleccionado;
  }, [metodoPagoSeleccionado]);

  const { register, handleSubmit, reset, getValues } = useForm<FormData>();

  const { data: session } = useSession();

  const onRegisterPedido = async () => {
    const pedido: any = {
      id_usuario: session.user!.id,
      correo: getValues("correo"),
      tipo_pedido: tipoPedidoSeleccionado.title,
      ubicacion_entrega: getValues("direccion_domicilio"),
      tipo_venta: getValues("metodo_pago"),
      subtotal: subtotal,
      descuento: 0,
      impuesto: tax,
      total: Number(total.toFixed(2)),
      numeroItems: numberOfItems,
      productos: cart,
    };

    try {
      const res = await tgcApi({
        url: "api/pedido",
        method: "POST",
        data: pedido,
      });
      reset();
      toast.success("Orden realizada correctamente");
      orderComplete();
      Cookies.remove("cart");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {}
  };

  const stripeLoad = loadStripe(
    "pk_test_51M1sUEAvf9P66pBpCznTrXHbgEuvoUYWwUSBuszpmslDO6ryyGoSbbk1O4ovGl6pmxBlyjTOP2NZT7ACJn6TnZah00I1eMnbLC"
  );

  return (
    <Layout title="Checkout" pageDescription="Pagina de checkout">
      <div className="bg-[#FFF9EA]">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Checkout</h2>

          <form
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
            onSubmit={handleSubmit(onRegisterPedido)}
          >
            <div>
              <div className="mborder-t border-gray-200">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="h-6 w-6 text-black" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Información de Envío
                  </h2>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="nombre"
                        required
                        defaultValue={session?.user.nombre}
                        {...register("nombre", {
                          required: true,
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="apellido"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apellido
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="apellido"
                        defaultValue={session?.user.apellido}
                        {...register("apellido_razon_social", {
                          required: true,
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="email-direccion"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="correo"
                        value={session?.user.email}
                        {...register("correo", {
                          required: true,
                        })}
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="email-direccion"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Telefóno
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        id="telefono"
                        {...register("telefono", {
                          required: true,
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="direccion"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dirección
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="direccion"
                        {...register("direccion_domicilio", {
                          required: true,
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup
                  value={tipoPedidoSeleccionado}
                  onChange={settipoPedidoSeleccionado}
                >
                  <RadioGroup.Label className="flex items-center gap-2 text-lg font-medium text-gray-900">
                    <BookmarkIcon className="h-6 w-6 text-black" />

                    <p>Tipo de Pedido</p>
                  </RadioGroup.Label>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {tipoPedido.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? "border-transparent" : "border-gray-300",
                            active ? "ring-2 ring-indigo-500" : "",
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <div className="flex flex-1">
                              <div className="flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-2 text-sm font-bold text-gray-900"
                                >
                                  ${deliveryMethod.price}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked ? (
                              <CheckCircleIcon
                                className="h-5 w-5 text-indigo-600"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Payment */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="h-6 w-6 text-black" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Método de pago
                  </h2>
                </div>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                      <div key={paymentMethod.id} className="flex items-center">
                        {paymentMethodIdx === 0 ? (
                          <input
                            id={paymentMethod.title}
                            value={paymentMethod.title}
                            type="radio"
                            defaultChecked
                            defaultValue={paymentMethod.title}
                            //onClick={() => setMetodoPagoSeleccionado(paymentMethod.title)}
                            {...register("metodo_pago")}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        ) : (
                          <input
                            id={paymentMethod.title}
                            type="radio"
                            value={paymentMethod.title}
                            onClick={() => console.log(paymentMethod)}
                            {...register("metodo_pago")}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        )}

                        <label
                          htmlFor={paymentMethod.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                {/* TODO: Agregar botones de pago de PayPal */}
                {getValues("metodo_pago") === "Tarjeta de Crédito" ? (
                  <Elements stripe={stripeLoad}>
                    <div className="mt-4 bg-gray-50 p-4">
                      <CardElement className="p-2" />
                    </div>
                  </Elements>
                ) : null}
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Resumen de la orden
              </h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-[#FFF9EA] shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {cart.map((product) => (
                    <li key={product.id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <Image
                          width={80}
                          height={60}
                          src={product.imagen}
                          alt={product.nombre}
                          className="w-20 rounded-md"
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a
                                href={product.nombre}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.nombre}
                              </a>
                            </h4>
                            <p className="mt-1 text-sm capitalize text-gray-500">
                              {product.categoria}
                            </p>
                            <p className="mt-1 text-sm capitalize text-gray-500">
                              {product.unidad_medida}
                            </p>
                          </div>

                          <div className="ml-4 flow-root flex-shrink-0">
                            <button
                              type="button"
                              className="-m-2.5 flex items-center justify-center p-2.5 text-black hover:text-gray-500"
                              onClick={() => removeCartProduct(product)}
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium capitalize text-gray-900">
                            ${product.precio.toFixed(2)}
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <p>Unidades: {product.cantidad}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-[#FFCB43] py-6 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      $ {subtotal}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Descuento</dt>
                    <dd className="text-sm font-medium text-gray-900">0</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Impuestos</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      $ {tax.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#FFCB43] pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      $ {`${total + tipoPedidoSeleccionado.price}`}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-[#FFCB43] py-6 px-4 sm:px-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-[#FFCB43] py-3 px-4 text-base font-medium text-black shadow-sm hover:bg-[#FDD567] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirmar orden
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResumenPage;
