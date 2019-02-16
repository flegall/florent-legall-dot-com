// @flow strict
module.exports = {
  siteMetadata: {
    title: `Florent Le Gall's blog`,
    description: `A few words on software development in english and sometimes in french.`,
    author: `@flornt`,
  },
  plugins: [
    `gatsby-plugin-flow`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "files",
        path: `${__dirname}/src`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};
