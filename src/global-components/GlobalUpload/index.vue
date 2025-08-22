<template>
  <el-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    :action="action"
    :headers="headers"
    :data="data"
    :auto-upload="autoUpLoad"
    :drag="drag"
    :multiple="multiple"
    :list-type="listType"
    :limit="limitNum"
    :disabled="fileList.length === limitNum"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemoveScoped"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :on-error="onError"
  >
    <template v-if="listType === 'text' && !drag">
      <el-button
        :type="uploadBtnConfig.btnType"
        :loading="loading"
        :disabled="fileList.length === limitNum"
      >
        {{ uploadBtnConfig.text }}
      </el-button>
    </template>
    <div v-if="['picture', 'picture-card'].includes(listType)">
      <el-icon><Plus /></el-icon>
    </div>
    <div v-if="listType === 'text' && drag">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽或点击上传文件（Excel）</div>
    </div>
    <template #tip>
      <slot name="tip"></slot>
    </template>
  </el-upload>
  <div class="tempList" v-if="tempList.length">
    <div class="temp-item" v-for="(item, index) in tempList" :key="index">
      <div class="temp-name">
        <el-icon><Document /></el-icon>
        <span class="temm-item-name">{{ item.fileName || "" }}</span>
      </div>
      <div class="temp-download-btn pointer" @click="handleTemplate(item)">
        下载模版
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" class="preview-img" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, PropType, watchEffect } from "vue";
import { IUploadListType, IUploadBtnConfig } from "@/core/interface/common";
import {
  ElMessage,
  ElMessageBox,
  UploadFiles,
  UploadProps,
  UploadUserFile,
} from "element-plus";
import type { UploadFile, UploadInstance } from "element-plus";
import auth from "@/utils/token";

const uploadRef = ref<UploadInstance>();
defineExpose({
  uploadRef,
});
const props = defineProps({
  // 请求 URL
  action: {
    type: String,
    required: true,
    default: "",
    // default: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
  },
  // 设置上传的请求头部
  headers: {
    type: Object,
    required: false,
    default: () => ({
      Authorization: auth.getToken(),
    }),
  },
  // 上传时附带的额外参数
  data: {
    type: Object,
    required: false,
    default: {},
  },
  // 上传按钮
  uploadBtnConfig: {
    default: () => ({
      text: "点击上传",
      btnType: "primary",
    }),
    require: false,
    type: Object as PropType<IUploadBtnConfig>,
  },
  // 限制上传的数量，默认 1 个
  limitNum: {
    default: 1,
    type: Number,
    require: false,
  },
  // 限制文件的大小, 默认 5MB
  limitSize: {
    default: 5,
    type: Number,
    require: false,
  },
  // 文件显示格式
  listType: {
    default: "text",
    type: String as PropType<IUploadListType>,
    require: false,
  },
  multiple: {
    default: false,
    type: Boolean,
    require: false,
  },
  // 上传文件类型
  uploadFileType: {
    require: false,
    type: Array as PropType<string[]>,
    default: () => ["png", "jpeg", "jpg"],
  },
  // 是否显示文件列表
  showFileList: {
    require: false,
    type: Boolean,
    default: true,
  },
  fileList: {
    type: Array,
    default: () => [],
  },
  autoUpLoad: {
    type: Boolean,
    default: true,
    require: false,
  },
  drag: {
    type: Boolean,
    default: false,
    require: false,
  },
  tempList: {
    type: Array,
    required: false,
    default: [],
  },
});
const emit = defineEmits([
  "update:fileList",
  "updateSuccess",
  "handleTemplate",
]);
const fileList = ref<UploadUserFile[]>([]);
const loading = ref<boolean>(false);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const createElementA = (href: string) => {
  const a = document.createElement("a");
  a.setAttribute("href", href);
  a.setAttribute("target", "_blank");
  a.click();
};

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  // eslint-disable-next-line no-console
  // console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  // eslint-disable-next-line no-console
  createElementA(uploadFile.url as string);
};

const emitFileList = () => {
  emit("update:fileList", fileList.value);
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => {
      emitFileList();
      return true;
    },
    () => false
  );
};

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  const { name, size = 0 } = rawFile;
  // 文件大小限制，默认 5MB
  let tipsMessage = "";
  let result = true;
  if (size / 1024 / 1024 > props.limitSize) {
    tipsMessage = `文件大小限制：${props.limitSize}MB！`;
    result = false;
  }
  const nameArr = name.split(".");
  const fileType = nameArr[nameArr.length - 1].toLowerCase();
  // 文件类型校验
  if (!props.uploadFileType.includes(fileType)) {
    tipsMessage = `允许上传的文件格式为：${props.uploadFileType}！`;
    result = false;
  }

  if (fileList.value.length > props.limitNum) {
    tipsMessage = `限制上传文件个数为：${props.limitNum}！`;
    result = false;
  }
  // 校验没通过，给相应的提示
  if (!result) {
    ElMessage({
      message: tipsMessage,
      type: "warning",
    });
  }
  return result;
};

interface IResponseFile {
  result?: string;
  [f: string]: any;
}
const handleSuccess = (
  response: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  fileList.value = uploadFiles.map((file) => {
    return {
      url: file.response ? (file.response as IResponseFile).result : "",
      uid: file.uid,
      name: file.name,
    };
  });
  emitFileList();
  let result = uploadFiles.map((f) => {
    if (f.response && (f.response as IResponseFile).code !== "200") {
      return (f.response as IResponseFile).msg;
    }
  });
  if (result.length) {
    result.forEach((msg) => {
      if (!msg) return;
      ElMessage({
        message: msg,
        type: "error",
      });
    });
    return;
  }
  emit("updateSuccess", fileList.value);
};

const handleRemoveScoped = (file: UploadFile) => {
  fileList.value = fileList.value.filter((files) => files.uid !== file.uid);
  emitFileList();
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleTemplate = (tempItem: Object) => {
  emit("handleTemplate", tempItem);
};

const onError = (error: Error) => {
  ElMessage({
    message: error.message,
    type: "error",
  });
};

watchEffect(() => {
  fileList.value = props.fileList as UploadFiles;
});
</script>

<style scoped lang="scss">
.el-upload__tip {
  margin-left: 8px;
}
.preview-img {
  width: 100%;
}

.tempList {
  .temp-item {
    margin-bottom: 5px;
    padding-left: 8px;
    color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .temp-name {
      display: flex;
      align-items: center;
      color: var(--el-text-color-secondary);
      .temm-item-name {
        margin-left: 6px;
      }
    }
    .temp-download-btn {
      color: #216dd9;
    }
  }
}
</style>