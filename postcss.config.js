module.exports = {
  plugins: [
    require('postcss-preset-env'),
    // require('postcss-pxtorem')({ rootValue: 37.5, propWhiteList: [] }),
    // require('postcss-px-to-viewport')({
    //   unitToConvert: 'px',
    //   viewportWidth: 375,
    //   unitPrecision: 5,
    //   propList: ['*'],
    //   viewportUnit: 'vw',
    //   fontViewportUnit: 'vw',
    //   selectorBlackList: [],
    //   minPixelValue: 1,
    //   mediaQuery: false,
    //   replace: true,
    //   exclude: [],
    //   landscape: false,
    //   landscapeUnit: 'vw',
    //   landscapeWidth: 568
    // }),
    // require('postcss-flexbugs-fixes'),
  ],
};
