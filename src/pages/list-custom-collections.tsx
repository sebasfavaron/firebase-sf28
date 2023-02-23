import { type NextPage } from "next";
import Head from "next/head";
import CustomCollectionList from "../components/CustomCollectionsList";
import NoSSR from "../components/NoSSR";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>List Custom Collections</title>
      </Head>
      <div className="flex w-5/6 flex-col">
        <NoSSR>
          <CustomCollectionList />
        </NoSSR>
      </div>
    </>
  );
};

export default Home;
