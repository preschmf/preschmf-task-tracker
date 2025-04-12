const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const outputDirectory = path.resolve(__dirname, 'public')

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  output: {
    path: outputDirectory,
    filename: 'main.js',
  },
  target: 'web',
  devServer: {
    port: '9000',
    static: ['./public'],
    open: true,
    hot: true,
    liveReload: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
}
