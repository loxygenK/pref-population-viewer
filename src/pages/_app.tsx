import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Header } from "~/components/header";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>pref-population-viewer</title>
        <meta
          name="description"
          content="Visualize the history of the selected prefectures' populationo"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
