const path = require('path')
const webpack = require('webpack')
const loaders = require('./loaders')
const vendor = require('./vendor')

module.exports = function (env) {
  const environment = env === 'production' ? 'production' : 'development'

  let entryApp = [path.join(__dirname, '../src/client/app.tsx')]
  let plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(environment)
      }
    })
  ]

  if (environment === 'development') {
    entryApp = Array.prototype.concat(
      [
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/dev-server'
      ],
      entryApp
    )
  } else {
    plugins = Array.prototype.concat(
      [
        new webpack.ProvidePlugin({
          'Promise': 'es6-promise',
          'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
      ],
      plugins
    )
  }

  return {
    entry: {
      app: entryApp,
      vendor
    },
    output: {
      filename: '[name].bundle.js',
      path: path.join(__dirname, '../dist/public')
    },
    module: {
      loaders
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000'
        }
      }
    },
    plugins
  }
}