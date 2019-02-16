// @flow strict-local
import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

type Props = {
  +data: {
    +markdownRemark: {
      +frontmatter: {
        +title: string,
      },
      +html: string,
    },
  },
};
const ArticlePage = ({ data }: Props) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
      }
    }
  }
`;

export default ArticlePage;
