import { useStaticQuery, graphql } from "gatsby";
import * as t from "io-ts";

import { useTypeChecker } from "./utils";

export const useSiteInfos = (): {
  title: string;
  description: string;
  lastDeployment: string;
  author: string;
} => {
  const {
    site: {
      siteMetadata: { title, description, lastDeployment, author },
    },
  } = useTypeChecker(
    SiteQueryResultType,
    useStaticQuery(graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
            lastDeployment
            author
          }
        }
      }
    `),
  );
  return { title, description, lastDeployment, author };
};

const SiteQueryResultType = t.readonly(
  t.type({
    site: t.readonly(
      t.type({
        siteMetadata: t.readonly(
          t.type({
            title: t.string,
            description: t.string,
            lastDeployment: t.string,
            author: t.string,
          }),
        ),
      }),
    ),
  }),
);
