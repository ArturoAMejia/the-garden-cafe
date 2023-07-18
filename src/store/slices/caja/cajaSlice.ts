import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Billete {
  denominacion: number;
  cantidad: number;
}
export interface Moneda {
  denominacion: number;
  cantidad: number;
}

interface ArqueoState {
  billetes: Billete[];
  monedas: Moneda[];
  total: number;
  total_monedas: number;
  total_billetes_cordobas: number;
}

const initialState: ArqueoState = {
  billetes: [],
  monedas: [],
  total: 0,
  total_monedas: 0,
  total_billetes_cordobas: 0,
};

export const cajaSlice = createSlice({
  name: "cajaSlice",
  initialState,
  reducers: {
    actualizarBilleteCordobas: (state, action: PayloadAction<Billete>) => {
      const { denominacion, cantidad } = action.payload;
      const billeteIndex = state.billetes.findIndex(
        (billete) => billete.denominacion === denominacion
      );

      if (billeteIndex !== -1) {
        // El billete existe, actualiza la cantidad
        state.billetes[billeteIndex].cantidad = cantidad;
      } else {
        // El billete no existe, agrégalo al array
        state.billetes.push({ denominacion, cantidad });
      }
      const total_billetes = state.billetes.reduce(
        (acc, billete) => acc + billete.denominacion * billete.cantidad,
        0
      );
      const total_monedas = state.monedas.reduce(
        (acc, monedas) => acc + monedas.denominacion * monedas.cantidad,
        0
      );
      state.total_billetes_cordobas = total_billetes;
      state.total = total_monedas + total_billetes;
    },
    actualizarMonedas: (state, action: PayloadAction<Moneda>) => {
      const { denominacion, cantidad } = action.payload;
      const monedasIndex = state.monedas.findIndex(
        (monedas) => monedas.denominacion === denominacion
      );

      if (monedasIndex !== -1) {
        // El monedas existe, actualiza la cantidad
        state.monedas[monedasIndex].cantidad = cantidad;
      } else {
        // El monedas no existe, agrégalo al array
        state.monedas.push({ denominacion, cantidad });
      }
      const total_monedas = state.monedas.reduce(
        (acc, monedas) => acc + monedas.denominacion * monedas.cantidad,
        0
      );
      const total_billetes = state.billetes.reduce(
        (acc, billete) => acc + billete.denominacion * billete.cantidad,
        0
      );
      state.total_monedas = total_monedas;
      state.total = total_monedas + total_billetes;
    },
  },
});

export const { actualizarBilleteCordobas, actualizarMonedas } =
  cajaSlice.actions;
