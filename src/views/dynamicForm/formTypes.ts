import { FormValidateCallback } from "element-plus";

// 基础字段类型
export type FieldType =
  | "input"
  | "password"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "datetime"
  | "map";

// 字段选项
export interface FieldOption {
  value: string | number;
  label: string;
}

// 条件操作符
export type ConditionOperator =
  | "=="
  | "!="
  | ">"
  | "<"
  | ">="
  | "<="
  | "includes"
  | "in"
  | "notIn"
  | "startsWith"
  | "endsWith";

// 单个条件
export interface FieldCondition {
  field: string;
  operator: ConditionOperator;
  value: any;
}

// 组合条件
export interface CombinedConditions {
  and?: FieldCondition[] | CombinedConditions[];
  or?: FieldCondition[] | CombinedConditions[];
}

// 验证规则
export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  validator?: (
    rule: any,
    value: any,
    callback: FormValidateCallback
  ) => Promise<void>;
  message?: string;
  trigger?: string | string[];
}

// 动态规则
export interface DynamicRule {
  conditions?: FieldCondition | CombinedConditions;
  rule: ValidationRule;
  trigger?: string | string[];
}

// 数据联动类型
export type LinkageType = "direct" | "mapping" | "function" | "concatenate";

// 数据联动配置
export interface FieldLinkage {
  type: LinkageType;
  sourceField?: string;
  mapping?: Record<string, any>;
  fn?: (sourceValue: any, formData: Record<string, any>) => any;
  fields?: string[];
  separator?: string;
}

// 表单字段定义
export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  defaultValue?: any;
  options?: FieldOption[];
  conditions?: FieldCondition | CombinedConditions;
  required?: boolean;
  requiredMessage?: string;
  rules?: ValidationRule;
  dynamicRules?: DynamicRule[];
  linkage?: FieldLinkage;
  validateOnChange?: boolean;
}

// 表单数据
export type FormData = Record<string, any>;
