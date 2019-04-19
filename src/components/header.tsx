import { Link, navigate } from "gatsby";
import React, { useCallback, useRef, useEffect } from "react";
import { Location, WindowLocation } from "@reach/router";

import { useSearchContext } from "../search-state";

const styles = require("./headers.module.css");

const Header: React.FunctionComponent<Readonly<{ siteTitle: string }>> = ({
  siteTitle,
}) => (
  <header className={styles.header}>
    <div className={styles.headerBand}>
      <div className={styles.headerContainer}>
        <h2 style={{ margin: 0 }}>
          <Link to="/" className={styles.linkToWelcome}>
            {siteTitle}
          </Link>
        </h2>
        <Location>{({ location }) => <Search location={location} />}</Location>
      </div>
    </div>
  </header>
);

const Search: React.FC<{ location: WindowLocation }> = ({ location }) => {
  const { searchText, setSearchText } = useSearchContext();

  // Browse to /search
  const setSearchTextFromEvent = useCallback(
    e => {
      setSearchText(e.target.value);
      navigate("/search");
    },
    [setSearchText],
  );

  // Focus on the input field when opening /search
  const inputEl = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputEl.current && location.pathname === "/search") {
      inputEl.current.focus();
    }
  }, []);

  // Clear search text when leaving /search
  useEffect(
    () => () => {
      if (location.pathname === "/search") {
        setSearchText("");
      }
    },
    [location.pathname],
  );

  return (
    <div>
      <svg
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        focusable="false"
        aria-hidden="true"
        className={styles.searchIcon}
      >
        <g>
          <path d="m34.8 30.2c0.3 0.3 0.3 0.8 0 1.1l-3.4 3.5c-0.1 0.1-0.4 0.2-0.6 0.2s-0.4-0.1-0.6-0.2l-6.5-6.8c-2 1.2-4.1 1.8-6.3 1.8-6.8 0-12.4-5.5-12.4-12.4s5.6-12.4 12.4-12.4 12.4 5.5 12.4 12.4c0 2.1-0.6 4.2-1.7 6.1z m-17.4-20.4c-4.1 0-7.6 3.4-7.6 7.6s3.5 7.6 7.6 7.6 7.5-3.4 7.5-7.6-3.3-7.6-7.5-7.6z" />
        </g>
      </svg>
      <input
        ref={inputEl}
        type="search"
        placeholder="Search"
        autoComplete="off"
        spellCheck={false}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="false"
        dir="auto"
        style={{ position: "relative", verticalAlign: "top" }}
        className={styles.searchInput}
        value={searchText}
        onChange={setSearchTextFromEvent}
      />
    </div>
  );
};

export default Header;
