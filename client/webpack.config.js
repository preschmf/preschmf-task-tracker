const path = require('path')
const outputDirectory = path.resolve(__dirname, 'public')
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './index.tsx',
  output: {
    path: outputDirectory,
    filename: 'main.js',
    publicPath: '/',
  },
  stats: {
    errorDetails: true,
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_SERVER_URL': JSON.stringify('https://preschmf-task-tracker-api.up.railway.app'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
}
