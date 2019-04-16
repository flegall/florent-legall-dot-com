import React from "react";
import { Link, graphql } from "gatsby";
import pluralize from "pluralize";

import Layout from "../components/layout";
import SEO from "../components/seo";

type Props = {
  readonly data: {
    readonly allMarkdownRemark: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly excerpt: string;
          readonly frontmatter: {
            readonly date: string;
            readonly title: string;
            readonly author: string;
            readonly description: string;
          };
          readonly fields: { readonly slug: string };
          readonly timeToRead: number;
        };
      }>;
    };
  };
};
const IndexPage = ({ data }: Props) => (
  <Layout>
    <SEO title="Home" keywords={[`blog`, `software`, `engineer`]} />
    {data.allMarkdownRemark.edges.map(
      ({
        node: {
          id,
          frontmatter: { date, title, description },
          fields: { slug },
          timeToRead,
        },
      }) => (
        <p key={id}>
          <Link to={slug}>{title}</Link> <br />
          {description} <br />
          <span style={{ fontSize: "0.8rem" }}>
            {date} • {timeToRead} {pluralize("minute", timeToRead)} read
          </span>{" "}
          <br />
        </p>
      ),
    )}
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            author
            description
          }
          timeToRead
        }
      }
    }
  }
`;

export default IndexPage;
