import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import pluralize from "pluralize";
import * as t from "io-ts";
import { useTypeChecker } from "../utils";

const styles = require("./articles.module.css");

const Articles = ({ published }: { published: boolean }) => {
  const data = useTypeChecker(
    ArticlesQueryResultType,
    useStaticQuery(graphql`
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
    `),
  );
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

const ArticlesQueryResultType = t.readonly(
  t.type({
    allMarkdownRemark: t.readonly(
      t.type({
        edges: t.readonlyArray(
          t.readonly(
            t.type({
              node: t.readonly(
                t.type({
                  id: t.string,
                  fields: t.readonly(t.type({ slug: t.string })),
                  timeToRead: t.number,
                  frontmatter: t.readonly(
                    t.type({
                      date: t.string,
                      title: t.string,
                      author: t.string,
                      description: t.string,
                      published: t.boolean,
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
  }),
);

export default Articles;
