import React from "react";

import Layout from "./components/layout";
import { SearchContextProvider } from "./search-state";

export const wrapPageElement = ({ element }: { element: React.ReactNode }) => (
  <Layout>{element}</Layout>
);

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <SearchContextProvider>{element}</SearchContextProvider>
);
