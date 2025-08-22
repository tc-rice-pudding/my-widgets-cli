import type { FormRules } from "element-plus";
import { checkPwd } from "@/utils/validate";

import { reactive } from "vue";

export const rules = reactive<FormRules>({
  password: [{ required: true, trigger: "change", validator: checkPwd }],
});
