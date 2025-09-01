/**
 * 根据条件判断是否展示该字段
 * @param conditions
 * @param formData
 * @returns Boolean
 * @description 解析条件表达式，支持多条件与/或的组合
 */
export function evaluateConditions(conditions, formData) {
  if (!conditions || Object.keys(conditions).length === 0) return true;

  if (conditions.and) {
    return conditions.and.every((cond) => evaluateCondition(cond, formData));
  }

  if (conditions.or) {
    return conditions.or.some((cond) => evaluateCondition(cond, formData));
  }

  return evaluateCondition(conditions, formData);
}

/**
 * 根据条件判断是否展示该字段
 * @param condition
 * @param formData
 * @returns Boolean
 * @description 解析单个条件表达式
 */
function evaluateCondition(condition, formData) {
  const { field, operator, value } = condition;
  const fieldValue = getNestedValue(formData, field);

  switch (operator) {
    case "==":
      return fieldValue == value;
    case "!=":
      return fieldValue != value;
    case ">":
      return fieldValue > value;
    case "<":
      return fieldValue < value;
    case "includes":
      return (fieldValue || "").includes(value);
    case "in":
      return (value || []).includes(fieldValue);
    default:
      return false;
  }
}

/**
 * @param obj
 * @param path
 * @returns value
 * @description 通过路径获取嵌套对象的值，支持多层嵌套
 */
function getNestedValue(obj, path) {
  return path.split(".").reduce((o, p) => o?.[p], obj);
}
