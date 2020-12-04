/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 19:39:20
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 00:09:02
 * @FilePath: \test\postcss.config.js
 */
// browserslist 配置在 package.js中
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')
  ]
};