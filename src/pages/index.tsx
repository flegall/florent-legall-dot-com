import React from "react";
import { Link, graphql } from "gatsby";
import pluralize from "pluralize";

import SEO from "../components/seo";

type Props = Readonly<{
  data: Readonly<{
    allMarkdownRemark: Readonly<{
      edges: ReadonlyArray<{
        node: Readonly<{
          id: string;
          excerpt: string;
          frontmatter: Readonly<{
            date: string;
            title: string;
            author: string;
            description: string;
          }>;
          fields: Readonly<{ slug: string }>;
          timeToRead: number;
        }>;
      }>;
    }>;
  }>;
}>;
const IndexPage = ({ data }: Props) => (
  <>
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
  </>
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
