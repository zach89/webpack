const devServer = {
  contentBase: path.join(__dirname, '../public'),
  hot: true,
  '/nApi': {
    target: 'http://localhost:3000',
    pathRewrite: {
      '^/nApi': '',
    },
  },
};
module.exports = devServer;
