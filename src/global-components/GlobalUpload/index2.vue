<template>
  <el-upload
    :file-list="fileList"
    class="upload-demo"
    :action="requestUrlPath"
    :multiple="multiple"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :list-type="listType"
    :show-file-list="showFileList"
    :limit="limitNum"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    :disabled="fileList.length === limitNum"
    :before-remove="beforeRemove"
    :on-error="onError"
    v-bind="$attrs"
    :headers="{ Authorization: getCookie('uaatoken') }"
  >
    <template v-if="listTypeComputed">
      <el-button
        :type="uploadBtnConfig.btnType"
        :loading="loading"
        :disabled="fileList.length === limitNum"
      >
        {{ uploadBtnConfig.text }}
      </el-button>
    </template>
    <template v-if="listTypeComputed || isShowTips" #tip>
      <span class="el-upload__tip">
        限制格式：{{ uploadFileType.join(", ") }},限制大小：{{ limitSize }}MB,
        限制数量：{{ limitNum }}
      </span>
    </template>
    <template v-if="!listTypeComputed">
      <el-icon><Plus /></el-icon>
    </template>
    <template v-if="!listTypeComputed || isShowTips" #file="{ file }">
      <img class="el-upload-list__item-thumbnail" :src="file.url" />
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <el-icon><zoom-in /></el-icon>
        </span>
        <span
          class="el-upload-list__item-delete"
          @click="handleRemoveScoped(file)"
        >
          <el-icon><Delete /></el-icon>
        </span>
      </span>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, PropType, computed, watchEffect } from "vue";
import { IUploadListType, IUploadBtnConfig } from "@/core/interface/common";
import {
  ElMessage,
  ElMessageBox,
  UploadFiles,
  UploadProps,
  UploadUserFile,
} from "element-plus";
import type { UploadFile } from "element-plus";
import { getBaseUrl } from "@/config/env/checkEnv";
import { getCookie } from "@/utils/storage";

const props = defineProps({
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
  // 限制文件的大小, 默认 3MB
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
  isShowTips: {
    type: Boolean,
    default: false,
    require: false,
  },
});
const emit = defineEmits(["update:fileList"]);
const fileList = ref<UploadUserFile[]>([]);
const loading = ref<boolean>(false);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const requestUrlPath = `${getBaseUrl(
  import.meta.env.MODE
)}/admin/api/file/upload`;

const textArr: IUploadListType[] = ["picture", "text"];
const listTypeComputed = computed(() => textArr.includes(props.listType));

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
  result: string;
  [f: string]: any;
}
const handleSuccess = (
  response: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  fileList.value = uploadFiles.map((file) => ({
    url: (file.response as IResponseFile).result,
    uid: file.uid,
    name: file.name,
  }));
  emitFileList();
};

const handleRemoveScoped = (file: UploadFile) => {
  fileList.value = fileList.value.filter((files) => files.uid !== file.uid);
  emitFileList();
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
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
</style>
