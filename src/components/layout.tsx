import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Gravatar from "react-gravatar";
import { format } from "timeago.js";

import Header from "./header";

const Layout: React.FunctionComponent = ({ children }) => {
  const { title, description } = useSiteInfos();
  return (
    <>
      <Header siteTitle={title} />
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
              {description}
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
          <LastDeployment />
        </footer>
      </div>
    </>
  );
};

const LastDeployment = () => {
  const isBrowser = typeof window !== `undefined`;
  const { lastDeployment } = useSiteInfos();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        direction: "rtl",
        fontSize: "0.7rem",
      }}
    >
      {isBrowser ? <>Last build {format(lastDeployment, "en_US")}</> : <></>}
    </div>
  );
};

const useSiteInfos = (): {
  title: string;
  description: string;
  lastDeployment: string;
} => {
  const {
    site: {
      siteMetadata: { title, description, lastDeployment },
    },
  } = useStaticQuery(graphql`
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
  return { title, description, lastDeployment };
};

export default Layout;
