/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 18:45:37
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-03 19:18:53
 * @FilePath: \antd-cms\types\index.d.ts
 */

import { ReactNode } from 'react';

/**
 * path需要保持唯一
 * permKey 表示权限Key值  permKey: true表示所有用户都有权限
 * enName 表示翻译文本对应的key
 */
export interface IMenu {
  path: string
  name: string
  en_name: string
  permKey: string | boolean
  icon?: string | ReactNode
  children?: Array<IMenu>
}

export interface IHeadMenu {
  key: string
  label: string
  icon?: string | ReactNode
  local?: string
}


export interface IRoute {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}

