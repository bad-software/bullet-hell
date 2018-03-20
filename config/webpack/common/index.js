//const config = require( 'config' )
import { alias } from './alias'
import { loaders } from './loaders'
import { paths } from './paths'
import { plugins } from './plugins'


export const webpackConfig = {
  context: paths.src,
  entry: {
    app: './index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: paths.dist,
  },
  module: {
    loaders: [
      loaders().babel,
      loaders().cssModules,
      loaders().stylesheets,
    ],
  },
  node: {
    fs: 'empty'
  },
  plugins: plugins(),
  resolve: {
    alias: alias(),
    extensions: ['*', '.js', '.jsx'],
    modules: [
      paths.src,
      'node_modules'
    ],
  },
}