import { FormItemRule } from "element-plus";
import { FormData, FormField } from "../formTypes";
import { evaluateConditions } from "./conditionParser";

/**
 * @param fieldSchema
 * @param formData
 * @returns rules
 * @description 获取表单字段的校验规则
 */
export function getValidationRules(fieldSchema:FormField, formData: FormData): FormItemRule[] {
  let rules: any = [];

  // 基础必填规则
  if (fieldSchema.required) {
    rules.push({ required: true, message: fieldSchema.requiredMessage || `${fieldSchema.label}不能为空`, trigger: ['blur','change'] });
  }

  // 静态规则
  if (fieldSchema.rules) {
    if (fieldSchema.rules.pattern) {
      rules.push({ pattern: fieldSchema.rules.pattern, message: fieldSchema.rules.message || `${fieldSchema.label}格式不正确`, trigger: ['blur','change'] });
    }
  }

  // 动态规则
  if (fieldSchema.dynamicRules) {
    fieldSchema.dynamicRules.forEach((ruleDef) => {
      if (!ruleDef.conditions || evaluateConditions(ruleDef.conditions, formData)) {
        rules.push({...ruleDef.rule, trigger: ruleDef?.trigger || ['blur','change'] });
      }
    });
  }

  return rules;
}
