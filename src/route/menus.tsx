/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 23:36:08
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-03 14:13:15
 * @FilePath: \antd-cms\src\route\menus.tsx
 */
import React from 'react';
import {
  HomeOutlined,
  ApartmentOutlined,
  SettingOutlined,
  TableOutlined
} from '@utils/antdIcons';

import {
  ROOT,
} from './';
import { IMenu } from 'types/index';



export const menus: Array<IMenu> = [
  {
    name: '首页',
    en_name: 'Home',
    path: ROOT,
    icon: <HomeOutlined />,
    permKey: true,
    children: []
  },
];