import { createContext } from "react";
import {
  IUser,
  IReservacion,
  IProducto,
  ICategoriaProducto,
} from "../../../interfaces";
import { IModulo } from "../../../interfaces/administracion/modulo";
import { Modulo } from "../../../interfaces/seguridad/rol-modulo";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  loginUser: (username: string, password: string) => Promise<boolean>;
  modulos: Modulo[] | any;
  registerUser: (
    nombre: string,
    num_cedula: string,
    apellido: string,
    username: string,
    password: string,
    tipo_persona: string,
    direccion: string,
    confirmacion_password: string,
    fecha_nacimiento_constitucion: Date
  ) => Promise<{
    hasError: boolean;
    message?: string | undefined;
  }>;
  logout: () => void;
}

export const AuthContext = createContext<ContextProps>({} as ContextProps);
