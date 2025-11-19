<template>
  <el-dialog v-model="visable" :title="titleRef" width="400">
    <p class="tips">
      {{
        delList.length > 1
          ? `是否确认删除${typeTitle}？`
          : `是否确认删除此${typeTitle}？`
      }}
    </p>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="delSubmit">删除</el-button>
        <el-button @click="visable = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
// import { delApp } from "@/core/api/applicationMgr";
// import { delBatchApp } from "@/core/api/schedulerMgr";
import { ElMessage } from "element-plus";

const emits = defineEmits(["successCB"]);
const visable = ref(false);
const delList = ref<any>([]); // 删除的列表
const typeTitle = ref("");
const titleRef = computed(() =>
  delList.value.length > 1 ? `批量删除 (${delList.value.length})` : "删除提示"
);

let cbHandler = null;
const open = (list, title = "调度器", cb?) => {
  visable.value = true;
  delList.value = list;
  typeTitle.value = title;
  cbHandler = cb;
};
const close = () => {
  visable.value = false;
};

const delSubmit = async () => {
  // const delHandler = delList.value.length == 1 ? delApp : delBatchApp;
  // const { code,data } = await delHandler(delList.value.map((item) => item.id).toString());
  // if (code == 200) {
  //   ElMessage.success(data?.data??"删除成功！");
  //   close();
  //   emits("successCB");
  //   typeof cbHandler == "function" && (cbHandler as Function)();
  // } else {
  //   ElMessage.error(data?.data??"删除失败！");
  // }
};

defineExpose({ open, close });
</script>

<style scoped lang='scss'>
.tips {
  padding: 6px 0 20px 10px;
}
</style>