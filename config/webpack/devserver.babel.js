import { webpackConfig as commonConfig } from './common'

const webpackConfig = {
  ...commonConfig,
  devServer: {
    compress: true,
    contentBase: 'public',
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
  },
  devtool: 'inline-source-map'
}

module.exports = webpackConfig