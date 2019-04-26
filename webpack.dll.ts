import { DllPlugin, Configuration } from 'webpack'
import { resolve } from 'path'
import HardSourcePlugin from 'hard-source-webpack-plugin'

import pkg from './package.json'

const library = '[name]_[hash]'

const { NODE_ENV = 'development' } = process.env

const {
  // 'styled-components': styledComponents,
  'react-hot-loader': hotLoader,
  ...dependencies
} = pkg.dependencies

const conf: Configuration = {
  mode: NODE_ENV as Configuration['mode'],
  entry: {
    libs: Object.keys(dependencies),
  },

  output: {
    library,
    filename: `${library}.js`,
    path: resolve('out/public'),
  },

  plugins: [
    new HardSourcePlugin({}),
    new DllPlugin({
      name: library,
      path: resolve('dev/dll.json'),
    }),
  ],

  performance: {
    hints: false,
  },
}

export default conf
