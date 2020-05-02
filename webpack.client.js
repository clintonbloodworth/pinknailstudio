const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const { scss } = require('svelte-preprocess');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: process.env.NODE_ENV === 'production'
    ? 'source-map'
    : 'cheap-module-source-map',
  entry: {
    client: path.resolve('source', 'client'),
  },
  mode: process.env.NODE_ENV === 'production'
    ? 'production'
    : 'development',
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: [
          {
            loader: 'svelte-loader',
            options: {
              dev: process.env.NODE_ENV !== 'production',
              emitCss: true,
              hydratable: true,
              loopGuardTimeout: process.env.NODE_ENV !== 'production',
              preprocess: [
                scss({
                  includePaths: [
                    path.resolve('source'),
                  ],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
        ],
      },
    ],
  },
  node: {
    global: false, // https://github.com/webpack/webpack/issues/5627#issuecomment-394309966
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        sourceMap: true,
      }),
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new webpack.DefinePlugin({
      global: 'window', // https://github.com/webpack/webpack/issues/5627#issuecomment-394309966
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  resolve: {
    alias: {
      app: path.resolve('source', 'app'),
      components: path.resolve('source', 'components'),
      elements: path.resolve('source', 'elements'),

      // Ensure one copy of Svelte is bundled in the app.
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  stats: process.env.NODE_ENV === 'production' ? 'normal' : 'minimal',
  watch: process.env.NODE_ENV !== 'production',
};
