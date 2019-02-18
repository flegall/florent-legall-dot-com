// @flow strict-local
import * as React from "react";
import { StaticQuery, graphql } from "gatsby";
import Gravatar from "react-gravatar";

import Header from "./header";

const Layout = ({ children }: { children?: React.Node }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer
            style={{
              paddingTop: 64,
            }}
          >
            <div style={{ display: "flex" }}>
              <Gravatar
                email="florent.legall@gmail.com"
                size={100}
                style={{ borderRadius: "50%" }}
              />
              <p style={{ alignSelf: "center", marginLeft: "30px" }}>
                <b>{"Florent Le Gall's personal blog"}</b>
                <br />
                {data.site.siteMetadata.description}
              </p>
            </div>
            <a href="https://twitter.com/flornt">twitter</a> •{" "}
            <a href="https://github.com/flegall">github</a> •{" "}
            <a href="https://www.linkedin.com/in/flegall/">linkedin</a> • built
            with
            {` `}
            <a href="https://www.gatsbyjs.org">gatsby</a>
          </footer>
        </div>
      </>
    )}
  />
);

export default Layout;
