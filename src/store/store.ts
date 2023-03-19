import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { compraApi } from "./slices/compra";
import { ventaApi } from "./slices/venta";
import { inventarioApi } from "./slices/inventario";

export function makeStore() {
  return configureStore({
    reducer: {
      [compraApi.reducerPath]: compraApi.reducer,
      [ventaApi.reducerPath]: ventaApi.reducer,
      [inventarioApi.reducerPath]: inventarioApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        compraApi.middleware,
        ventaApi.middleware,
        inventarioApi.middleware,
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
