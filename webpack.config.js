const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATHS = {
  src: resolve(__dirname, "src"),
  dist: resolve(__dirname, "dist"),
};

module.exports = {
  mode: "production",
  entry: {
    "use-media-query": resolve(PATHS.src, "useMediaQuery.ts"),
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    library: "useMediaQuery",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "this",
  },
  devtool: "source-map",
  externals: {
    react: "react",
    reactDOM: "react-dom",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        resolve(__dirname, "types"),
        resolve(__dirname, "dist"),
      ],
    }),
  ],
};
