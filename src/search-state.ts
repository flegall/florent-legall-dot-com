import { useState } from "react";
import createUseContext from "constate";

function useSearch() {
  const [searchText, search] = useState<string>("");
  const clearSearch = () => search("");
  return { searchText, search, clearSearch };
}

export const useSearchContext = createUseContext(useSearch);
export const { Provider: SearchContextProvider } = useSearchContext;
