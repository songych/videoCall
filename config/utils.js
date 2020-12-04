/*
 * @Description: utils.js
 * @Autor: zdJOJO
 * @Date: 2020-10-02 11:59:55
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-03 19:52:26
 * @FilePath: \antd-cms\config\utils.js
 */


const path = require('path');

// 抽取css代码
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 选取最后一个值
const mode = process.argv.slice(-1)[0];
const isPro = mode === 'production';

// cssloader对象
const cssLoder = {
  'production': {
    loader: MiniCssExtractPlugin.loader
  },
  'development': {
    loader: 'style-loader'
  }
}

// tsx解析器
const tsxLoader = {
  test: /\.(ts|tsx)$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/env',
          '@babel/react',
          '@babel/preset-typescript'
        ],
        plugins: [
          [
            'import',
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: true
            }
          ]
        ]
      }
    }
  ]
}

// 缓存解析器
const sourceLoader = {
  enforce: 'pre',
  test: /\.js$/,
  loader: 'source-map-loader'
}

// css 解析器
const cssLoader = {
  test: /\.css$/,
  use: [
    cssLoder[mode],
    {
      loader: 'css-loader',
      options: {
        modules: false  //关闭 css-modules功能
      }
    }
  ]
}

// less解析器
const lessLoader = {
  test: /\.less$/,
  // exclude: [/node_modules/],
  include: [/src/],
  use: [
    cssLoder[mode],
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]__[local]__[hash:base64:8]'
        }
      }
    },
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          modifyVars: require(path.resolve(__dirname, 'modifyVars.js')),
          javascriptEnabled: true
        }
      }
    }
  ]
}

// 针对 ant-design 不使用 css-module
const lessAntdDesignLoader = {
  test: /\.less$/,
  // exclude: [/src/],
  include: [/[\\/]node_modules[\\/].*antd/],
  use: [
    cssLoder[mode],
    {
      loader: 'css-loader',
      options: {
        modules: false //关闭 less-modules功能
      }
    },
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          modifyVars: require(path.resolve(__dirname, 'modifyVars.js')),
          javascriptEnabled: true
        }
      }
    }
  ]
}


// 图片 解析器
const fileLoader = {
  test: /\.(jpg|png|gif|svg)$/,
  loader: 'url-loader',
  options: {
    limit: 1024 * 8, // 8k以下的base64内联，不产生图片文件
    fallback: 'file-loader', // 8k以上，用file-loader抽离（非必须，默认就是file-loader）
    name: '[name].[ext]?[hash]' // 文件名规则，默认是[hash].[ext]
  }
}

module.exports = {
  mode,
  isPro,
  tsxLoader,
  sourceLoader,
  cssLoader,
  lessLoader,
  lessAntdDesignLoader,
  fileLoader
}