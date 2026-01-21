<template>
  <el-dialog class="batch-import-dataset-container" :model-value="state.visible"
    title="`批量导入`" width="640px" @close="handleClose">
    <div class="select-container">
      <el-upload :file-list="state.fileList" class="upload-demo" drag action="#" multiple :before-upload="beforeUpload"
        :http-request="httpRequest" :before-remove="beforeRemove">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽或点击上传文件（Excel）</div>
        <template #tip>
          <div class="el-upload__tip">
            <el-icon>
              <Warning />
            </el-icon>
            已存在的会进行覆盖处理
            <el-button link type="primary" style="float: right" @click="handleTemplate">
              下载模板
            </el-button>
          </div>
        </template>
      </el-upload>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" color="#216DD9" :loading="state.btnLoading" @click="save">
          导入
        </el-button>
        <el-button @click="handleClose()">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { excelExport } from "@/utils/common";
// import { downloadTemplate, importData } from "@/core/api/applicationMgr";

const emit = defineEmits(["handleClose", "successCB"]);

const state = reactive({
  visible: false,
  rowInfo: {} as any,
  btnLoading: false,
  fileList: [] as any[],
});

const beforeUpload = (file) => {
  if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    return true;
  } else {
    ElMessage.error("请上传正确格式的文件");
    return false;
  }
};

const httpRequest = ({ file }) => {
  state.fileList.push(file);
};

const beforeRemove = (uploadFile, uploadFiles) => {
  const removeFileIndex = uploadFiles.findIndex((i) => i.uid == uploadFile.uid);
  state.fileList.splice(removeFileIndex, 1);
};

const handleClose = () => {
  state.fileList = [];
  emit("handleClose");
  close();
};

const successCB = () => {
  emit("successCB");
  state.fileList = [];
  close();
};

const save = async () => {
  if (state.fileList.length == 0) return;

  const formData = new FormData();
  formData.append("file", state.fileList[0]);
  formData.append("type", '');
  // const res: any = await importData(formData);
  // try {
  //   const reader = new FileReader();
  //   reader.readAsText(res.data, "utf-8");
  //   reader.onload = function () {
  //     try {
  //       const { code, msg } = JSON.parse(reader.result as string);
  //       if (code == "200") {
  //         ElMessage.success("导入成功");
  //       } else {
  //         ElMessage.error(msg);
  //       }
  //     } catch {
  //       excelExport({
  //         content: res.data,
  //         name: "任务管理导入失败",
  //       });
  //       ElMessage.error("导入失败，请在失败文件中查看具体信息");
  //     }
  //   };
  // } catch (error) {
  //   const { code, msg }: any = res;
  //   if (code == "200") {
  //     ElMessage.success("导入成功");
  //   } else {
  //     ElMessage.error(msg);
  //   }
  // }
  successCB();
};

const handleTemplate = () => {
  // handler().then((res) => {
  //   excelExport({ content: res.data, name: `xxx模版` });
  // }).catch(() => {
  //   ElMessage.error("下载失败");
  // });
};

const open = (row) => {
  state.rowInfo = row;
  state.visible = true;
};
const close = () => {
  state.visible = false;
};
defineExpose({
  open,
  close,
});
</script>
<style lang="scss" scoped>
.batch-import-dataset-container {
  .name {
    margin-bottom: 16px;

    .ds-icon {
      width: 17px;
      height: 16px;
      margin-right: 6px;
    }

    span {
      font-size: 14px;
      color: #000000;
      line-height: 20px;
      word-break: break-all;
    }
  }

  .auto-explore {
    margin: -9px 0 6px 0;
  }
}

.el-upload__tip {
  margin-top: 8px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  column-gap: 4px;
}
</style>
<style lang="scss">
.batch-import-dataset-container {
  padding: 0 !important;

  .el-dialog__header {
    padding-left: 28px !important;
  }

  .el-dialog__body {
    border: none;
    padding: 17px 28px !important;
  }
}
</style>
