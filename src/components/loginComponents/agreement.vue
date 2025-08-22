<template>
  <el-dialog
    :model-value="dialogVisible"
    width="680px"
    :append-to-body="false"
    :close-on-click-modal="false"
    :modal="true"
    title="服务协议"
    center
    class="apply-iframe-dialog"
    @close="hideDialog"
  >
    <iframe
      id="iframeContain"
      name="iframeContain"
      seamless
      scrolling="yes"
      src="/upms/agreement.html"
    >
      您当前的浏览器不支持页面上的功能，请升级您当前的浏览器版本或使用谷歌浏览器访问当前页面
    </iframe>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    require: true,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const hideDialog = () => {
  emit("close");
};
</script>
<style lang="scss">
.apply-iframe-dialog {
  height: 500px;
  .el-dialog__body {
    padding: 0;
    height: 90%;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
