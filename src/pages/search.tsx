import React, { useMemo } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Index } from "elasticlunr";

import SEO from "../components/seo";
import { useSearchContext } from "../search-state";

const SearchPage = () => {
  const {
    siteSearchIndex: { index: searchIndex },
  } = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `);

  const { searchText } = useSearchContext();

  const index = useMemo<IndexType>(() => Index.load(searchIndex), [
    searchIndex,
  ]);

  const docs = useMemo(
    () =>
      index
        .search(searchText, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => index.documentStore.getDoc(ref))
        .filter(({ published }) => published === true),
    [index, searchText],
  );

  return (
    <>
      <SEO title="Search" keywords={[`blog`, `software`, `engineer`]} />
      <h2>Search results</h2>
      {docs.length > 0 ? (
        docs.map(({ id, slug, title, description }) => (
          <p key={id}>
            <Link to={slug}>{title}</Link> <br />
            {description} <br />
          </p>
        ))
      ) : (
        <span>Sorry no results found.</span>
      )}
    </>
  );
};

type IndexType = {
  readonly search: (
    query: string,
    options: {},
  ) => ReadonlyArray<{ ref: string }>;
  readonly documentStore: {
    getDoc: (
      ref: string,
    ) => Readonly<{
      content: string;
      id: string;
      slug: string;
      tags: ReadonlyArray<string>;
      title: string;
      description: string;
      published: boolean;
    }>;
  };
};

export default SearchPage;
