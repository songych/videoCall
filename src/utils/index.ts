/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-27 00:05:23
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-01 18:28:33
 * @FilePath: \antd-cms\src\utils\index.ts
 */

import dayjs from 'dayjs';

// 时间转换
export const transformTime = (dataStr: string, pattern = 'YYYY-MM-DD HH:mm:ss'): any => dayjs(dataStr).format(pattern);