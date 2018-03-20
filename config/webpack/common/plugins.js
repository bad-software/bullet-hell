import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { paths } from './paths'
import { minifyOptions } from '../../minify'

export function plugins() {
  return [
    new ExtractTextPlugin( 'styles.css' ),
    new FaviconsWebpackPlugin({
      background: '#18181d',
      emitStats: false,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
      inject: true,
      logo: path.resolve( paths.resources, 'favicon.png' ),
      persistentCache: true,
      title: 'Bullet Hell',
    }),
    new HtmlWebpackHarddiskPlugin(),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      minify: minifyOptions,
      template: path.resolve( paths.src, 'index.ejs' ),
      title: 'Bullet Hell',
    }),
  ]
}