/*
 * @Description: 
 * @Author: wx
 * @Date: 2023-03-17 14:44:36
 * @LastEditTime: 2023-03-20 17:47:46
 * @LastEditors: wx
 */
import request from '@/utils/request';
const requestParams = (window as any).globalConstant.requestParams

// 获取/删除/查询/编辑
export const operateAppList = (queryId,params,type='query') => {
  let data = {
    queryId: queryId,
    params: params,
    type: type,
    dbSource: "gzclouddb",
  }
  return request.post<any>(`${requestParams}/common`, data)
}
