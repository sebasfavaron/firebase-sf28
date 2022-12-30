import createPersistedState from "use-persisted-state";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type Token = { token: { name: string; tokenId: string } };
export type Tokens = {
  tokens: Token[];
};
export type Collection = { name: string; id: string };
export type Collections = {
  collections: Collection[];
};
export type CustomCollections = {
  collectionName: string;
  tokens: Token[];
}[];

export const useCollectionsState =
  createPersistedState<CustomCollections>("custom-collections");
