import { type NextPage } from "next";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCustomCollections from "../components/CreateCustomCollections";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Custom Collection</title>
      </Head>
      <CreateCustomCollections />
      <ToastContainer />
    </>
  );
};

export default Home;
