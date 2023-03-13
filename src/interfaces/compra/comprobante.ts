

export interface IComprobante {
  id: number;
  descripcion: string;
  numeracion: string;
  serie: string;
  id_estado: number;
  fecha_ingreso: Date;
}