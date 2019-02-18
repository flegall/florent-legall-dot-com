// @flow
import Typography from "typography";
import theme from "typography-theme-ocean-beach";

theme.overrideThemeStyles = () => {
  return {
    a: {
      textShadow: `none`,
      textDecoration: "none",
    },
  };
};

const typography = new Typography(theme);

export default typography;
