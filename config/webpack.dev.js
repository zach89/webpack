const HtmlPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const config = {
  mode: "development",
  plugins: [
    new DashboardPlugin(),
    new HtmlPlugin({
      template: "src/index.html"
    })
  ]
};
module.exports = config;
