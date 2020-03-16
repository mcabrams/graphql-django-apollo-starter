const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');

const main = [
  './src/index.tsx',
];

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  entry: {
    main,
  },
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: '[name].js',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      useTypescriptIncrementalApi: true,
      memoryLimit: 4096,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: 'src/index.html',
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
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({ style: 'css' })],
              }),
            },
          },
        ],
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: {
    alias: { '@src': path.resolve(__dirname, 'src') },
    extensions: ['.tsx', '.ts', '.js'],
  },
};
