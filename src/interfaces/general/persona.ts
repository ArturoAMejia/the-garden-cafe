import { IUsuario } from "../seguridad";

export interface IPersona {
  id: number;
  nombre: string;
  apellido_razon_social: string;
  cedula_ruc: string;
  telefono: string;
  direccion_domicilio: string;
  correo: string;
  fecha_nacimiento_constitucion: Date;
  fecha_registro: Date;
  tipo_persona: string;
  usuario?: IUsuario;
}
