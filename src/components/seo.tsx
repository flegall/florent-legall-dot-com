import React from "react";
import { Helmet } from "react-helmet";
import gravatar from "gravatar";

import { useSiteInfos } from "../site-infos";

type Props = Readonly<{
  description?: string;
  lang: string;
  meta: ReadonlyArray<
    Readonly<{
      name: string;
      content: string;
    }>
  >;
  keywords: ReadonlyArray<string>;
  title: string;
}>;
function SEO({ description, lang, meta, keywords, title }: Props) {
  const {
    description: siteDescription,
    title: siteTitle,
    author: siteAuthor,
  } = useSiteInfos();
  const metaDescription = description != null ? description : siteDescription;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
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
          content: siteAuthor,
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
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
};

export default SEO;
