import { type NextPage } from "next";
import Head from "next/head";
import { useCollectionsState } from "../helpers";

const Home: NextPage = () => {
  const [customCollections] = useCollectionsState([]);

  return (
    <>
      <Head>
        <title>List Custom Collections</title>
      </Head>
      {customCollections.map((customCollection, i) => {
        return (
          <div
            className="mb-5 capitalize"
            key={customCollection.collectionName + i}
          >
            <div className="text-3xl">{customCollection.collectionName}</div>
            {customCollection.tokens.map((token, i) => {
              return <div key={token.token.name + i}>{token.token.name}</div>;
            })}
          </div>
        );
      })}
    </>
  );
};

export default Home;
