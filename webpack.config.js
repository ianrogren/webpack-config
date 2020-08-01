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
 * Varian Content Editor Module.
 */
const inviewportConfig = Object.assign({}, config, {
  name: 'javascript-inviewport',
  entry: {
    'editor-tools': `${gitDirectory}/javascript-inViewport`,
  },
  output: {
    filename: 'inviewport.min.js',
    path: `${gitDirectory}/javascript-inViewport/`,
    libraryTarget: 'window',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: false,
    }),
  ],
});

module.exports = [inviewportConfig];
