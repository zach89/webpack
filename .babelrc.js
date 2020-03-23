module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-transform-runtime',
    // ['babel-plugin-lodash'],
    [
      'import',
      {
        libraryName: 'antd-mobile',
        style: 'css',
      },
      'antd-mobile',
    ],
    ['import', { libraryName: 'antd', style: 'css' }, 'antd'],
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  env: {
    test: {
      presets: [['@babel/preset-env']],
    },
  },
};
