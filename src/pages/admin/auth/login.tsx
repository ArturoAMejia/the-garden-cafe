import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Error } from "../../../components/landing/Error";
import { AuthContext } from "../../../context";

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

    const isValidLogin = await loginUser(username, password);

    if (!isValidLogin) {
      setShowError(true);
      return;
    }

    // Todo: navegar a la pantalla que el usuario estaba
    router.replace("/admin");
  };
  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundImage: 'url("/img/blog/bg.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/4 bg-zinc-900 opacity-90 rounded-lg">
        <div className="opacity-100">
          <h2 className="text-2xl font-bold text-center text-white ">SCVPI</h2>
          <p className="text-xl font-bold text-center text-white">
            Iniciar Sesión
          </p>
          <form onSubmit={handleSubmit(onLoginUser)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-white "
                htmlFor="username"
              >
                Usuario
              </label>
              <input
                id="username"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                {...register("username", {
                  required: "Este campo es requerido",
                })}
              />
                      {showError && (
               <Error error='Credenciales no válidas'/>
              )}
              {errors.username && <Error error={errors.username.message} />}
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-white"
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
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
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
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
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
