import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const CSS_LOADER = 'css-loader'
const projectRoot = path.join(__dirname, '../')
const nodeModulesDir = path.join(__dirname, '../node_modules')
console.log(nodeModulesDir)
const config = {
  entry: {
    module: './src/index.js',
    client: './dev/client/index.js'
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, './build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    fallback: nodeModulesDir
  },
  resolveLoader: {
    fallback: nodeModulesDir,
    root: nodeModulesDir
  },
  cache: true,
  debug: true,
  module: {
    loaders: [{
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(`${CSS_LOADER}!postcss-loader`)
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}

export default config
