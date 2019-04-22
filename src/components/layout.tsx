import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Gravatar from "react-gravatar";
import { format } from "timeago.js";

import Header from "./header";

const styles = require("./layout.module.css");

const Layout: React.FunctionComponent = ({ children }) => {
  const { title, description } = useSiteInfos();
  return (
    <>
      <Header siteTitle={title} />
      <div className={styles.main}>
        <main>{children}</main>
        <footer className={styles.footer}>
          <div className={styles.footer_titleContainer}>
            <Gravatar
              email="florent.legall@gmail.com"
              size={100}
              className={styles.footer_titleIcon}
            />
            <p className={styles.footer_titleText}>
              <b>{"Florent Le Gall's personal blog"}</b>
              <br />
              {description}
            </p>
          </div>
          <div className={styles.footer_linksContainer}>
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
    <div className={styles.footer_lastDeployment}>
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
