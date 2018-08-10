import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
  entry: "./src/routing.tsx",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
  },
  watch: true,
};

export default config;
