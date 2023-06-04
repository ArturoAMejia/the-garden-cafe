import { createSlice } from "@reduxjs/toolkit";

interface CajaState {
  billete_cien: number;
  billete_cincuenta: number;
  billete_veinte: number;
  billete_diez: number;
  billete_cinco: number;
  billete_dos: number;
  billete_un: number;
  moneda_un_centavo: number;
  moneda_cinco_centavo: number;
  moneda_diez_centavo: number;
  moneda_veinticinco_centavo: number;
  moneda_cincuenta_centavo: number;
  total_billetes: number;
  total_monedas: number;
  total: number;
}
const initialState: CajaState = {
  billete_cien: 0,
  billete_cincuenta: 0,
  billete_veinte: 0,
  billete_diez: 0,
  billete_cinco: 0,
  billete_dos: 0,
  billete_un: 0,
  moneda_un_centavo: 0,
  moneda_cinco_centavo: 0,
  moneda_diez_centavo: 0,
  moneda_veinticinco_centavo: 0,
  moneda_cincuenta_centavo: 0,
  total_billetes: 0,
  total_monedas: 0,
  total: 0,
};

export const cajaSlice = createSlice({
  name: "cajaSlice",
  initialState,
  reducers: {
    actualizarBilleteCien: (state, action) => {
      state.billete_cien = action.payload;
      state.total_billetes = state.total_billetes + state.billete_cien * 100;
      state.total = state.total_billetes + state.total_monedas;
    },
    actualizarBilleteCincuenta: (state, action) => {
      state.billete_cincuenta = action.payload;
      state.total_billetes =
        state.total_billetes + state.billete_cincuenta * 50;
      state.total = state.total_billetes + state.total_monedas;
    },
    actualizarBilleteVeinte: (state, action) => {
      state.billete_veinte = action.payload;
      state.total_billetes = state.total_billetes + state.billete_veinte * 20;
      state.total = state.total_billetes + state.total_monedas;
    },
    actualizarBilleteDiez: (state, action) => {
      state.billete_diez = action.payload;
      state.total_billetes = state.total_billetes + state.billete_diez * 10;
    },
    actualizarBilleteCinco: (state, action) => {
      state.billete_cinco = action.payload;
      state.total_billetes = state.total_billetes + state.billete_cinco * 5;
    },
    actualizarBilleteDos: (state, action) => {
      state.billete_dos = action.payload;
      state.total_billetes = state.total_billetes + state.billete_dos * 2;
    },
    actualizarBilleteUn: (state, action) => {
      state.billete_un = action.payload;
      state.total_billetes = state.total_billetes + state.billete_un * 1;
    },
    actualizarMonedaUnCentavo: (state, action) => {
      state.moneda_un_centavo = action.payload;
      state.total_monedas =
        state.total_monedas + state.moneda_un_centavo * 0.01;
      state.total = state.total_billetes + state.total_monedas;
    },
    actualizarMonedaCincoCentavo: (state, action) => {
      state.moneda_cinco_centavo = action.payload;
      state.total_monedas = state.total_monedas =
        state.total_monedas + state.moneda_cinco_centavo * 0.05;
      state.total = state.total_billetes + state.total_monedas;
    },
    actualizarMonedaDiezCentavo: (state, action) => {
      state.moneda_diez_centavo = action.payload;
      state.total_monedas = state.total_monedas =
        state.total_monedas + state.moneda_diez_centavo * 0.1;
      state.total = state.total_billetes + state.total_monedas;
    },
    actualizarMonedaVeinticincoCentavo: (state, action) => {
      state.moneda_veinticinco_centavo = action.payload;
      state.total_monedas = state.total_monedas =
        state.total_monedas + state.moneda_veinticinco_centavo * 0.25;
      state.total = state.total_billetes + state.total_monedas;
    },
    actualizarMonedaCincuentaCentavo: (state, action) => {
      state.moneda_cincuenta_centavo = action.payload;
      state.total_monedas = state.total_monedas =
        state.total_monedas + state.moneda_cincuenta_centavo * 0.5;
      state.total = state.total_billetes + state.total_monedas;
    },
  },
});

export const {
  actualizarBilleteCien,
  actualizarBilleteCincuenta,
  actualizarBilleteVeinte,
  actualizarBilleteDiez,
  actualizarBilleteCinco,
  actualizarBilleteDos,
  actualizarBilleteUn,
  actualizarMonedaUnCentavo,
  actualizarMonedaCincoCentavo,
  actualizarMonedaDiezCentavo,
  actualizarMonedaVeinticincoCentavo,
  actualizarMonedaCincuentaCentavo,
} = cajaSlice.actions;
