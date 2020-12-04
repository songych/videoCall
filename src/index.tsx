/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 16:32:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-03 19:55:15
 * @FilePath: \antd-cms\src\index.tsx
 */

import React from 'react'
import ReactDOM from 'react-dom';
import {
  // BrowserRouter as Router
  HashRouter as Router
} from 'react-router-dom';

import { ConfigProvider } from 'antd';
import en_US from 'antd/lib/locale-provider/en_US';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import App from './App';

// 当导航需要确认时执行的函数
const getUserConfirmation = (message: string, callback: any) => {
  callback(console.log(message))
}

// 用来判断本地浏览器是否支持刷新
const supportsHistory = 'pushState' in window.history;

ReactDOM.render(

  <Router
    getUserConfirmation={getUserConfirmation}
  >
    <ConfigProvider locale={zh_CN}>
      <App />
    </ConfigProvider >
  </Router>

  , document.getElementById('root')
);