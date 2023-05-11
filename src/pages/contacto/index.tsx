import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type FormData = {
  nombre: string;
  correo: string;
  telefono: number;
  mensaje: string;
};

const Contacto = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onFormSubmit = () => {
    reset();
    toast.success("Mensaje enviado correctamente.")
  };

  return (
    <Layout
      title="Contacto - The Garden Cafe"
      pageDescription="Página de contacto"
    >
      <div className="relative bg-[#FFF9EA]">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-[#FFF9EA]" />
        </div>
        <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
          <div className="bg-[#FFF9EA] py-12 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-12 xl:pr-4">
            <div className="mx-auto max-w-lg">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Contáctanos
              </h2>
              <p className="my-6 text-lg leading-6 text-gray-500">
                Estamos aquí para ayudarte con necesidades especificas en tus
                alimentos, menú de grupo o reservación.
              </p>

              <iframe
                className="w-full "
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15614.522797703088!2d-85.9524433!3d11.9307688!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3dd7db604132cab8!2sThe%20Garden%20Cafe!5e0!3m2!1ses!2sni!4v1667016388091!5m2!1ses!2sni"
                width={600}
                height={450}
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <dl className="mt-8 text-base text-gray-500">
                <div>
                  <dt className="sr-only">Postal address</dt>
                  <dd className="flex items-start justify-center gap-1.5 pl-6 sm:justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="pl-2">
                      Calle Libertad, C. Cervantes, Granada
                    </p>
                  </dd>
                </div>
                <div className="mt-3">
                  <dt className="sr-only">Número de telefóno</dt>
                  <dd className="flex pl-6">
                    <PhoneIcon
                      className="h-6 w-6 flex-shrink-0 text-black"
                      aria-hidden="true"
                    />
                    <span className="ml-3">2552-8582</span>
                  </dd>
                </div>
                <div className="mt-3">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex pl-6">
                    <EnvelopeIcon
                      className="h-6 w-6 flex-shrink-0 text-black"
                      aria-hidden="true"
                    />
                    <span className="ml-3">elgardecafe@gmail.com</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className=" bg-[#FFF9EA] px-8 pt-28 lg:col-span-3 lg:px-12">
            <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
              <div>
                <label className="sr-only" htmlFor="name">
                  Nombre
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Nombre"
                  type="text"
                  id="name"
                  {...register("nombre")}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="ejemplo@ejemplo.com"
                    type="email"
                    id="email"
                    {...register("correo")}
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="phone">
                    Telefóno
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="88119900"
                    type="tel"
                    id="phone"
                    {...register("telefono")}
                  />
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Mensaje"
                  rows={8}
                  id="message"
                  defaultValue={""}
                  {...register("mensaje")}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#FFCB43] px-5 py-3 text-black sm:w-auto"
                >
                  <span className="font-medium"> Enviar </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacto;
