import { DndContext } from "@dnd-kit/core";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import { Draggable } from "../components/Draggable";
import Dropdown from "../components/Dropdown";
import { Droppable } from "../components/Droppable";

type Token = { token: { name: string } };
type Tokens = {
  tokens: Token[];
};

//TODO: loading and error handling
//TODO: tests
const Home: NextPage = () => {
  const [selectedCollection, setSelectedCollection] = useState<string>(
    "0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63"
  );
  const [customCollectionName, setCustomCollectionName] = useState<string>("");
  const [customCollectionList, setCustomCollectionList] = useState<Token[]>([]);

  const {
    data: collectionsList,
    isLoading: isCollectionListLoading,
    isError: isCollectionListError,
  } = useQuery({
    queryKey: ["collectionList"],
    queryFn: () =>
      fetch(
        "https://api.reservoir.tools/collections/v5?includeTopBid=false&normalizeRoyalties=false&useNonFlaggedFloorAsk=false&sortBy=allTimeVolume&limit=20"
      ).then((res) => res.json()),
    placeholderData: {
      collections: [{ name: "placeholder" }],
    },
  });

  //TODO: dont fetch if selectedCollection is empty
  const {
    data: collectionData,
    isLoading: isCollectionLoading,
    isError: isCollectionError,
  } = useQuery({
    queryKey: ["selectedCollection", selectedCollection],
    queryFn: (): Promise<Tokens> =>
      fetch(
        `https://api.reservoir.tools/tokens/v5?collection=${selectedCollection}&sortBy=floorAskPrice&limit=20&includeTopBid=false&includeAttributes=false&includeQuantity=false&includeDynamicPricing=false&normalizeRoyalties=false`
      ).then((res) => res.json()),
    placeholderData: {
      tokens: [{ token: { name: "placeholder" } }],
    },
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
          if (result.over?.id === "customCollection") {
            setCustomCollectionList((list) => [
              ...list,
              { token: { name: String(result.active.id) } },
            ]);
          }
        }}
      >
        <div className="mt-10 flex h-[80%] w-[97%] flex-row">
          <div className="w-[20%]">
            <Dropdown
              placeholder="Select a collection.."
              items={collectionsList.collections.map(
                (collection: { name: string }) => collection.name
              )}
              selectionAction={(item: string) => {
                setSelectedCollection(item);
              }}
            />
            <div className="mt-5">
              {isCollectionLoading && <div>Loading..</div>}
              {!isCollectionLoading && (
                <Droppable id="collectionList">
                  {collectionData?.tokens.map(
                    (collectionItem: Token, i: number) => {
                      return (
                        <Draggable
                          key={collectionItem.token.name + i}
                          id={collectionItem.token.name + i}
                          origin={"collectionList"}
                        >
                          <div key={collectionItem.token.name + i}>
                            {collectionItem.token.name}
                          </div>
                        </Draggable>
                      );
                    }
                  )}
                </Droppable>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <input
                className="rounded-md p-2 text-black"
                value={customCollectionName}
                onChange={(e) => setCustomCollectionName(e.target.value)}
                placeholder={"Custom Collection Name"}
              />
              <button className="border-1 ml-5 rounded-md border-black bg-white p-2 text-black">
                Save
              </button>
            </div>
            <Droppable id="customCollection">
              <div className="left-0 mt-5 flex min-h-[100px] w-full min-w-full flex-col border-2 border-black p-2">
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
            </Droppable>
          </div>
        </div>
      </DndContext>
    </>
  );
};

export default Home;
