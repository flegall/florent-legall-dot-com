// @flow strict-local
import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

type Props = {
  +data: {
    +markdownRemark: {
      +frontmatter: {
        +title: string,
        +author: string,
        +date: string,
      },
      +html: string,
    },
  },
};
const ArticlePage = ({ data }: Props) => {
  const post = data.markdownRemark;
  const { html } = post;
  const { title, author, date } = post.frontmatter;
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <p style={{ textAlign: "right" }}>
          {author} - {date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        author
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default ArticlePage;
