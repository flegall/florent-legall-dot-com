const unified = require("unified");
const parse = require("remark-parse");

module.exports = {
  siteMetadata: {
    title: `Software kitchen`,
    description: `Notes on software development in english and sometimes in french.`,
    author: `@flornt`,
    siteUrl: "https://florent-legall.com",
    lastDeployment: new Date().toISOString(),
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `React`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "files",
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 920,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-autolink-headers",
          {
            resolve: "gatsby-remark-embed-snippet",
            options: {
              // Example code links are relative to this dir.
              // eg examples/path/to/file.js
              directory: `${__dirname}/src/articles`,
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              inlineCodeMarker: "÷",
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-134707395-1`,
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: "gatsby-plugin-webpack-bundle-analyzer",
      options: {
        analyzerMode: "static",
        production: true,
        openAnalyzer: false,
        logLevel: "silent",
      },
    },
    {
      resolve: "@gatsby-contrib/gatsby-plugin-elasticlunr-search",
      options: {
        // Fields to index
        fields: ["title", "description", "tags", "content"],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: (node) => node.frontmatter.title,
            tags: (node) => node.frontmatter.tags,
            published: (node) => node.frontmatter.published,
            slug: (node) => node.fields.slug,
            description: (node) => node.frontmatter.description,
            content: (node) =>
              mdToString(unified().use(parse).parse(node.rawMarkdownBody)),
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const siteUrl = site.siteMetadata.siteUrl;
                const postText = `
                <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at https://florent-legall.com/. You can read it online by <a href="${
                  siteUrl + edge.node.fields.slug
                }">clicking here</a>.)</div>
              `;

                let html = edge.node.html;
                // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": html + postText }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] }
                  filter: { frontmatter: { published: { eq: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields { 
                        slug   
                      }
                      frontmatter {
                        title
                        date
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Florent Le Gall's Blog RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-netlify`,
  ],
};

// Get the text content of a node.  If the node itself does not expose
// plain-text fields, `toString` will recursivly try its children.
function mdToString(node) {
  return (
    valueOf(node) ||
    (node.children && node.children.map(mdToString).join(" ")) ||
    ""
  );

  // Get the value of `node`.  Checks, `value`, `alt`, and `title`, in that order.
  function valueOf(node) {
    return (
      (node && node.value ? node.value : node.alt ? node.alt : node.title) || ""
    );
  }
}
