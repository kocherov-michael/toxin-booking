const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { VueLoaderPlugin } = require('vue-loader')

// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: path.join(__dirname, '../src'),
  // dist: path.join(__dirname, '../dist'),
  docs: path.join(__dirname, '../docs'),
  assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: PATHS.src
  // {
    // app: PATHS.src,
    // module: `${PATHS.src}/your-module.js`,
    // 'room-details': `${PATHS.src}/js/room-details.js`,
  // }
  ,
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    // path: PATHS.dist,
    path: PATHS.docs,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
    //   test: /\.vue$/,
    //   loader: 'vue-loader',
    //   options: {
    //     loader: {
    //       scss: 'vue-style-loader!css-loader!sass-loader'
    //     }
    //   }
    // }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        // name: '[name].[ext]'
        name: 'assets/img/[name].[ext]'
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }]
  },
  resolve: {
    alias: {
      '~': PATHS.src
      // 'vue$': 'vue/dist/vue.js',
    }
  },
  plugins: [
    // new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    //   filename: `${PATHS.assets}css/main.css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/static`, to: '' },
    ]),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    }))
  ],
}
