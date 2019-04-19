/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react";
import "prismjs/themes/prism-solarizedlight.css";

import { SearchContextProvider } from "./search-state";

export const wrapPageElement = ({ element }: { element: React.ReactNode }) => (
  <>
    {element}
    <div data-testid="REACT_SPA_READY" />
  </>
);

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <SearchContextProvider>{element}</SearchContextProvider>
);
