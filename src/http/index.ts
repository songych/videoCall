/*
 * @Description: 异步请求全局设置
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-21 22:49:22
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 18:48:37
 */

import axios from 'axios';
import {message} from 'antd';

const BASE_URL = '/api';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000
})

// 自定义拦截器
// 请求拦截器
instance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// 响应拦截器
instance.interceptors.response.use(
  (response: any) => {
    if (response.status === 200) {
      return response;
    } else {
      // Toast.offline('网络出现问题');
      return
    }
  },
  error => {
    console.log(`${error}😢`);
    return;
  });




/**
 * @description: 二次封装
 * @param {type}
 * @return {type}
 * @author: zdJOJO
 */

const http = {

  get: function (url: string, params: object) {
    return instance.get(url, {params})
      .then(response => {
        if (response.data.code === 0) {
          return response.data.data || response.data.result;
        } else {
          // Toast.fail(`${response.data.message} 😢`);
          return
        }
      }).catch(err => {
        // Toast.fail(`请求失败${err} 😢`);
        return Promise.reject(err)
      })
  },

  post: function (url: string, param: any, isForm = false) {
    let contentType = 'application/json;charset=UTF-8';
    if (isForm) {
      contentType = 'application/x-www-form-urlencoded';
    }
    return instance.post(
      url,
      param,
      {
        headers: {
          'Content-Type': contentType
        }
      })
      .then(response => {
        console.log('response.data');
        console.log(response.data);
        if (response.data.code=== 0) {
          return response.data.result || response.data.data || true;
        } else {
          message.error(response.data.msg || '服务异常，请联系管理员');
          return false;
        }
      }).catch(err => {
        // Toast.fail(`请求失败${err} 😢`);
        return Promise.reject(err)
      })
  },
  delete: function () {
    // todo
  },
  put: function () {
    // todo
  }
}

export default http;