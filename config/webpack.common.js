const webpack = require('webpack');
const path = require('path');
const proxy = require('./proxy');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 打包生成index.html并替换已有文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css提取为独立文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 删除原来打包后的文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制原public下的文件到输入目录
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// env dev:true false-production
const baseConfig = (dev, devServer) => {
  let config = {
    mode: dev ? 'development' : 'production',
    // devtool: "source-map",
    entry: {
      app: './src/index.tsx',
    },
    output: {
      filename: 'static/js/[name].[hash].js',
      chunkFilename: 'static/js/[name].bundle.[hash].js',
      path: path.resolve(__dirname, '../www'),
    },
    // stats: dev
    //   ? "minimal"
    //   : {
    //       colors: true,
    //       hash: true,
    //       assets: true,
    //       chunks: false,
    //       chunkModules: false,
    //       children: false,
    //       warnings: false
    //     },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, '../src'),
        '@': path.resolve(__dirname, '../src'),
        'react-native': 'react-native-web',
        '@ant-design/icons/lib/dist$': path.resolve(__dirname, '../src/config/icons.js'),
      },
      extensions: ['.web.js', '.c', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'],
    },
  };
  if (dev & devServer) {
    config.devServer = devServer;
  }
  return config;
};
const fileLoaders = dev => {
  return [
    {
      test: /\.svg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
            esModule: false,
          },
        },
      ],
    },
    {
      test: /\.(ttf|eot|jpe?g|gif|png|bmp|woff|woff2)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
            esModule: false,
          },
        },
      ],
    },
  ];
};
const cssLoaders = dev => {
  const baseCssLoaders = dev ? 'style-loader' : MiniCssExtractPlugin.loader;
  return [
    {
      test: /\.css$/,
      use: [
        baseCssLoaders,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        'postcss-loader',
      ],
    },
    {
      test: /\.scss$/,
      use: [baseCssLoaders, 'css-loader', 'sass-loader'],
    },
    {
      test: /\.less$/,
      use: [baseCssLoaders, 'css-loader', 'less-loader'],
    },
  ];
};

const jsLoaders = dev => {
  return [
    {
      test: /\.js|jsx$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.ts(x)?$/,
      use: ['awesome-typescript-loader'],
      exclude: /node_modules/,
    },
  ];
};

const plugins = dev => {
  return [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // inject: true,
      // API_ENV: process.env.API_ENV,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    !dev &&
      new webpack.DefinePlugin({
        'process.env.API_ENV': JSON.stringify(process.env.API_ENV),
      }),
    !dev &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[id].[contenthash:8].css',
        ignoreOrder: true,
      }),
    !dev &&
      new CopyWebpackPlugin([
        {
          from: 'public',
          to: '',
        },
      ]),
    // new webpack.DllReferencePlugin({
    //   manifest
    // }),
    !dev && new BundleAnalyzerPlugin(),
  ].filter(Boolean);
};
const optimization = dev => {
  return {
    runtimeChunk: 'single',
    minimizer: dev
      ? []
      : [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: false, // Must be set to true if using source-maps in production
            terserOptions: {},
          }),
          new OptimizeCSSAssetsPlugin(),
        ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(less|sass|css)$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
        },
        // ...cacheGroupsFn(vendors),
        // echartsBase: {
        //   test: /[\\\/]echarts[\\\/]/,
        //   name: 'echarts',
        //   chunks: 'all',
        //   priority: 10,
        // },
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 8,
        },
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name(module) {
        //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
        //     return `npm.${packageName.replace('@', '')}`;
        //   },
        // },
        commons: {
          test: /[\\\/]src[\\\/]/,
          name: 'commons',
          chunks: 'all',
          priority: 5,
        },
      },
    },
  };
};
const config = (env, devServer) => {
  return {
    ...baseConfig(env, devServer),
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        ...jsLoaders(env),
        ...cssLoaders(env),
        ...fileLoaders(env),
      ],
    },
    plugins: plugins(env),
    optimization: optimization(env),
  };
};

module.exports = {
  baseConfig,
  cssLoaders,
  jsLoaders,
  plugins,
  optimization,
  config,
};
