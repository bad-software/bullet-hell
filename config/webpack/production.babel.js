import webpack from 'webpack'
import CompressionPlugin from 'compression-webpack-plugin'
import { webpackConfig as commonConfig } from './common'


const webpackConfig = {
  ...commonConfig
}

// Production customization
webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    comments: false,
    sourceMap: false,
    mangle: true,
    minimize: true,
    verbose: false,
  })
)

// Emit gzip-compressed bundles
webpackConfig.plugins.push(
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 4096,
    minRatio: 0.8
  })
)

module.exports = webpackConfig