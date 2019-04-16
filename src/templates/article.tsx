import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const articleStyles = require("./article.module.css");

type Props = Readonly<{
  data: Readonly<{
    markdownRemark: Readonly<{
      frontmatter: Readonly<{
        title: string;
        author: string;
        date: string;
        tags: ReadonlyArray<string>;
        description: string;
        published: boolean;
      }>;
      html: string;
      tableOfContents: string;
    }>;
  }>;
}>;
const ArticlePage = ({ data }: Props) => {
  const post = data.markdownRemark;
  const { html, tableOfContents } = post;
  const {
    title,
    author,
    date,
    tags,
    description,
    published,
  } = post.frontmatter;
  return (
    <Layout>
      <SEO title={title} keywords={tags} description={description} />
      <h1>{title}</h1>
      {published === false && (
        <div
          style={{
            backgroundColor: "rgb(239, 225, 119)",
            padding: "20px",
            marginBottom: "20px",
            fontSize: "1.1rem",
          }}
        >
          Attention ! This article is not published yet, it{"'"}s still a draft
          ✍
        </div>
      )}
      <p style={{ textAlign: "right" }}>
        {author} - {date}
      </p>
      <div
        className={articleStyles.toc}
        style={{ display: "flex", flexDirection: "row-reverse" }}
        dangerouslySetInnerHTML={{ __html: tableOfContents }}
      />
      <div
        className={articleStyles.markdown}
        dangerouslySetInnerHTML={{ __html: html }}
      />
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
        published
      }
    }
  }
`;

export default ArticlePage;
