const { config } = require('./webpack.common');
const devServer = require('./devServer');
const dev = process.env.dev;

module.exports = config(dev, devServer);
