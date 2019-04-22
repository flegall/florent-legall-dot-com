import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/seo";

const styles = require("./article.module.css");

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
    <>
      <SEO title={title} keywords={tags} description={description} />
      <h1>{title}</h1>
      {published === false && (
        <div className={styles.unpublished}>
          Attention ! This article is not published yet, it{"'"}s still a draft
          ✍
        </div>
      )}
      <p className={styles.authorAndDate}>
        {author} - {date}
      </p>
      <div
        className={styles.toc}
        dangerouslySetInnerHTML={{ __html: tableOfContents }}
      />
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
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
