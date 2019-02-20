// @flow strict-local
import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import articleStyles from "./article.module.css";

type Props = {
  +data: {
    +markdownRemark: {
      +frontmatter: {
        +title: string,
        +author: string,
        +date: string,
        +tags: $ReadOnlyArray<string>,
        +description: string,
      },
      +html: string,
      +tableOfContents: string,
    },
  },
};
const ArticlePage = ({ data }: Props) => {
  const post = data.markdownRemark;
  const { html, tableOfContents } = post;
  const { title, author, date, tags, description } = post.frontmatter;
  return (
    <Layout>
      <SEO title={title} keywords={tags} description={description} />
      <>
        <h1>{title}</h1>
        <p style={{ textAlign: "right" }}>
          {author} - {date}
        </p>
        <div
          style={{ display: "flex", flexDirection: "row-reverse" }}
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        />
        <div
          className={articleStyles.markdown}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
      frontmatter {
        title
        author
        date(formatString: "MMMM DD, YYYY")
        tags
        description
      }
    }
  }
`;

export default ArticlePage;
