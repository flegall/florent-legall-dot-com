/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react";
import { RecoilRoot } from "recoil";

import "prismjs/themes/prism-tomorrow.css";

import Layout from "./components/layout";

export const wrapPageElement = ({ element }: { element: React.ReactNode }) => (
  <>
    <Layout>{element}</Layout>
    <div data-testid="REACT_SPA_READY" />
  </>
);

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <RecoilRoot>{element}</RecoilRoot>
);
