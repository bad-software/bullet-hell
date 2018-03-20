import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { paths } from './paths'

export function loaders() {
  return {
    babel: {
      test: /\.(js)$/, // (js|jsx)?
      exclude: /node_modules/,
      loader: 'babel-loader',
    },

    stylesheets: {
      // Standard processing for Sass stylesheets
      test: /\.scss$/,
      include: path.join( paths.src, 'stylesheets' ),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {loader: 'css-loader'},
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {

            },
          },
        ]
      })
    },

    cssModules: {
      // Component SCSS loader
      // When required, the class names in these
      // .css are returned as an object after
      // being made unique. The css with the
      // modified class names is injected into the DOM.
      test: /^(?!.*\.inject\.(css|scss)).*\.(css|scss)$/,
      include: path.resolve( paths.src, 'components' ),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader' +
            '?modules' +
            '&sourceMap' +
            '&importLoaders=1' +
            '&localIdentName=[name]__[local]___[hash:base64:5]'
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve( paths.src, 'stylesheets' )],
            },
          },
        ]
      }),
    },
  }
}