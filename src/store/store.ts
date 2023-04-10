import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { compraApi, compraSlice } from "./slices/compra";
import { ventaApi } from "./slices/venta";
import { inventarioApi } from "./slices/inventario";
import { pedidoSlice } from "./slices/pedido/pedidoSlice";
import { catalogosApi } from "./slices/catalogos";
import { authApi } from "./slices/auth";
import { pedidoApi } from "./slices/pedido";

export function makeStore() {
  return configureStore({
    reducer: {
      // ! API Reducers
      [compraApi.reducerPath]: compraApi.reducer,
      [ventaApi.reducerPath]: ventaApi.reducer,
      [inventarioApi.reducerPath]: inventarioApi.reducer,
      [catalogosApi.reducerPath]: catalogosApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [pedidoApi.reducerPath]: pedidoApi.reducer,
      // ! Slice Reducers
      pedido: pedidoSlice.reducer,
      compra: compraSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        compraApi.middleware,
        ventaApi.middleware,
        inventarioApi.middleware,
        catalogosApi.middleware,
        authApi.middleware,
        pedidoApi.middleware,
      ]),
  });
}

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
