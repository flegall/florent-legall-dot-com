const babelOptions = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};

module.exports = require("babel-jest").createTransformer(babelOptions);
