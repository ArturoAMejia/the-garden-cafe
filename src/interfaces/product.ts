export interface IProduct {
  id: number;
  nombre: string;
  id_categoria: number;
  descripcion: string;
  unidad_medida: string;
  precio: number;
}

export interface IProductCart {
  id: string;
  nombre: string;
  id_categoria: number;
  descripcion: string;
  unidad_medida: string;
  precio: number;
  cantidad: number;
}

export interface IProductoAPI{
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  unidad_medida: string;
  categoria: {
      nombre: string;
  };
}

export interface ICategoriaProdcuto {
  id : number;
  nombre: string;
  created_at?: Date;
  updated_at?: Date;
}