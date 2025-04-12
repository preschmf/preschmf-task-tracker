const path = require('path')
const outputDirectory = path.resolve(__dirname, 'public')

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  output: {
    path: outputDirectory,
    filename: 'main.js',
    publicPath: '/',
  },
  target: 'web',
  devServer: {
    port: '9000',
    static: ['./public'],
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
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
