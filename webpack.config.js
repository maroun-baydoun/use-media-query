const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
};

module.exports = {
  mode: "production",
  entry: {
    "use-media-query": path.join(PATHS.src, "./useMediaQuery.ts"),
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
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, "types")],
    }),
  ]
};
