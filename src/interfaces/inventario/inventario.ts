export interface IInventario {
  id: number;
  id_producto: number;
  producto?: any
  stock_min: number;
  stock_max: number;
  stock_actual: number;
}
