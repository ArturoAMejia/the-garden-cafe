import { IUser } from "../../../interfaces/IUser";
import { IModulo } from "../../../interfaces/administracion/modulo";
import { Modulo } from "../../../interfaces/seguridad/rol-modulo";
import { AuthState } from "./AuthProvider";

type AuthActionType =
  | { type: "[Auth] - Login"; payload: IUser }
  | { type: "[Auth] - Logout" }
  | { type: "[Auth] - Obtener Modulos"; payload: Modulo[] };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case "[Auth] - Login":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "[Auth] - Logout":
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    case "[Auth] - Obtener Modulos":
      return {
        ...state,
        modulos: [...action.payload],
      };
    default:
      return state;
  }
};
