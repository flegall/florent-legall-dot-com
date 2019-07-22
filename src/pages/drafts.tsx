import React from "react";

import SEO from "../components/seo";
import Articles from "../components/articles";

const draftsStyles = require("./drafts.module.css");

const Drafts = () => (
  <>
    <SEO title="Home" keywords={[`blog`, `software`, `engineer`]} />
    <div className={draftsStyles.unpublished}>
      Attention ! These articles are not published yet, they are still a draft
      ✍
    </div>
    <Articles published={false} />
  </>
);

export default Drafts;
