// ？ 为什么这里定义了res 类型 但是res 中没有result ts 却没有报错
export interface BaseResponse<T> {
  code: number;
  data: T;
  msg: string;
  total?: number;
  result: T;
}
