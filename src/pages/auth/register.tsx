import React, { useContext, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { AuthContext } from "@/context";

import { toast } from "react-hot-toast";
import { Error } from "../../components/landing/Error";

import { useForm } from "react-hook-form";
import { getSession, signIn } from "next-auth/react";

type FormData = {
  nombre: string;
  tipo_persona: string;
  num_cedula: string;
  direccion: string;
  apellido: string;
  username: string;
  password: string;
  confirmacion_password: string;
  fecha_nacimiento_constitucion: Date;
};

const RegisterPage = () => {
  const router = useRouter();
  const { registerUser, loginUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegiserUser = async ({
    nombre,
    tipo_persona,
    num_cedula,
    direccion,
    apellido,
    username,
    password,
    confirmacion_password,
    fecha_nacimiento_constitucion,
  }: FormData) => {
    setShowError(false);
    const { hasError, message = "" } = await registerUser(
      nombre,
      tipo_persona,
      num_cedula,
      direccion,
      apellido,
      username,
      password,
      confirmacion_password,
      fecha_nacimiento_constitucion
    );

    if (hasError) {
      setError(message);
      setShowError(true);
      return;
    }

    await signIn("credentials", { username, password });

    // if (!isValidLogin) {
    //   setShowError(true);
    //   return;
    // }

    // toast.success("Cuenta creada satisfactoriamente");
    // router.replace("/");
  };
  return (
    <>
      <Head>
        <title>Registrate Ya!</title>
        <link rel="shortcut icon" href="logo.svg" type="image/x-icon" />
        <meta name="description" content="Página de Registro" />
      </Head>
      <section className="font-serif bg-[#FFF9EA]">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              layout="fill"
              alt="Night"
              src="/img/blog/bg.jpeg"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="left-80 mb-4 ml-96 hidden lg:relative lg:block lg:p-12">
              <Link className="block text-white" href="/">
                <Image layout="fill" src="/logo.svg" alt="logo empresa" />
              </Link>
            </div>
          </section>
          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <div className="sm:-mt-18 relative block lg:hidden">
                <Link
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                  href="/"
                >
                  <Image
                    width={56}
                    height={56}
                    src="/logo.svg"
                    alt="logo-empresa"
                  />
                </Link>
                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Bienvenidos a The Garden Cafe
                </h1>
                <p className="mt-4 leading-relaxed text-gray-500">
                  Registrate a The Garden Café para realizar tus pedidos y
                  reservaciones!
                </p>
              </div>
              <h1 className="mt-6 text-center text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Crea tu cuenta
              </h1>
              <form
                onSubmit={handleSubmit(onRegiserUser)}
                className="mt-8 grid gap-6 sm:grid-cols-9"
              >
                <div className="col-span-8 sm:col-span-3">
                  <label
                    htmlFor="num_cedula"
                    className="text-md block font-medium text-gray-700"
                  >
                    Número de cédula o Número RUC
                  </label>
                  <input
                    type="text"
                    id="num_cedula"
                    required
                    title="Debe poner 8 números y una letra"
                    className="text-md mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
                    {...register("num_cedula", {
                      required: "Este campo es requerido",
                    })}
                  />
                </div>
                <div className="col-span-8 sm:col-span-3">
                  <label
                    htmlFor="tipo_persona"
                    className="text-md block font-medium text-gray-700"
                  >
                    Tipo de Persona
                  </label>
                  <select
                    id="tipo_persona"
                    className="sm:text-md mt-6 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    defaultValue="Natural"
                    {...register("tipo_persona")}
                  >
                    <option value="Natural">Natural</option>
                    <option value="Juridica">Juridica</option>
                  </select>
                </div>
                <div className="col-span-8 sm:col-span-3">
                  <label
                    htmlFor="direccion"
                    className="text-md block font-medium text-gray-700"
                  >
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    className="text-md mt-6 w-full rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
                    {...register("direccion", {
                      required: "Este campo es requerido",
                    })}
                  />
                </div>
                <div className="col-span-8 sm:col-span-3">
                  <label
                    htmlFor="nombre"
                    className="text-md block font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="text-md mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
                    {...register("nombre", {
                      required: "Este campo es requerido",
                    })}
                  />
                </div>
                <div className="col-span-8 sm:col-span-3">
                  <label
                    htmlFor="apellido"
                    className="text-md block font-medium text-gray-700"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    className="text-md mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
                    {...register("apellido", {
                      required: "Este campo es requerido",
                    })}
                  />
                </div>
                <div className="col-span-8 sm:col-span-3">
                  <label
                    htmlFor="correo"
                    className="text-md block font-medium text-gray-700"
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    id="correo"
                    className="text-md mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
                    {...register("username", {
                      required: "Este campo es requerido",
                    })}
                  />
                </div>
                <div className="col-span-8 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="text-md block font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="text-md mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
                    {...register("password", {
                      required: "Este campo es requerido",
                    })}
                  />
                </div>
                <div className="col-span-8 sm:col-span-3">
                  <label
                    htmlFor="confirmacion_password"
                    className="text-md block font-medium text-gray-700"
                  >
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmacion_password"
                    className="text-md mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
                    {...register("confirmacion_password", {
                      required: "Este campo es requerido",
                    })}
                  />
                </div>
                <div className="col-span-8 sm:col-span-3">
                  <label
                    htmlFor="fecha_nacimiento_constitucion"
                    className="text-md block font-medium text-gray-700"
                  >
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    id="fecha_nacimiento_constitucion"
                    className="text-md mt-1 w-full rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
                    {...register("fecha_nacimiento_constitucion", {
                      required: "Este campo es requerido",
                      valueAsDate: true,
                    })}
                  />
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="text-md inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Crear cuenta
                  </button>
                  <p className="text-md mt-4 text-gray-500 sm:mt-0">
                    ¿Ya tienes una cuenta?
                    <Link
                      href="/auth/login"
                      className="ml-1 text-gray-700 underline"
                    >
                      Inicia Sesión
                    </Link>
                  </p>
                </div>
              </form>
              <div className="mt-4">
                {showError && <Error error={error} />}
                {errors.username && <Error error={errors.username.message} />}
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

import { GetServerSideProps } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
