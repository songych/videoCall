const path = require('path');
console.log('process.env.NODE_ENV=');
console.log(process.argv);
// 动态生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 清除文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 抽取css代码
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 控制台删除无效的打印
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 给模块做缓存
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// 生产包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// js压缩
const TerserPlugin = require('terser-webpack-plugin');

//
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

//
const Webpack = require('webpack');

const port = 3000;
const {
  mode,
  isPro,
  lessLoader,
  lessAntdDesignLoader,
  cssLoader,
  tsxLoader,
  sourceLoader,
  fileLoader
} = require('./utils');

module.exports = {
  // 入口
  entry: mode === 'production'
    ?
    { main: path.resolve(__dirname, '../src/index.tsx') }
    :
    [
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.resolve(__dirname, '../src/index.tsx')  // 入口文件
    ],
  // entry: { "app": path.resolve(__dirname, '../src/index.tsx') },

  // 出口
  output: {
    path: path.join(__dirname, '../dist/'),
    publicPath: '/',  // 配和 BrowserRouter
    filename: 'js/[name].[hash:8].bundle.js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
  },

  // 生产模式下关闭map文件
  devtool: isPro ? 'none' : 'source-map',

  devServer: {
    host: '127.0.0.1',
    port: port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy:{
      '/api': {
          target: 'http://127.0.0.1:7001',
          changeOrigin: true,
          secure: true,
          logLevel: 'debug'
      }
    }
  },

  // 解析相关
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // import ** from 时，导入可以省略文件的拓展名
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@route': path.resolve(__dirname, '../src/route'),
      'react-dom': '@hot-loader/react-dom'
    }
  },

  // 模块
  module: {
    rules: [
      tsxLoader,
      isPro ? null : sourceLoader,
      cssLoader,
      lessLoader,
      lessAntdDesignLoader,
      fileLoader
    ].filter(Boolean)
  },

  // 插件
  plugins: [

    mode==='development' ? new Webpack.DllReferencePlugin({
      manifest: require('./dist/dll/vendor.manifest.json')
    }) : null,

    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash:8].css',
      chunkFilename: 'css/[id][contenthash:8].css'
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template/index.html'),  // 入口文件,
      inject: true,
      title: 'The Nebula',
      environment: process.env.NODE_ENV,
      injectJs: mode==='development'?'/dist/dll/vendor.dll.js': '',
      minify: {
        removeComments: true,                   // 移除注释
        collapseWhitespace: true               // 移除空格
      }
    }),

    // new AddAssetHtmlWebpackPlugin({
    //   filepath: path.resolve(__dirname, '../dll/dll.vendor.js'),
    // }),

    // new FriendlyErrorsPlugin(),
    mode === 'development' ? new Webpack.HotModuleReplacementPlugin() : null,
    mode === 'development' ? new HardSourceWebpackPlugin() : null,
    // mode === 'production' ? new CleanWebpackPlugin() : null,
    mode === 'production' ? new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }) : null,
    mode === 'production' ? new BundleAnalyzerPlugin() : null,
    new Webpack.DefinePlugin({
      'process.env': {
        'env': '"'+JSON.stringify(process.env.env)+'"'
      }
   })
  ].filter(Boolean),

  // 关闭文件过大检查
  performance: {
    hints: false
  },

  // 优化
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,  //表示在压缩前的最小模块大小,默认值是30kb
      minChunks: 1,  // 表示被引用次数，默认为1；
      maxAsyncRequests: 6,  //所有异步请求不得超过5个
      maxInitialRequests: 4,  //初始话并行请求不得超过3个
      automaticNameDelimiter: '~',
      name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 10 // 需要级别高点
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'antd',
          chunks: 'all',
          priority: 9 // 需要级别高点
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
          priority: -10
        },
        commons: {
          test: /src/,
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: -20
        },
        // 将css提取到一个CSS中
        styles: {
          name: 'styles',
          test: /\.(scss|css|less)$/,
          chunks: 'all',    // merge all the css chunk to one file
          enforce: true,
          reuseExistingChunk: true
        }
      }
    },

    runtimeChunk: {
      name: 'runtime'
    },

    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        },
        canPrint: false
      })
    ]
  }
}