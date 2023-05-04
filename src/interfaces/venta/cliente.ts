import { ICatEstado } from "./../general/estado";
import { IPersona } from "./../general/persona";
export interface ICliente {
  id: number;
  id_persona: number;
  persona?: IPersona;
  id_estado: number;
  cat_estado?: ICatEstado;
  genero: string;
  tipo_cliente: string;
}
