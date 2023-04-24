import { useForm } from "react-hook-form";
import { Error } from "../../components/landing/Error";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AuthContext } from "@/context";
import { useContext, useState } from "react";
import { getSession, signIn } from "next-auth/react";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);

  if (isLoggedIn) router.replace("/");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ username, password }: FormData) => {
    setShowError(false);

    // const isValidLogin = await loginUser(username, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   return;
    // }

    // // Todo: navegar a la pantalla que el usuario estaba
    // const destination = router.query.p?.toString() || "/";
    // router.replace("/");
    await signIn("credentials", {
      username,
      password,
    });
  };

  return (
    <>
      <Head>
        <title>Inicio de Sesión</title>
        <link rel="shortcut icon" href="logo.svg" type="image/x-icon" />
        <meta name="description" content="Página de inicio de sesión" />
      </Head>
      <section className="bg-[#FFF9EA]">
        <div className="h-screen lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              layout="fill"
              alt="Pattern"
              src="/img/image1.jpeg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>
          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <Link className="block text-blue-600" href="/">
                <Image width={56} height={56} src="/logo.svg" alt="logo" />
              </Link>
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Bienvenidos a The Garden Cafe
              </h1>
              <form onSubmit={handleSubmit(onLoginUser)} className="mt-8 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="usuario"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    className="mt-1 mb-4 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    {...register("username", {
                      required: "Este campo es requerido",
                    })}
                  />

                  {showError && <Error error="Credenciales no válidas" />}
                  {errors.username && <Error error={errors.username.message} />}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="contraseña"
                    className="block text-sm font-medium text-gray-700 "
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contraseña"
                    className="my-4 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    {...register("password", {
                      required: "Este campo es requerido",
                      minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    })}
                  />
                  {errors.password && <Error error={errors.password.message} />}
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Iniciar Sesión
                  </button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    ¿No tienes una cuenta?
                    <Link
                      href="/auth/register"
                      className="ml-1 text-gray-700 underline"
                    >
                      Registrate!
                    </Link>
                  </p>
                </div>
              </form>
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

export default Login;
