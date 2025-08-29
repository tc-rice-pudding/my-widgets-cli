<template>
  <div
    class="first-node-view"
    :style="{
      '--device-color':
        DeviceColorEnum[state?.info?.assetDeviceType_dictText ?? '视频类设备'],
    }"
  >
    <el-icon
      class="font_family icon-quanxuan device-icon"
      :class="[
        DeviceIconEnum[state?.info?.assetDeviceType_dictText ?? '视频类设备'],
      ]"
    />

    <div class="info-container">
      <span class="title">{{ state?.info?.ip }}</span>
      <span class="sub-title"
        >{{ state?.info?.assetDeviceType_dictText }} | {{ positionRef }}</span
      >
    </div>

    <el-icon class="font_family icon-jiahao" style="color: #fff;" @click="onAddDeviceRelative" />
    <el-icon
      class="font_family icon-xiala"
      :style="{ transform: `rotateZ(${state.deviceListFlag ? 180 : 0}deg)` }"
      @click="state.deviceListFlag = !state.deviceListFlag"
    />

    <section class="related-device-list" v-show="state.deviceListFlag">
      <p>关联设备</p>
      <ul>
        <li v-for="item in state.deviceList" :key="item.id">
          <el-icon
            class="font_family icon-quanxuan"
            :style="{
              '--device-color':
                DeviceColorEnum[
                  item?.targetAssetDeviceType_dictText ?? '视频类设备'
                ],
            }"
          />{{ item?.targetAssetIp }}
        </li>
      </ul>
    </section>
  </div>
</template>
<script setup lang='ts'>
import { DeviceColorEnum, DeviceIconEnum } from "../x6";

const getNodeData: any = inject("getNode");
const emits = defineEmits(["addDeviceRelative"]);
const state = reactive({
  info: {
    ip: "",
    province: "",
    area: "",
    city: "",
    assetDeviceType_dictText: "",
  },
  deviceListFlag: false,
  deviceList: [] as any[],
});

const positionRef = computed(() =>
  [state.info?.province ?? "", state.info?.city ?? "", state.info?.area ?? ""]
    .filter((it) => it != "")
    .join("/")
);

const onAddDeviceRelative = () => {
  emits("addDeviceRelative", state.info);
};

onMounted(() => {
  const currentNode = getNodeData();
  // 监听当前节点数据发生了变化
  currentNode.on("change:data", ({ current }) => {
    console.log("节点数据是否发生变化了 >>>", current);
    state.info = current;
    state.deviceList = current.deviceList;
  });
});
</script>


<style scoped lang='scss'>
.first-node-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 56px 1fr 40px 20px;
  padding: 10px 20px;
  background: rgb(37, 49, 67);
  border-left: 4px solid var(--device-color);
  border-radius: 4px;
  // overflow: hidden;
  align-items: center;
  position: relative;
  transition: all 0.3s;

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

  .related-device-list {
    width: calc(100% + 4px);
    position: absolute;
    top: 76px;
    left: -4px;
    background: rgb(37, 49, 67);
    color: rgb(186, 202, 223);
    border-left: 4px solid var(--device-color);
    box-sizing: border-box;
    border-radius: 0 0 4px 4px;
    > p {
      line-height: 42px;
      border-top: 2px solid rgb(47, 63, 87);
      padding: 0 20px;
    }
    > ul {
      max-height: 200px;
      overflow: hidden;
      overflow-y: scroll;
      padding: 0 20px 10px;
      font-size: 12px;
      > li {
        line-height: 32px;
        list-style: none;
        display: flex;
        column-gap: 10px;
        .iconfont_span {
          color: var(--device-color);
        }
      }
      &::-webkit-scrollbar {
        width: 4px;
        background: transparent;
      }
      &::-webkit-scrollbar-corner,
      &::-webkit-scrollbar-thumb,
      &::-webkit-scrollbar-track {
        border-radius: 4px;
      }
      &::-webkit-scrollbar-corner,
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgb(63, 87, 122);
      }
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
.icon-xiala {
  cursor: pointer;
  color: #fff;
  display: flex;
  justify-content: center;
}
</style>