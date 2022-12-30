import { DndContext } from "@dnd-kit/core";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../components/Button";
import { Draggable } from "../components/Draggable";
import Dropdown from "../components/Dropdown";
import { Droppable } from "../components/Droppable";
import type { Collection, Collections, Token, Tokens } from "../helpers";
import { useCollectionsState } from "../helpers";

//TODO: loading and error handling
//TODO: tests
const Home: NextPage = () => {
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [customCollectionName, setCustomCollectionName] = useState<string>("");
  const [customCollectionList, setCustomCollectionList] = useState<Token[]>([]);
  const [customCollections, setCustomCollections] = useCollectionsState([]);

  const {
    data: collectionsList,
    isLoading: isCollectionListLoading,
    isError: isCollectionListError,
  } = useQuery({
    queryKey: ["collectionList"],
    queryFn: (): Promise<Collections> =>
      fetch(
        `${process.env.NEXT_PUBLIC_NFT_API}/collections/v5?includeTopBid=false&normalizeRoyalties=false&useNonFlaggedFloorAsk=false&sortBy=allTimeVolume&limit=20`
      ).then((res) => res.json()),
    placeholderData: {
      collections: [{ name: "Loading..", id: "placeholderId" }],
    },
  });

  const {
    data: collectionData,
    isLoading: isCollectionLoading,
    isError: isCollectionError,
  } = useQuery({
    queryKey: ["selectedCollection", selectedCollection],
    queryFn: (): Promise<Tokens | undefined> =>
      fetch(
        `${process.env.NEXT_PUBLIC_NFT_API}/tokens/v5?collection=${
          selectedCollection?.id || ""
        }&sortBy=floorAskPrice&limit=20&includeTopBid=false&includeAttributes=false&includeQuantity=false&includeDynamicPricing=false&normalizeRoyalties=false`
      )
        .then((res) => res.json())
        .then((res: Tokens) => {
          if (!res.tokens) throw new Error("Wrong data type received");

          if (res.tokens[0]?.token.name === null) {
            res.tokens.forEach(
              (token) =>
                (token.token.name = `${selectedCollection?.name} #${token.token.tokenId}`)
            );
          }

          return res;
        }),
    enabled: selectedCollection !== null,
  });

  return (
    <>
      <Head>
        <title>Create Custom Collection</title>
      </Head>
      <DndContext
        onDragEnd={(result) => {
          if (result.active.data.current?.origin === result.over?.id) {
            return;
          }

          console.log(result);
          if (
            result.over?.id === "customCollection" &&
            customCollectionList.findIndex((token) => {
              return token.token.name === result.active.id;
            }) === -1
          ) {
            setCustomCollectionList((list) => [
              ...list,
              { token: { name: String(result.active.id), tokenId: "" } },
            ]);
          }
        }}
      >
        <div className="mt-10 flex h-[100vh] w-[97%] flex-row px-8">
          <div className="w-[40%]">
            <Dropdown
              placeholder="Select a collection.."
              items={
                collectionsList?.collections.map(
                  (collection) => collection.name
                ) || []
              }
              selectionAction={(name: string) => {
                const collection = collectionsList?.collections.find(
                  (collection) => collection.name === name
                );
                if (collection) {
                  setSelectedCollection(collection);
                }
                //TODO: handle error in find
              }}
            />
            <div className="mt-5">
              {isCollectionLoading && <div>Loading..</div>}
              {!isCollectionLoading && (
                <Droppable id="collectionList">
                  <div className="flex flex-col">
                    {collectionData?.tokens.map(
                      (collectionItem: Token, i: number) => {
                        return (
                          <Draggable
                            key={collectionItem.token.name + i}
                            id={collectionItem.token.name + i}
                            origin={"collectionList"}
                          >
                            <div
                              key={collectionItem.token.name + i}
                              className="text-left"
                            >
                              {collectionItem.token.name}
                            </div>
                          </Draggable>
                        );
                      }
                    )}
                  </div>
                </Droppable>
              )}
            </div>
          </div>
          <div className="ml-5 flex w-[60%] flex-col">
            <div>
              <input
                className="customCollectionNameInput rounded-md p-2 text-black"
                value={customCollectionName}
                onChange={(e) => setCustomCollectionName(e.target.value)}
                placeholder={"Custom Collection Name"}
              />
              <Button
                onClick={() => {
                  if (
                    customCollections.findIndex(
                      (collection) =>
                        collection.collectionName === customCollectionName
                    ) !== -1
                  ) {
                    toast.error(
                      "That collection name already exists. Please try a different name"
                    );
                    return;
                  }

                  if (customCollectionList.length === 0) {
                    toast.error(
                      "Cannot save an empty collection. Please add tokens to it"
                    );
                    return;
                  }

                  if (customCollectionName.length === 0) {
                    toast.error(
                      "Name cannot be empty. Please add a name to the custom collection"
                    );
                    return;
                  }

                  setCustomCollections((customCollections) => [
                    ...customCollections,
                    {
                      collectionName: customCollectionName,
                      tokens: customCollectionList,
                    },
                  ]);
                  toast.success("The collection was saved locally!");
                }}
              >
                Save
              </Button>
            </div>
            <Droppable id="customCollection">
              <div className="customCollection mt-5 min-h-[100px] w-full min-w-full border-2 border-black p-2">
                {customCollectionList.length === 0 ? (
                  <div className="m-auto opacity-70">Drop tokens here</div>
                ) : (
                  <div className="left-0 flex flex-col">
                    {customCollectionList.map(
                      (collectionItem: Token, i: number) => {
                        return (
                          <Draggable
                            key={collectionItem.token.name + i}
                            id={collectionItem.token.name + i}
                            origin={"customCollection"}
                          >
                            <div key={collectionItem.token.name + i}>
                              {collectionItem.token.name}
                            </div>
                          </Draggable>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </Droppable>
          </div>
        </div>
      </DndContext>
      <ToastContainer />
    </>
  );
};

export default Home;
