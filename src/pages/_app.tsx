import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import "@/styles/globals.css";
import { AdminProvider, AuthProvider, CartProvider } from "@/context";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <CartProvider>
          <AdminProvider>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </AdminProvider>
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
