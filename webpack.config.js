/**
 * Webpack Config.
 *
 * @format
 */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const gitDirectory = path.resolve(__dirname, '../');

/**
 * Webpack Common Config.
 */
const config = {
  devtool: 'source-map',
  mode: 'development',
  watch: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false, sourceMap: true, importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js',
              },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
};

/**
 * JavaScript inViewport.
 */
const inviewportConfig = Object.assign({}, config, {
  name: 'javascript-inviewport',
  entry: {
    inviewport: `${gitDirectory}/javascript-inViewport/inviewport`,
    'viewport-example': `${gitDirectory}/javascript-inViewport/viewport-example`,
  },
  output: {
    filename: '[name].min.js',
    path: `${gitDirectory}/javascript-inViewport/`,
    libraryTarget: 'window',
  },
});

/**
 * JavaScript inViewport.
 */
const undercoverConfig = Object.assign({}, config, {
  name: 'undercover-chrome',
  entry: {
    undercover: `${gitDirectory}/undercover-chrome/source/undercover`,
    background: `${gitDirectory}/undercover-chrome/source/background`,
  },
  output: {
    filename: './build/[name].min.js',
    path: `${gitDirectory}/undercover-chrome/`,
    libraryTarget: 'window',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './build/[name].min.css',
      chunkFilename: './build/[name].min.css',
      ignoreOrder: false,
    }),
  ],
});

module.exports = [inviewportConfig, undercoverConfig];
