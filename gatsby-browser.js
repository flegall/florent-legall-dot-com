import React from "react";
import "prismjs/themes/prism-solarizedlight.css";

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// eslint-disable-next-line react/prop-types
export const wrapPageElement = ({ element }) => {
  return (
    <>
      {element}
      <div data-testid="REACT_SPA_READY" />
    </>
  );
};
