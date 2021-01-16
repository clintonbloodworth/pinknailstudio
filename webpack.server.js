const path = require('path');
const { scss } = require('svelte-preprocess');

module.exports = {
  entry: {
    server: path.resolve('source', 'app'),
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
              compilerOptions: {
                css: false,
                dev: process.env.NODE_ENV !== 'production',
                format: 'cjs',
                generate: 'ssr',
                hydratable: true,
              },
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
    ],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'public'),
  },
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
  target: 'node',
  stats: process.env.NODE_ENV === 'production' ? 'normal' : 'minimal',
  watch: process.env.NODE_ENV !== 'production',
};
