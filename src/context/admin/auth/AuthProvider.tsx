import { FC, PropsWithChildren, useEffect, useReducer, useState } from "react";
import tgcApi from "../../../api/tgcApi";
import Cookies from "js-cookie";
import { IUser } from "../../../interfaces/IUser";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import axios from "axios";
import { useRouter } from "next/router";
import { IModulo } from "../../../interfaces/administracion/modulo";
import { Modulo } from "../../../interfaces/seguridad/rol-modulo";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
  modulos: Modulo[];
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  modulos: [],
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const { data } = await tgcApi.get("api/user/validate-token");
      const { token, user, modulos } = data;
      Cookies.set("token", token);
      Cookies.set("modulos", JSON.parse(JSON.stringify(modulos)));
      dispatch({ type: "[Auth] - Login", payload: user });
      dispatch({ type: "[Auth] - Obtener Modulos", payload: modulos });

    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tgcApi.post("api/user/login", {
        username,
        password,
      });
      const { token, user, modulos } = data;
      Cookies.set("token", token);
      Cookies.set("num_cedula_ruc", user.cedula_no_ruc);
      Cookies.set("rol", user.rol.nombre);
      Cookies.set("test", "test");
      Cookies.set("modulos", JSON.parse(JSON.stringify(modulos)));
      Cookies.set("correo", user.correo);
      Cookies.set("nombre", user.nombre);
      Cookies.set("apellido", user.apellido_razon_social);
      Cookies.set("direccion", user.direccion_domicilio);
      dispatch({ type: "[Auth] - Login", payload: user });
      dispatch({ type: "[Auth] - Obtener Modulos", payload: modulos });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    nombre: string,
    tipo_persona: string,
    num_cedula: string,
    direccion: string,
    apellido: string,
    username: string,
    password: string,
    confirmacion_password: string,
    fecha_nacimiento_constitucion: Date
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tgcApi.post("api/user/register", {
        nombre,
        tipo_persona,
        num_cedula,
        direccion,
        apellido_razon_social: apellido,
        username,
        password,
        confirmacion_password,
        fecha_nacimiento_constitucion,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("grupo");
    router.push("/");
    dispatch({ type: "[Auth] - Logout" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
