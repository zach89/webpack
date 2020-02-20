const { config } = require("./webpack.common");
const dev = process.env.dev;

module.exports(config(dev));
