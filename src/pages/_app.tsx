import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { AdminProvider, AuthProvider, CartProvider } from "@/context";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <AdminProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </AdminProvider>
      </CartProvider>
    </AuthProvider>
  );
}
