<template>
  <div class="add-container">
    <div class="add-header">
      <div class="header-left">
        <p @click="onCancel">
          <span class="icon font_family">&#xe620;</span>
          <span class="back">返回</span>
        </p>
        <span>{{ props.title }}</span>
      </div>
      <div class="header-right">
        <slot name="action"></slot>
        <el-button v-if="showCancelBtn" type="default" class="btn68" @click="onCancel"
          >取消</el-button
        >
        <el-button
          v-if="showSaveBtn"
          type="primary"
          class="btn68"
          @click="onConfirm"
          color="#216DD9"
          >保存</el-button
        >
      </div>
    </div>
    <div class="add-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["onCancel", "onConfirm"]);

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  showSaveBtn: {
    type: Boolean,
    default: true,
  },
  showCancelBtn: {
    type: Boolean,
    default: true,
  }
});

const onCancel = () => {
  emits("onCancel");
};

const onConfirm = () => {
  emits("onConfirm");
};
</script>

<style lang="scss" scoped>
.add-container {
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .add-header {
    height: 57px;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d9d9d9;
    .header-left {
      display: flex;
      align-items: center;
      .icon {
        transform: rotate(90deg);
      }
      p {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.6);
      }
      span {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
      }
      .back {
        display: flex;
        align-items: center;
        &::after {
          content: "";
          display: inline-block;
          width: 1px;
          height: 14px;
          background: #d9d9d9;
          margin: 0 12px;
        }
      }
    }
  }
  .add-content {
    flex: 1;
    overflow-y: auto;
    padding: 30px;
    box-sizing: border-box;
  }
}
</style>