import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { compraSlice } from "./slices/compra";
import { compraApi } from "./slices/compra/compraApi";

export function makeStore() {
  return configureStore({
    reducer: {
      compra: compraSlice.reducer,
      [compraApi.reducerPath]: compraApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(compraApi.middleware),
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
