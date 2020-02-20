const path = require("path");
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../config/webpack.dev");
const DashboardPlugin = require("webpack-dashboard/plugin");
const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  hot: true,
  progess: true
});
console.log(server);
server.listen(3000, "localhost", () => {
  console.log("Starting server");
});
