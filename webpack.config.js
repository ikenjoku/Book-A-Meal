const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devOptions = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'client'),
  },
};

const prodOptions = {};

const options = process.env.NODE_ENV === 'production' ?
  prodOptions : devOptions;

module.exports = {
  ...options,
  entry: './client/index.js',
  output: {
    path: `${__dirname}/dist/client`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        // exclude: ['node_modules', 'test'],
        exclude: /node_modules/,
        query: {
          presets: ['stage-2', 'react', 'env'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true, minimize: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          }],
      },
      {
        test: /\.(woff(2)?|svg|png|jpg|gif)$/,
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
