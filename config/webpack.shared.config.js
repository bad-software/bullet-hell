const path = require( 'path' )

// Options
const minifyOptions = require( './options.minify' )

// Plugins
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const HtmlWebpackHarddiskPlugin = require( 'html-webpack-harddisk-plugin' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )


const webpackConfig = {
  context: path.join( __dirname, '../src' ),
  entry: {
    app: './index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join( __dirname, '../public' ),
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
      path.resolve( __dirname, '../src' ),
      'node_modules'
    ],
  },
}


function alias() {
  return {
    Components: path.resolve( __dirname, '../src/components' ),
    Controllers: path.resolve( __dirname, '../src/controllers' ),
    Data: path.resolve( __dirname, '../src/data' ),
    Layouts: path.resolve( __dirname, '../src/components/_Layouts' ),
    Lib: path.resolve( __dirname, '../src/lib' ),
    Models: path.resolve( __dirname, '../src/models' ),
  }
}

function loaders() {
  return {
    babel: {
      test: /\.(js)$/, // (js|jsx)?
      exclude: /node_modules/,
      loader: 'babel-loader',
    },

    stylesheets: {
      // Standard processing for Sass stylesheets
      test: /\.scss$/,
      include: path.join(__dirname, '../src/stylesheets/'),
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
      include: path.resolve( __dirname, '../src/components' ),
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
              includePaths: [path.resolve(__dirname, '../src/stylesheets')],
            },
          },
        ]
      }),
    },
  }
}

function plugins() {
  return [
    new ExtractTextPlugin( 'styles.css' ),
    new HtmlWebpackHarddiskPlugin(),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      minify: minifyOptions,
      template: '../src/index.ejs',
      title: 'Bullet Hell',
    })
  ]
}


module.exports = webpackConfig