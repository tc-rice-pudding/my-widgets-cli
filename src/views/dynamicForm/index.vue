<template>
  <div class="dynamic-form-test">
    <h1>动态表单演示</h1>
    <section style="height: calc(100% - 50px)">
      <el-scrollbar>
        <DynamicForm
          ref="dynamicFormRef"
          :formSchema="formSchema"
          @submit="submitHandler"
        />
        <el-button type="primary" @click="dynamicFormRef?.handleSubmit"
          >提交</el-button
        >
      </el-scrollbar>
      <el-scrollbar>
        <el-card class="form-data">
          <template #header>
            <h3>formSchema:</h3>
          </template>
          <pre>{{ formSchema }}</pre>
        </el-card>
      </el-scrollbar>
      <el-scrollbar>
        <el-card class="form-data">
          <template #header>
            <h3>当前表单数据:</h3>
          </template>
          <pre>{{ dynamicFormRef?.formData }}</pre>
        </el-card>
      </el-scrollbar>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import DynamicForm from "./components/DynamicForm.vue";
import type { FormField } from "./formTypes";
import { schemeDemo } from "./mock";
import {
  transformToApiSchema,
  transformToNativeSchema,
} from "./utils/transform";
import { cloneDeep } from "lodash";

const dynamicFormRef = ref();
const formSchema = ref<FormField[]>([
  //   {
  //     name: "userType",
  //     label: "用户类型",
  //     type: "select",
  //     defaultValue: "personal",
  //     options: [
  //       { value: "personal", label: "个人用户" },
  //       { value: "business", label: "企业用户" },
  //     ],
  //     validateOnChange: true,
  //   },
  //   {
  //     name: "companyName",
  //     label: "公司名称",
  //     type: "text",
  //     conditions: {
  //       field: "userType",
  //       operator: "==",
  //       value: "business",
  //     },
  //     required: true,
  //   },
  //   {
  //     name: "idNumber",
  //     label: "证件号码",
  //     type: "text",
  //     required: true,
  //     dynamicRules: [
  //       {
  //         conditions: { field: "userType", operator: "==", value: "personal" },
  //         rule: {
  //           pattern: /^\d{17}[\dXx]$/,
  //           message: "请输入有效的身份证号码",
  //           trigger: "blur",
  //         },
  //       },
  //       {
  //         conditions: { field: "userType", operator: "==", value: "business" },
  //         rule: {
  //           pattern: /^[A-Z0-9]{18}$/,
  //           message: "请输入有效的统一社会信用代码",
  //           trigger: "blur",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     name: "email",
  //     label: "电子邮箱",
  //     type: "text",
  //     required: true,
  //     rules: {
  //       pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  //       message: "请输入有效的邮箱地址",
  //     },
  //   },
  //   {
  //     name: "confirmEmail",
  //     label: "确认电子邮箱",
  //     type: "text",
  //     required: true,
  //     dynamicRules: [
  //       {
  //         rule: {
  //           validator: (rule, value, callback) => {
  //             return value === dynamicFormRef.value.formData.email
  //               ? callback()
  //               : callback(new Error("邮箱地址不匹配"));
  //           },
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     name: "province",
  //     label: "省份",
  //     type: "text",
  //   },
  //   {
  //     name: "city",
  //     label: "城市",
  //     type: "text",
  //   },
  //   {
  //     name: "fullAddress",
  //     label: "完整地址",
  //     type: "text",
  //     linkage: {
  //       type: "concatenate",
  //       fields: ["province", "city"],
  //       separator: " ",
  //     },
  //   },
]);

const submitHandler = (formData) => {
  ElMessage.success("表单提交成功! 查看控制台输出数据!");
  // 这里可以进行进一步的处理，比如发送到服务器等

  const apiSchema = cloneDeep(schemeDemo);
  transformToApiSchema(apiSchema, formData);
  console.log("Submitted Data:", apiSchema);
};

onMounted(() => {
  setTimeout(() => {
    formSchema.value = [];
    transformToNativeSchema(schemeDemo, formSchema.value);
    console.log("Transformed Form Schema:", formSchema.value);
  }, 100);
});
</script>

<style lang="scss" scoped>
.dynamic-form-test {
  height: 100%;
  padding: 20px;

  section {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 20px;
  }
}

.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 4px;
}

.form-field {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3aa876;
}
</style>