const { config } = require("../config/webpack.common");

const compiler = Webpack(config());
compiler.run();
