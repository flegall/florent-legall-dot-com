import React from "react";
import { RecoilRoot } from "recoil";

import Layout from "./components/layout";

export const wrapPageElement = ({ element }: { element: React.ReactNode }) => (
  <Layout>{element}</Layout>
);

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <RecoilRoot>{element}</RecoilRoot>
);
