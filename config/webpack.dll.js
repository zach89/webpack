const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
let packageJson = require("../package.json");
packageJson = Object.keys(packageJson.dependencies) || [];
const config = {
  entry: {
    vendor: packageJson
  },
  output: {
    path: path.join(__dirname, "../.dll"),
    filename: "[name]_[hash:6].dll.js",
    library: "[name]_[hash:6]"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.DllPlugin({
      path: path.join(__dirname, "../.dll", "[name]-manifest.json"),
      name: "[name]_[hash:6]"
    })
  ]
};
const compiler = webpack(config);
compiler.run();
