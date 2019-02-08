module.exports = {
  entry: './index',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  resolve: {
    alias: {
      csstag: 'babel-plugin-csstag/csstag',
    },
  },
  module: {
    rules: [
      {
        exclude: /\/node_modules\//,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['babel-plugin-csstag'],
            presets: ['@babel/env'],
          },
        },
      },
    ],
  },
};
