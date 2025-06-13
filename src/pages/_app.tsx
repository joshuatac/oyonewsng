import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import RouteChangeLoader from "@/components/RouteChangeLoader";
import Layout from "@/components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RouteChangeLoader />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
