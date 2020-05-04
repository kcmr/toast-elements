const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    devtool: 'source-map',
    context: __dirname,
    entry: './demo/index.js',
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            { loader: 'to-string-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './demo/index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};
