import { FormField } from "../formTypes";

const generatUnitName = (fieldName) =>
  `${fieldName}__${Math.random().toString(36).substring(2, 15)}`;
const removeUniqueName = (unitName) => unitName.split("__")[0];
/**
 * 将接口 schema 转换为内部 schema
 * @param fieldList
 * @param res
 * @param conditions
 */
export const transformToNativeSchema = (fieldList, res, conditions = {}) => {
  if(!Array.isArray(fieldList)) return;
  fieldList.forEach((it) => {
    it.unitName = generatUnitName(it.name);
    res.push({
      name: it.unitName,
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
            field: it.unitName,
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
  if(!Array.isArray(fieldList)) return;
  fieldList.forEach((it) => {
    it.value = opsChecked ? formData[it.unitName] : null;

    if (it.dataType === "object") {
      it.options.forEach((child) => {
        if (child.fields) {
          transformToApiSchema(child.fields, formData, it.value == child.value);
        }
      });
    }
  });
};
