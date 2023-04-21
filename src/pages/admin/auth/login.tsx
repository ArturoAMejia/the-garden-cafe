import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Error } from "../../../components/landing/Error";
import { AuthContext } from "../../../context";
import { signIn } from "next-auth/react";

type FormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { loginUser, isLoggedIn } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);

  if (isLoggedIn) router.replace("/admin");

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

    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/admin",
    });

    // Todo: navegar a la pantalla que el usuario estaba
    router.replace("/admin");
  };
  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        backgroundImage: 'url("/img/blog/bg.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full rounded-lg bg-zinc-900 px-6 py-8 opacity-90 md:px-8 lg:w-1/4">
        <div className="opacity-100">
          <h2 className="text-center text-2xl font-bold text-white ">SCVPI</h2>
          <p className="text-center text-xl font-bold text-white">
            Iniciar Sesión
          </p>
          <form onSubmit={handleSubmit(onLoginUser)}>
            <div className="mt-4">
              <label
                className="mb-2 block text-sm font-medium text-white "
                htmlFor="username"
              >
                Usuario
              </label>
              <input
                id="username"
                className="block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                type="text"
                {...register("username", {
                  required: "Este campo es requerido",
                })}
              />
              {showError && <Error error="Credenciales no válidas" />}
              {errors.username && <Error error={errors.username.message} />}
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="mb-2 block text-sm font-medium text-white"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <a href="#" className="text-xs text-gray-500 hover:underline">
                  Forget Password?
                </a>
              </div>
              <input
                id="password"
                className="block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                type="password"
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                })}
                onError={() => errors.username}
              />
              {errors.password && <Error error={errors.password.message} />}
            </div>
            <div className="mt-8">
              <button
                className="w-full transform rounded bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-300 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                type="submit"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
