import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "../styles/tailwind.css";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
