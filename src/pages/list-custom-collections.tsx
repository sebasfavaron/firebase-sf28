import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Button } from "../components/Button";
import type { CustomCollections } from "../helpers";
import { useCollectionsState } from "../helpers";

const Home: NextPage = () => {
  //TODO: fix hydration error when editing collections and refreshing
  const [customCollections, setCustomCollections] = useCollectionsState([]);
  const [collectionsInEditMode, setCollectionsInEditMode] = useState<string[]>(
    []
  );
  const isInEditMode = (name: string) => {
    return collectionsInEditMode.includes(name);
  };

  return (
    <>
      <Head>
        <title>List Custom Collections</title>
      </Head>
      <div className="flex w-5/6 flex-col">
        <div className="float-left mb-5 text-4xl">Custom Collections</div>
        {customCollections.map((customCollection, i) => {
          return (
            <div
              className="mb-5 flex rounded-lg border-2 border-black bg-slate-200 p-5 text-black"
              key={customCollection.collectionName + i}
            >
              <div>
                <div className="mb-2 text-2xl capitalize">
                  {customCollection.collectionName}
                </div>
                {
                  //TODO: make this an expandable accordeon
                  customCollection.tokens.map((token, i) => {
                    return (
                      <div key={token.token.name + i}>
                        {isInEditMode(customCollection.collectionName) && (
                          <button
                            className="mr-2"
                            onClick={() => {
                              setCustomCollections((): CustomCollections => {
                                return customCollections.map((collection) => ({
                                  collectionName: collection.collectionName,
                                  tokens: collection.tokens.filter(
                                    (collectionToken) =>
                                      collectionToken.token.name !==
                                      token.token.name
                                  ),
                                }));
                              });
                            }}
                          >
                            ❌
                          </button>
                        )}
                        {token.token.name}
                      </div>
                    );
                  })
                }
              </div>
              <div className="flex w-full justify-end">
                <Button
                  className="flex h-14 w-20 items-center justify-center self-center"
                  invertColor
                  onClick={() =>
                    setCustomCollections((customCollections) => {
                      return customCollections.filter(
                        (collection) =>
                          collection.collectionName !==
                          customCollection.collectionName
                      );
                    })
                  }
                >
                  Delete
                </Button>
                <Button
                  className="flex h-14 w-20 items-center justify-center self-center"
                  onClick={() => {
                    const isInEditMode = collectionsInEditMode.includes(
                      customCollection.collectionName
                    );
                    if (isInEditMode) {
                      setCollectionsInEditMode((collectionsInEditMode) =>
                        collectionsInEditMode.filter(
                          (collection) =>
                            collection !== customCollection.collectionName
                        )
                      );
                    } else {
                      setCollectionsInEditMode((collectionsInEditMode) => [
                        ...collectionsInEditMode,
                        customCollection.collectionName,
                      ]);
                    }
                  }}
                >
                  {isInEditMode(customCollection.collectionName)
                    ? "Save"
                    : "Edit"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
