const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.npm_lifecycle_event === 'build';
const port = parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || 'localhost';
const version = process.env.VERSION || require('./package.json').version;
const mode = isProd ? 'production' : 'development';


const root = (...args) => {
  return path.join.apply(path, [process.cwd()].concat(args));
}

module.exports = {
  mode,
  entry: {
    app: './src/main.ts',
  },
  output: {
    path: root('dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        type: 'javascript/auto',
        include: root('src', 'static.json'),
        options: {
          name: '[name].[ext]'
        }
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: root('src', 'index.ejs'),
      version,
      isProd,
    }),
  ],
  devServer: {
    host,
    port,
    stats: 'errors-only',
  },
  devtool: isProd ? '#source-map' : '#eval-source-map',
};

if (isProd) {
  module.exports.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }));
}