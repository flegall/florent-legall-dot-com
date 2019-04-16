import { Link } from "gatsby";
import React from "react";

const Header: React.FunctionComponent<{ siteTitle: string }> = ({
  siteTitle,
}) => (
  <header
    style={{
      background: `rgb(252, 164, 227)`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h2 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h2>
    </div>
  </header>
);

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
