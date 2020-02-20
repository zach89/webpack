const Webpack = require("webpack");
const config = require("../config/webpack.prod");

const compiler = Webpack(config);
compiler.run();
