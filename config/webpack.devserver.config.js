const sharedConfig = require( './webpack.shared.config' )

const webpackConfig = Object.assign(sharedConfig, {
  devServer: {
    contentBase: 'public',
    historyApiFallback: true,
    port: 8080,
  },
  devtool: 'inline-source-map',
})

module.exports = webpackConfig