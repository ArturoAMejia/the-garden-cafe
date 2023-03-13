export interface IMovimientoCaja {
  id: number;
  id_caja: number;
  id_trabajador: number;
  id_moneda: number;
  num_movimiento: string;
  fecha_movimiento: Date;
  concepto: string;
  monto: number;
}
