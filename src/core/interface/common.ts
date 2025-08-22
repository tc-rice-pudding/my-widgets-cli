/**
 * 此类型声明文件放置全局公共组件的类型声明
 * 部分不规范的地方后续优化
 */
export type IColumnFixed = true | "left" | "right";
export type IUploadListType = "text" | "picture" | "picture-card";
export type IButtonType = "primary" | "success" | "warning" | "danger" | "info";

export interface IUploadBtnConfig {
  text?: string;
  btnType?: IButtonType;
  loading?: boolean;
}
export interface Colums {
  prop?: string;
  label?: string;
  type?: string;
  showTooltip?: boolean;
  "min-width"?: string;
  labelSlot?: string;
  tdSlot?: string;
  width?: string;
  fixed?: IColumnFixed;
  // formatter?: Function;
}

export type IFormLabelPostion = "left" | "top" | "right";

export interface Pagination {
  pageNum: number;
  pageSize: number;
  total?: number;
  pageSizes?: Array<number>;
}
export interface TableMethods {
  label: string;
  value: string;
  type: string;
  size: string;
  //如果需要展示为disabled 状态请传入disabled: true 或方法
  disabled: boolean | Function;
  tdSlot?: string;
  show: (row: any) => boolean;
}

export interface IBaseResponse<T> {
  [x: string]: any;
  code: number;
  data: T;
  message: string;
  result: T;
}

export interface TableHeaderOption {
  addText?: string;
  deleteText?: string;
  isShowAddBtn?: boolean;
  isShowDeleteBtn?: boolean;
  loading?: boolean;
}

export interface ISearchPage {
  page: number;
  pageSize: number;
}

export type UploadListType = "text" | "picture" | "picture-card";

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export interface UploadBtnConfig {
  text?: string;
  btnType?: ButtonType;
  loading?: boolean;
}

export interface FormSelectFieldValue {
  field: string;
  value: string | number;
}

export interface FormFiles {
  field: string;
  type: string;
  filterable: boolean;
  clearable?: boolean;
  multiple?: boolean;
  label: string;
  value?: string | number;
  optionKey: string;
  optionName: string;
  placeholder?: string;
  options: Array<FormSelectFieldValue>;
}
export interface FormInputInfo {
  field: string;
  label: string;
}
