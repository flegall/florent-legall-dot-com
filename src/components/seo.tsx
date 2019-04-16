import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import gravatar from "gravatar";

type Props = {
  readonly description?: string;
  readonly lang: string;
  readonly meta: ReadonlyArray<{
    readonly name: string;
    readonly content: string;
  }>;
  readonly keywords: ReadonlyArray<string>;
  readonly title: string;
};
function SEO({ description, lang, meta, keywords, title }: Props) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description != null
            ? description
            : data.site.siteMetadata.description;

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : [],
              )
              .concat(meta)}
          >
            <link
              rel="icon"
              type="image/x-icon"
              href={gravatar.url("florent.legall@gmail.com", { size: "16" })}
            />
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
