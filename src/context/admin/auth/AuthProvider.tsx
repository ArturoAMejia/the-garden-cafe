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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
