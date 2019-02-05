const path = require('path');

module.exports = {
  entry: './main.js',
  mode: 'development',
  output: {
    filename: 'temp.js',
    path: __dirname,
  },
  resolve: {
    alias: {
      './index.min.js': './babel-plugin-icss/stub',
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['./babel-plugin-icss'],
            presets: ['@babel/env'],
          },
        },
      },
    ],
  },
};
