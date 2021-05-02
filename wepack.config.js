const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const mode = "production";

const config = {
  mode: mode,
  entry: ENTRY_FILE,
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]",
  },
};

module.exports = config;
