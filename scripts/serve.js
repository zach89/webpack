const path = require("path");
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { config } = require("../config/webpack.common");
const webpackConfig = config(true);
const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, webpackConfig.WebpackDevServer);
server.listen(3000, "localhost", () => {
  console.log("Starting server 3000");
});
