import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import pluralize from "pluralize";

const styles = require("./articles.module.css");

const Articles = ({ published }: { published: boolean }) => {
  const data: ArticlesQueryResult = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
              published
            }
            timeToRead
          }
        }
      }
    }
  `);
  return (
    <>
      {data.allMarkdownRemark.edges
        .filter(edge => edge.node.frontmatter.published === published)
        .map(
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
              <span className={styles.dateAndTimeToRead}>
                {date} • {timeToRead} {pluralize("minute", timeToRead)} read
              </span>{" "}
              <br />
            </p>
          ),
        )}
    </>
  );
};

type ArticlesQueryResult = Readonly<{
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
          published: boolean;
        }>;
        fields: Readonly<{ slug: string }>;
        timeToRead: number;
      }>;
    }>;
  }>;
}>;

export default Articles;
