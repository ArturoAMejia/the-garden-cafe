export interface ICatEstado {
  id: number;
  id_categoria_estado: number;
  categoria_estado?: ICategoriaEstado;
  nombre: string;
  descripcion: string;
}

export interface ICategoriaEstado {
  id: number;
  nombre: string;
}