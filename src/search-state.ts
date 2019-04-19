import { useState } from "react";
import createUseContext from "constate";

function useSearch() {
  const [searchText, setSearchText] = useState<string>("");
  return { searchText, setSearchText };
}

export const useSearchContext = createUseContext(useSearch);
export const { Provider: SearchContextProvider } = useSearchContext;
