<template>
  <div class="warp-demo-view" v-scrollbar id="111" v-watermark="`wushuai`">
    <!-- FIXME: -->
    <div v-backtop="{ scrollContainer: '111' }">回到顶部</div>

    <el-row :gutter="20">
      <el-col :span="8">
        <warp title="v-scrollbar 指令">
          <template #default>
            <!-- FIXME: 示例代码 -->
            <div
              style="height: 300px"
              v-scrollbar
              v-infinite-scroll="() => ElMessage.info('滚动了')"
            >
              <div
                style="
                  height: 1000px;
                  width: 2000px;
                  background: linear-gradient(45deg, red, yellow, pink);
                "
              ></div>
            </div>
          </template>
        </warp>
      </el-col>
      <el-col :span="8">
        <warp title="v-iframe 指令">
          <template #default>
            <!-- FIXME: 示例代码 -->
            <div
              style="width: 100%; height: 100%"
              v-iframe="'http://localhost:1234/my/widget/home'"
            />
          </template>
        </warp>
      </el-col>
      <el-col :span="8">
        <warp title="v-slideIn 指令">
          <template #default>
            <div style="height: 300px" v-scrollbar>
              <div
                style="
                  height: 100px;
                  line-height: 100px;
                  text-align: center;
                  margin: 10px;
                  background-color: antiquewhite;
                "
                v-slideIn
                v-for="it in 10"
                :key="it"
              >
                {{ it }}
              </div>
            </div>
          </template>
        </warp>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <warp title="v-click-outside 指令">
          <template #default>
            <!-- FIXME: 示例代码 -->
            <div
              v-click-outside="
                () =>
                  ElMessage({
                    message: '点击了外部区域',
                    grouping: true,
                    type: 'info',
                  })
              "
              style="
                width: 100%;
                height: 100px;
                background: #f5f5f5;
                text-align: center;
                line-height: 100px;
              "
            >
              点击该容器外部区域
            </div>
          </template>
        </warp>
      </el-col>
      <el-col :span="4">
        <warp title="v-copy 指令">
          <template #default>
            <!-- FIXME: 示例代码 -->
            <el-button type="primary" v-copy="`你复制了一段内容`">
              复制该文本
            </el-button>
          </template>
        </warp>
      </el-col>
      <el-col :span="4">
        <warp title="v-debounce 指令">
          <template #default>
            <!-- FIXME: 示例代码 -->
            <el-button
              type="primary"
              v-debounce:click_200="() => ElMessage.success('click 防抖...')"
            >
              防抖指令
            </el-button>
          </template>
        </warp>
      </el-col>
      <el-col :span="4">
        <warp title="v-draggable 指令">
          <template #default>
            <!-- FIXME: 示例代码 -->
            <el-button type="primary" v-draggable> 拖拽我 </el-button>
          </template>
        </warp>
      </el-col>
      <el-col :span="4">
        <warp title="v-resize 指令">
          <template #default>
            <!-- FIXME: 示例代码 -->
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="row.text"
              placement="top"
              :disabled="!row.tipDisable"
            >
              <span
                v-ellipsis="row.text"
                v-resize="
                  (entry, el) => resizeHandler(entry, el, row, 'tipDisable')
                "
                style="display: inline-block; max-width: 100px"
              >
                {{ row.text }}
              </span>
            </el-tooltip>
          </template>
        </warp>
      </el-col>
      <el-col :span="4">
        <warp title="v-screenfull 指令">
          <template #default>
            <!-- FIXME: 示例代码 -->
            <div
              id="aaa"
              style="
                height: 100px;
                background: linear-gradient(45deg, red, yellow, pink);
              "
            >
              <el-button type="primary" v-screenfull="{ container: '#aaa' }">
                全屏
              </el-button>
            </div>
          </template>
        </warp>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <warp title="v-focus 指令">
          <template #default>
            <el-input placeholder="请输入内容" v-focus />
          </template>
        </warp>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import warp from "@/views/widgets/warpDemo/components/warp.vue";
import { ElMessage } from "element-plus";

const row = ref({ text: "" });
setTimeout(() => {
  row.value.text = "春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。";
}, 1000);
const resizeHandler = (entry, el, item, field) => {
  if (item && el) {
    item[field] = el.scrollWidth > el.offsetWidth;
  }
};
</script>

<style scoped lang='scss'>
.warp-demo-view {
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
}
</style>