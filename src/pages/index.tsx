import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Articles from "../components/articles";

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`blog`, `software`, `engineer`]} />
    <Articles published={true} />
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
