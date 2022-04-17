import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Header } from "~/components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
