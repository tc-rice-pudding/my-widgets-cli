<template>
  <div
    class="second-node-view"
    :style="{
      '--device-color':
        DeviceColorEnum[
          state?.info?.targetAssetDeviceType_dictText ?? '视频类设备'
        ],
    }"
  >
    <el-icon
      class="font_family icon-quanxuan device-icon"
      :class="[
        DeviceIconEnum[state?.info?.targetAssetDeviceType_dictText] ??
          '视频类设备',
      ]"
    />

    <div class="info-container">
      <span class="title">{{ state?.info?.targetAssetIp }}</span>
      <span class="sub-title"
        >{{ state?.info?.targetAssetDeviceType_dictText }} |
        {{ state?.info?.targetAssetRegionName }}</span
      >
    </div>

    <el-icon class="iconfont_span icon-xinzeng" @click="onAddDeviceRelative" />
    <el-icon class="iconfont_span icon-a-2411" @click="onViewDeviceRelative" />
  </div>
</template>
<script setup lang='ts'>
import { DeviceColorEnum, DeviceIconEnum } from "../x6";

const getNodeData: any = inject("getNode");
const emits = defineEmits(["addDeviceRelative", "viewDeviceRelative"]);
const state = reactive({
  info: {
    targetAssetIp: "-",
    targetAssetRegionName: "-",
    targetAssetDeviceType_dictText: "-",
  },
});

onMounted(() => {
  const currentNode = getNodeData();
  // 监听当前节点数据发生了变化
  currentNode.on("change:data", ({ current }) => {
    console.log("节点数据是否发生变化了 >>>", current);
    state.info = current;
  });
});

const onAddDeviceRelative = () => {
  emits("addDeviceRelative", state.info);
};
const onViewDeviceRelative = () => {
  emits("viewDeviceRelative", state.info);
};
</script>


<style scoped lang='scss'>
.second-node-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 56px 1fr 40px 20px;
  padding: 10px 20px;
  background: rgb(37, 49, 67);
  border-radius: 4px;
  overflow: hidden;
  align-items: center;
  border: 1px solid transparent;
  transition: all 0.3s;

  &:hover {
    border: 1px solid rgb(112, 156, 218);
  }

  .info-container {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    padding-left: 6px;
    > span:first-of-type {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
    }
    > span:last-of-type {
      color: rgb(95, 108, 127);
      font-size: 12px;
      font-weight: 400;
    }
  }
}

.device-icon {
  width: 48px;
  height: 48px;
  background: var(--device-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border-radius: 4px;
  color: #fff;
}

.icon-xinzeng,
.icon-a-2411 {
  cursor: pointer;
  color: #fff;
  display: flex;
  justify-content: center;
}
</style>