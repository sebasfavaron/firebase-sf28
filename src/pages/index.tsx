import { type NextPage } from "next";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//TODO: loading and error handling
//TODO: home button loads home
//TODO: page for custom scripting (maybe live edition like p5js, also maybe using other performant language beneath)
//TODO: package custom collections as a project and let the site be a portfolio
//TODO: and give auth a use
//TODO: tests
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <ToastContainer />
    </>
  );
};

export default Home;
