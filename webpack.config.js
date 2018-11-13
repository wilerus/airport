const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const GRAPHICS_LIMIT = 1000000;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },

  devtool: 'source-map',

  optimization: {
    noEmitOnErrors: true,
    concatenateModules: true,
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: true,
        parallel: true,
        cache: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          },
          safe: true
        }
      })
    ]
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: 'ts-loader'
          },
          esModule: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'raw-loader'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: GRAPHICS_LIMIT,
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: GRAPHICS_LIMIT,
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.(png|jpe?g|gif).*$/,
        loader: 'url-loader',
        options: {
          limit: GRAPHICS_LIMIT
        }
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: GRAPHICS_LIMIT,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: GRAPHICS_LIMIT,
          mimetype: 'application/font-woff2'
        }
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/resources'),
        to: path.resolve(__dirname, 'dist/resources')
      }
    ])
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    stats: {
      colors: true,
      chunks: false,
      source: false,
      hash: false,
      modules: false,
      errorDetails: true,
      version: false,
      assets: false,
      chunkModules: false,
      children: false
    },
    port: 8080
  }
};
