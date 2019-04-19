import React from "react";

import { SearchContextProvider } from "./search-state";

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <SearchContextProvider>{element}</SearchContextProvider>
);
