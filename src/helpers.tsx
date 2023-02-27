import { useEffect, useState } from "react";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type Token = { token: { name: string; tokenId: string } };
export type Tokens = { tokens: Token[] };
export type Collection = { name: string; id: string };
export type Collections = { collections: Collection[] };
export type CustomCollections = { collectionName: string; tokens: Token[] }[];

export function useCollectionsState(defaultValue?: CustomCollections) {
  return useLocalStorage<CustomCollections>("custom-collections", defaultValue);
}

export function useLocalStorage<T>(name: string, defaultValue?: T) {
  const [state, updateState] = useState<T | undefined>(() => {
    if (typeof window === "undefined") return defaultValue;
    let localState = localStorage.getItem(name);
    if (localState) {
      localState = JSON.parse(localState);
      if (localState) {
        return localState as T; //TODO: check
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem(name, JSON.stringify(state));
  }, [state, name]);

  return [state, updateState];
}
