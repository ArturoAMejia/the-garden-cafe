import { IOrdenCompra } from "@/interfaces";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define el tipo de valor que tiene el state
interface CompraState {
  tipos_orden_compra: [];
  solicitudes_compra: [];
  ordenes_compra: IOrdenCompra[];
  compras: [];
  prueba: string;
}

const initialState: CompraState = {
  tipos_orden_compra: [],
  solicitudes_compra: [],
  ordenes_compra: [],
  compras: [],
  prueba: "Holaaaa",
}



export const compraSlice = createSlice({
  name: "compra",
  initialState,
  reducers: {
    obtenerOrdenes: (state, action: PayloadAction<IOrdenCompra[]>) => {
      state.ordenes_compra = action.payload;
    },
  },
});

export const { obtenerOrdenes } = compraSlice.actions;
