import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Gravatar from "react-gravatar";
import { format } from "timeago.js";

import Header from "./header";

const Layout: React.FunctionComponent = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          lastDeployment
        }
      }
    }
  `);

  return (
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <a href="https://twitter.com/flornt">twitter</a> •{" "}
              <a href="https://github.com/flegall">github</a> •{" "}
              <a href="https://www.linkedin.com/in/flegall/">linkedin</a> •{" "}
              <a href="https://github.com/flegall/florent-legall-dot-com">
                built
              </a>
              {` `}
              with
              {` `}
              <a href="https://www.gatsbyjs.org">gatsby</a>
            </span>
            <span>
              <a href="/rss.xml">rss.xml</a>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              direction: "rtl",
              fontSize: "0.7rem",
            }}
          >
            Last build {format(data.site.siteMetadata.lastDeployment, "en_US")}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
