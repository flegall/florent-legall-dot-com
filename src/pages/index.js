// @flow strict-local
import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

type Props = {
  +data: {
    +allMarkdownRemark: {
      +edges: $ReadOnlyArray<{
        +node: {
          +id: string,
          +excerpt: string,
          +frontmatter: { +date: string, +title: string },
          +fields: { +slug: string },
        },
      }>,
    },
  },
};
const IndexPage = ({ data }: Props) => {
  console.log(data);
  return (
    <Layout>
      <SEO title="Home" keywords={[`blog`, `software`, `engineer`]} />
      {data.allMarkdownRemark.edges.map(
        ({
          node: {
            id,
            frontmatter: { date, title },
            fields: { slug },
          },
        }) => (
          <p key={id}>
            <Link to={slug}>{title}</Link>
          </p>
        ),
      )}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`;

export default IndexPage;
