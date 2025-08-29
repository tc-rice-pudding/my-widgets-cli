<template>
  <div class="antv-demo-view" v-scrollbar>
    <el-row :gutter="20">
      <el-col :span="24">
        <warp title="柱状图-tootip在容器内">
          <template #btn>
            <el-button type="primary" plain size="small">插槽</el-button>
          </template>
          <template #default>
            <div class="antv-container" v-scrollbar>
              <div
                ref="containerRef"
                style="min-width: 400px; height: 600px"
              ></div>
              <div ref="minimapRef" class="mini-map"></div>
            </div>
          </template>
        </warp>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import { Graph } from "@antv/x6";
import { MiniMap } from "@antv/x6-plugin-minimap";
import { register } from "@antv/x6-vue-shape";
import warp from "@/views/widgets/warpDemo/components/warp.vue";
import { createEdge, layout, registerEdge } from "./x6";
import FirstNode from "./components/FirstNode.vue";
import SecondNode from "./components/SecondNode.vue";

const dir = "LR"; // LR RL TB BT
const containerRef = ref();
const minimapRef = ref();
const state = reactive({
  currId: null,
  graph: null as any,
  x6Loading: false,
  sourceAssetList: [] as any[],
  targetAssetList: [] as any[],
});

/**
 * 自定义一级节点
 */
const registerFirNode = () => {
  register({
    shape: "custom-vue--first-node",
    width: 380,
    height: 80,
    component: {
      render: () => {
        return h(FirstNode, {
          onAddDeviceRelative: (device) => {
            console.log("新增关联设备", device);
          },
        });
      },
    },
  });
};
/**
 * 自定义二级节点
 */
const registerSecNode = () => {
  register({
    shape: "custom-vue--secode-node",
    width: 380,
    height: 80,
    component: {
      render: () => {
        return h(SecondNode, {
          onAddDeviceRelative: (device) => {
            console.log("新增关联设备", device);
          },
          onViewDeviceRelative: (device) => {
            console.log("查看关联设备", device);
          },
        });
      },
    },
  });
};

/**
 *  注册节点
 */
const registerNodeHandler = () => {
  registerFirNode();
  registerSecNode();
  registerEdge();
};

onMounted(async () => {
  // 1. 注册节点
  registerNodeHandler();

  // 2. 创建画布
  state.graph = new Graph({
    container: containerRef.value,
    background: {
      color: "rgb(30, 37, 49)",
    },
    autoResize: true,
    panning: true,
    mousewheel: true,
    interacting: false,
  });
  state.graph.use(
    new MiniMap({
      container: minimapRef.value,
      width: 200,
      height: 140,
    })
  );

  mockHandler();
});

const initG6 = (graph, dir, nodes, edges) => {
  graph.clearCells();
  graph.resetCells([...nodes, ...edges]);
  layout(graph, dir);
  graph.zoomTo(0.8);
  graph.centerContent();
};

const buildNode = () => {
  const nodes = [
    state.graph?.createNode({ shape: "custom-vue--first-node" }),
    ...new Array(state.targetAssetList.length)
      .fill(0)
      .map((it, inx) =>
        state.graph.createNode({ shape: "custom-vue--secode-node" })
      ),
  ];
  const edges = [
    ...nodes
      .filter((it, inx) => inx > 0)
      .map((it, inx) =>
        createEdge(state.graph, nodes[0], it, state.targetAssetList[inx])
      ),
  ];

  initG6(state.graph, dir, nodes, edges);

  setTimeout(() => {
    nodes.forEach((it, inx) => {
      if (inx > 0) {
        nodes[inx]?.setData(state.targetAssetList?.[inx - 1] || {});
      } else {
        nodes[inx]?.setData({
          ...(state.sourceAssetList?.[0] || {}),
          deviceList: state.targetAssetList,
        });
      }
    });
  }, 100);
};

