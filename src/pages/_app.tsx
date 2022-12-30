import { type AppType } from "next/dist/shared/lib/utils";

import Head from "next/head";
import { Layout } from "../components/Layout";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>NFT Collections</title>
        <meta name="description" content="NFT Collection Creator" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
