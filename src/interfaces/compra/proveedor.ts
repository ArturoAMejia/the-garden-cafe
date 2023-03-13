import { ICatEstado } from './../general/estado';
import { IPersona } from './../general/persona';
export interface IProveedor {
  id: number;
  id_persona: number;
  persona?: IPersona;
  id_estado: number;
  cat_estado?: ICatEstado
  sector_comercial: string;
  nacionalidad: string;
}

export interface IContactoProveedor {
  id: number;
  id_proveedor: number;
  telefono: string;
  celular: string;
  direccion: string;
}
