export interface IProducto {
  id: number;
  nombre: string;
  descripcion: string;
  unidad_medida: string;
  precio: number;
  imagen: string;
  categoria: CategoriaProducto;
  cantidad: number;
}

export interface CategoriaProducto {
  id: number;
  nombre: string;
}

export interface IProductoCart {
  id: number;
  nombre: string;
  descripcion?: string;
  unidad_medida?: string;
  precio: number;
  imagen: string;
  categoria?: string;
  cantidad: number;
  cantidad_recepcionada?: number;
  id_estado?: number;
}