const mockHandler = () => {
  setTimeout(() => {
    // TODO: 模拟数据
    state.sourceAssetList = [
      {
        id: 1212463,
        createTime: "2025-02-07 14:41:53",
        updateTime: "2025-03-20 15:14:39",
        ip: "192.168.8.65",
        mac: "1C:69:7A:FF:B1:22",
        ipv6: "",
        host: "",
        sn: "",
        port: "135,139,445,3389",
        assetDeviceType: "3",
        assetDeviceType_dictText: "应用服务设备",
        netDeviceVendor: "精英",
        assetDeviceModel: "",
        os: "Microsoft Windows 10",
        osVersion: "Windows",
        osVender: "Microsoft",
        component: "",
        station: "11000001022010000001",
        firstOnlineTime: null,
        onlineFlag: 0,
        onlineFlag_dictText: "离线",
        gb35114Flag: null,
        gb28181Flag: null,
        isDhcpFlag: null,
        onvifFlag: null,
        openPortNum: null,
        portStatus: null,
        ports: null,
        vmFlag: null,
        vlanId: null,
        winOsVerId: null,
        rackx: null,
        racky: null,
        room: null,
        province: "贵州省",
        city: null,
        area: null,
        admin: null,
        partment: null,
        owner: null,
        rackz: null,
        lat: null,
        lng: null,
        regionId: 604154,
        scanDeviceId: "10018",
        idTag: null,
        uuid: null,
        reportStatus: 1,
        reportStatus_dictText: "已上报",
        reportTime: "2025-02-26 17:20:32",
        subDeviceType: null,
        regionCode: "520000000000",
        count: null,
        pixel: null,
        productType: null,
        taskId: "20250226130345_00001_custom.tsk",
        ipNum: 3232237633,
        tags: [
          {
            assetId: 1212463,
            tagId: 1,
            tagName: "老旧设备",
            ip: null,
            createTime: null,
            updateTime: null,
            cssStyle:
              '{"bgColor":"rgba(255, 178, 1, 0.1)","color":"rgba(255, 178, 1, 1)"}',
          },
          {
            assetId: 1212463,
            tagId: 1740121839349,
            tagName: "eee",
            ip: null,
            createTime: null,
            updateTime: null,
            cssStyle:
              '{"bgColor":"rgba(31, 146, 204, 0.1)","color":"rgba(31, 146, 204, 1)"}',
          },
          {
            assetId: 1212463,
            tagId: 1740121839351,
            tagName: "eee-update",
            ip: null,
            createTime: null,
            updateTime: null,
            cssStyle:
              '{"bgColor":"rgba(255, 178, 1, 0.1)","color":"rgba(255, 178, 1, 1)"}',
          },
        ],
        networkType: "video",
        networkType_dictText: "视频传输网",
        isOld: null,
        lessCreateTime: null,
        greaterUpdateTime: null,
      },
    ];

    state.targetAssetList = [
      {
        sourceAssetId: 1212463,
        targetAssetId: 1182223,
        relationTypeId: 1,
        relationTypeName: "组合",
        sourceAssetIp: "192.168.8.65",
        targetAssetIp: "192.168.253.35",
        targetAssetStation: "11000001022010000001",
        targetAssetDeviceType: 3,
        targetAssetDeviceType_dictText: "应用服务设备",
        targetAssetRegionId: "604155",
        targetAssetRegionName: "贵州省/贵阳市",
      },
      {
        sourceAssetId: 1212463,
        targetAssetId: 1222682,
        relationTypeId: 1,
        relationTypeName: "组合",
        sourceAssetIp: "192.168.8.65",
        targetAssetIp: "192.168.253.237",
        targetAssetStation: "11000001022010000001",
        targetAssetDeviceType: 3,
        targetAssetDeviceType_dictText: "应用服务设备",
        targetAssetRegionId: "604155",
        targetAssetRegionName: "贵州省/贵阳市",
      },
      {
        sourceAssetId: 1212463,
        targetAssetId: 1222856,
        relationTypeId: 1,
        relationTypeName: "组合",
        sourceAssetIp: "192.168.8.65",
        targetAssetIp: "192.168.253.162",
        targetAssetStation: "11000001022010000001",
        targetAssetDeviceType: 3,
        targetAssetDeviceType_dictText: "应用服务设备",
        targetAssetRegionId: "604155",
        targetAssetRegionName: "贵州省/贵阳市",
      },
      {
        sourceAssetId: 1212463,
        targetAssetId: 1124742,
        relationTypeId: 2,
        relationTypeName: "通信",
        sourceAssetIp: "192.168.8.65",
        targetAssetIp: "192.168.1.109",
        targetAssetStation: "V5.23",
        targetAssetDeviceType: 3,
        targetAssetDeviceType_dictText: "应用服务设备",
        targetAssetRegionId: "624182",
        targetAssetRegionName: "贵州省/贵阳市/贵阳市高开区-2",
      },
      {
        sourceAssetId: 1212463,
        targetAssetId: 1212562,
        relationTypeId: 3,
        relationTypeName: "承载",
        sourceAssetIp: "192.168.8.65",
        targetAssetIp: "192.168.253.118",
        targetAssetStation: "11000001022010000001",
        targetAssetDeviceType: 3,
        targetAssetDeviceType_dictText: "应用服务设备",
        targetAssetRegionId: "604155",
        targetAssetRegionName: "贵州省/贵阳市",
      },
    ];
    buildNode();
  }, 100);
};
</script>

<style scoped lang='scss'>
.antv-demo-view {
  width: 100%;
  height: calc(100% - 20px);
  box-sizing: border-box;
  margin-top: 20px;

  :deep .el-row {
    margin: 0 0 20px !important;
  }

  :deep .el-row:last-child {
    margin-bottom: 0;
  }

  .antv-container {
    width: 100%;
    max-height: 500px;
    box-sizing: border-box;
    position: relative;
  }
  :deep .mini-map {
    position: absolute;
    left: 20px;
    bottom: 20px;
    .x6-widget-minimap {
      background: rgb(68, 95, 133) !important;
    }
  }
}
</style>