/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-25 23:36:24
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-02 14:15:37
 * @FilePath: \test\babel.config.js
 */
module.exports = {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "@babel/plugin-external-helpers",
    "@babel/plugin-transform-runtime",
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "import",
      {
        "libraryName": "antd-mobile",
        "libraryDirectory": "es",
        "style": true
      }
    ] // `style: true` 会加载 less 文件
  ]
}