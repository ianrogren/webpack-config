/**
 * Project Babel Config
 *
 * @format
 */
/* eslint-disable no-undef */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        targets: ['ie 11'],
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
    '@babel/preset-react',
    '@babel/typescript',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
  ],
};
