import { FormField } from "../formTypes";

export const checkMapEmpty = (
  rule: any,
  value: any,
  callback: any,
  fieldSchema: FormField
) => {
  if (value.length == 0) {
    callback(new Error(`${fieldSchema.label}不能为空`));
  } else if (value.some((it) => it.key == "")) {
    callback(new Error(`${fieldSchema.label}key值不能为空`));
  } else {
    callback();
  }
};
