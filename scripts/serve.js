const path = require("path");
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../config/webpack.dev");
// const config = require(path.resolve(".bdpWebpack.js"));

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  }
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(3000, "localhost", () => {
  console.log("Starting server");
});
