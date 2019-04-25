import webpack, { Configuration } from 'webpack'
import { Configuration as DevConf } from 'webpack-dev-server'

import HtmlWebpackPlugin from 'html-webpack-plugin'

interface Conf extends Configuration {
  devServer?: DevConf
}

const { NODE_ENV = 'development' } = process.env

const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'

const Conf: Conf = {
  mode: 'development',
  devServer: {
    host: 'localhost',
    overlay: {
      warnings: true,
      errors: true,
    },
    stats: {
      modules: false,
      errors: true,
      warnings: true,
    },
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.wasm', '.mjs', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: { loader: 'awesome-typescript-loader' },
      },
    ],
  },
  devtool: isDev && 'cheap-module-eval-source-map',
  entry: {
    app: ['./src'],
  },
  plugins: [new HtmlWebpackPlugin()],
}

export default Conf
