/*
 * @Description:
 * @Author: djq
 * @Date: 2023-03-21 15:05:27
 * @LastEditTime: 2023-03-21 15:37:39
 * @LastEditors: djq
 */

import request from "@/utils/request";

const requestParams: string = (window as any).globalConstant.requestParams;
const baseUrl: string = (window as any).globalConstant.baseUrl;

/**
 *
 * @param data
 * @returns 接口返回值
 */

export const commonQuery = (data) =>
    request.post(`/msg/gz-cloud/common?queryId=${data.queryId}`, {
        ...data,
        dbSource: "gzclouddb",
    });


// 分页查询
export const commonQueryByPage = (
    queryId: String,
    data: any,
    pageNum: Number = 1,
    pageSize: Number = 10,
    apiPath: any = null,  //接口参数
    host: any = null,  //环境地址
    dbSource: String = 'rcsDb',
) => {
    if (!data) data = {};
    if (apiPath) {
        return request.post(`${baseUrl}/${apiPath}/common`, {
            queryId: queryId,
            params: data,
            dbSource: dbSource,
            type: 'query',
            pageNum,
            pageSize,
        });
    } else {
        return request.post(
            `${baseUrl}/${requestParams}/common`,
            {
                queryId: queryId,
                params: data,
                dbSource: dbSource,
                type: 'query',
                pageNum,
                pageSize,
            }
        );
    }
};