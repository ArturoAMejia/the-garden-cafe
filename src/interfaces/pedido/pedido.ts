import { ICatEstado } from "./../general/estado";
import { ITrabajador } from "./../administracion/trabajador";
import { ICliente } from "./../venta/cliente";

import { IProducto } from "../inventario";
import { IProductoCart } from "../producto";

export interface IPedido {
  id: number;
  id_cliente: number;
  id_usuario?: number;
  cliente?: ICliente;
  id_trabajador: number;
  trabajador?: ITrabajador;
  id_estado: number;
  cat_estado?: ICatEstado;
  tipo_pedido: string;
  fecha_pedido: Date;
  ubicacion_entrega: string;
  observacion: string;
  vigencia: Date;
  productos?: IProducto[] | IProductoCart[];
  detalle_pedido?: any;
}
