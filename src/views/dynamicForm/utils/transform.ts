import { length } from "@antv/x6/lib/registry/edge-anchor/length";
import { FormField } from "../formTypes";

/**
 * 将接口 schema 转换为内部 schema
 * @param fieldList
 * @param res
 * @param conditions
 */
export const transformToNativeSchema = (fieldList, res, conditions = {}) => {
  fieldList.forEach((it) => {
    res.push({
      name: it.name,
      label: it.label,
      type: it.type,
      required: it.required,
      defaultValue: it.value ?? it.defaultVal,
      ...(it.options?.length ? { options: it.options } : {}),
      ...(conditions && Object.keys(conditions).length ? { conditions } : {}),
    } as FormField);
    if (it.dataType == "object") {
      it.options.forEach((child) => {
        if (child.fields) {
          transformToNativeSchema(child.fields, res, {
            field: it.name,
            operator: "==",
            value: child.value,
          });
        }
      });
    }
  });
};

// 将内部 schema 转换为接口 schema
export const transformToApiSchema = (
  fieldList: any[],
  formData: Object,
  opsChecked: boolean = true
) => {
  fieldList.forEach((it) => {
    it.value = opsChecked ? formData[it.name] : null;

    if (it.dataType === "object") {
      it.options.forEach((child) => {
        if (child.fields) {
          transformToApiSchema(child.fields, formData, it.value == child.value);
        }
      });
    }
  });
};
