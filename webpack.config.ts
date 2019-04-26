import { Configuration, DllReferencePlugin } from 'webpack'
import { Configuration as DevConf } from 'webpack-dev-server'
import styledTransformer from 'typescript-plugin-styled-components'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin'
import HardSourcePlugin from 'hard-source-webpack-plugin'

import { resolve } from 'path'

import dll from './dev/dll.json'

interface Conf extends Configuration {
  devServer?: DevConf
}

const { NODE_ENV = 'development' } = process.env

const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'

const Conf: Conf = {
  mode: NODE_ENV as Conf['mode'],
  devtool: isDev && 'cheap-module-eval-source-map',
  entry: {
    app: ['./src'],
  },
  devServer: {
    contentBase: resolve('out'),
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
  output: {
    publicPath: '/',
    path: resolve('out'),
    filename: `public/${isDev ? '[name].js' : '[name]_[hash].js'}`,
    chunkFilename: `public/${isDev ? '[name].js' : '[name]_[chunkhash].js'}`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            forceIsolatedModules: true,
            reportFiles: ['src/**/*.{ts,tsx}'],
            useCache: true,
            cacheDirectory: './node_modules/.cache/ts',
            ...(isDev
              ? {
                  transpileOnly: true,
                  getCustomTransformers: () => ({
                    before: [
                      styledTransformer({
                        getDisplayName: (filename, displayName) =>
                          `${displayName}_${filename
                            .replace(__dirname, '')
                            .replace(/\.tsx?$/, '')
                            .replace(/\//g, '_')}`,
                      }),
                    ],
                  }),
                }
              : {}),
          },
        },
      },
    ],
  },
  plugins: [
    new HardSourcePlugin({}),
    new DllReferencePlugin({
      manifest: dll as any,
      context: __dirname,
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
      },
    }),
    new AddAssetHtmlPlugin([
      {
        publicPath: '/public',
        outputPath: '/public',
        filepath: require.resolve(`./out/public/${dll.name}.js`),
      },
    ]),
  ],
}

export default Conf
