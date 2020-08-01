/**
 * Webpack Config.
 *
 * @format
 */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const themeDirectory = path.resolve(__dirname, './themes/custom/varian/');
const moduleDirectory = path.resolve(__dirname, './modules/custom');

/**
 * Get Source Directory.
 */
const getSourceDirectory = (subDirectory, themeDirectory = true) => {
  const relativePath = themeDirectory ? './themes/custom/varian/webpack' : './';
  return path.join(__dirname, relativePath, subDirectory);
};

/**
 * Webpack Common Config.
 */
const config = {
  devtool: 'source-map',
  mode: 'development',
  watch: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
    alias: {
      'react-hook-form': 'react-hook-form/dist/index.ie11',
      '@varian': getSourceDirectory(''),
    },
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
const editorToolsConfig = Object.assign({}, config, {
  name: 'editor-tools-module',
  entry: {
    'editor-tools': `${moduleDirectory}/varian_editor_tools/js/source/editor-tools`,
  },
  output: {
    filename: 'js/build/[name].js',
    path: `${moduleDirectory}/varian_editor_tools/`,
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

/**
 * Varian Content Editor Module.
 */
const campaignTrackerConfig = Object.assign({}, config, {
  name: 'campaign-tracker-module',
  entry: {
    'campaign-tracker-admin': `${moduleDirectory}/varian_campaign_tracker/js/source/campaign-tracker-entry`,
    'campaign-tracker': `${moduleDirectory}/varian_campaign_tracker/js/source/components/campaign-tracker`,
  },
  output: {
    filename: 'js/build/[name].js',
    path: `${moduleDirectory}/varian_campaign_tracker/`,
    libraryTarget: 'window',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/campaign-tracker.css',
      chunkFilename: 'css/campaign-tracker.css',
      ignoreOrder: false,
    }),
  ],
});

/**
 * Varian Theme Config.
 */
const themeConfig = Object.assign({}, config, {
  name: 'varian-theme',
  entry: {
    bundle: `${themeDirectory}/webpack/index`,
    external: `${themeDirectory}/webpack/external-index`,
  },
  output: {
    filename: '[name].js',
    path: `${themeDirectory}/build/js/`,
    libraryTarget: 'window',
  },
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    /\bcore-js\b/,
    /^(jquery|\$)$/i,
  ],
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
      chunkFilename: '../css/[id].css',
      ignoreOrder: false,
    }),
  ],
});

module.exports = [themeConfig, editorToolsConfig, campaignTrackerConfig];
