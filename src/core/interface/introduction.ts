/*
 * @Description:
 * @Author: djq
 * @Date: 2023-03-17 13:23:50
 * @LastEditTime: 2023-03-20 16:10:55
 * @LastEditors: djq
 */
import { BaseResponse } from "@/interface/response";

export type RotationImg = {
  /**
   * 简介
   */
  id: string;
  briefDesc: string;
  /**
   * image的url
   */
  imageUrl: string;
  /**
   * 排序
   */
  sortNum: string;
  /**
   * 标题
   */
  title: string;
};
export type RotationImgRes = BaseResponse<RotationImg[]>;
export type ApplicationRes = BaseResponse<Application[]>;
export type ApplicationDescRes = BaseResponse<ApplicationDescRes>;
export type Application = {
  bannerImage?: string;
  briefDesc?: string;
  children?: Child[];
  docUrl?: string;
  hoverIcon: string;
  icon: string;
  id: string;
  name?: string;
  sdkUrl?: string;
  serviceDesc?: string;
};

export type Child = {
  api?: string;
  apiUrl?: string;
  apiVersion?: string;
  bannerImage?: string;
  docUrl?: string;
  briefDesc: string;
  hoverIcon?: string;
  name?: string;
  icon?: string;
  id?: string;
  qps?: string;
  sdkUrl?: string;
  serviceId?: string;
};

export type ApplicationDesc = {
  bannerImage: string;
  briefDesc: string;
  docUrl: string;
  hoverIcon: string;
  icon: string;
  id: number;
  name: string;
  productList: ProductList[];
  productMerit: ProductMerit[];
  sdkUrl: string;
  serviceDesc: string;
};

export type ProductList = {
  apiId?: string;
  briefDesc?: string;
  category?: string;
  icon?: string;
  introduceId?: number;
  level?: string;
  serviceId?: string;
  sortNum?: string;
  textDesc?: string;
  id?: string
  title?: string;
};

export type ProductMerit = {
  apiId?: string;
  briefDesc?: string;
  category?: string;
  icon?: string;
  introduceId?: number;
  level?: string;
  serviceId?: string;
  sortNum?: string;
  textDesc?: string;
  title?: string;
};


export type SelectTime = {
  serviceId: string
  queryType: string
  st: string
  et: string
}

export type eChartsList = {
  serviceCount: ServiceCountList[]
  serviceId: string
  serviceName: string
}

export type ServiceCountList = {
  count: string
  time: string
}