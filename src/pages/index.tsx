import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Dropdown from "../components/Dropdown";

type Token = {
  tokens: { token: { name: string } }[];
};

const Home: NextPage = () => {
  const [selectedCollection, setSelectedCollection] = useState<string>(
    "0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63"
  );

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

  const {
    data: collectionData,
    isLoading: isCollectionLoading,
    isError: isCollectionError,
  } = useQuery({
    queryKey: ["selectedCollection", selectedCollection],
    queryFn: (): Promise<Token> =>
      fetch(
        `https://api.reservoir.tools/tokens/v5?collection=${selectedCollection}&sortBy=floorAskPrice&limit=20&includeTopBid=false&includeAttributes=false&includeQuantity=false&includeDynamicPricing=false&normalizeRoyalties=false`
      ).then((res) => res.json()),
    placeholderData: {
      tokens: [{ token: { name: "placeholder" } }],
    },
  });

  useEffect(() => {
    console.log(collectionData);
  }, [collectionData]);
  return (
    <>
      <Dropdown
        placeholder="Select a collection.."
        items={collectionsList.collections.map(
          (collection: { name: string }) => collection.name
        )}
        selectionAction={(item: string) => {
          setSelectedCollection(item);
        }}
      />
      <div>
        {isCollectionLoading && <div>Loading..</div>}
        {!isCollectionLoading &&
          collectionData?.tokens.map((collectionItem, i: number) => {
            return (
              <div key={collectionItem.token.name + i}>
                {collectionItem.token.name}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
