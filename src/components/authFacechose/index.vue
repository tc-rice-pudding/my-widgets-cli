<template>
  <div style="display: flex">
    <div class="formItemBox">
      <div class="headerCheckBox">
        <el-checkbox
          v-model="state.leftCheckAll"
          :indeterminate="state.isIndeterminate"
          @change="handleCheckAllLeft"
        ></el-checkbox>
        {{ state.checkLeftList.length }} items
      </div>
      <div class="leftCheckBox">
        <el-checkbox-group
          v-model="state.checkLeftList"
          @change="handleCheckedChange"
        >
          <div
            v-for="item in state.propListInfo"
            :key="item.id"
            class="leftCheckBox_div"
            v-show="item.isChecked"
          >
            <el-checkbox :label="item">{{ item.name }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="centerBox">
      <div class="pointer" @click="saveItem">
        <el-icon><ArrowRightBold /></el-icon>
      </div>
      <div class="pointer" @click="returnItem">
        <el-icon><ArrowLeftBold /></el-icon>
      </div>
    </div>
    <div class="formItemBox">
      <div class="headerCheckBox">
        <el-checkbox
          v-model="state.rightCheckAll"
          :indeterminate="state.isIndeterminate"
          @change="handleCheckAllRight"
        ></el-checkbox>
        {{ state.checkRightList.length }} items
      </div>
      <el-form-item prop="">
        <div class="leftCheckBox">
          <el-checkbox-group
            class="marRight20"
            v-model="state.checkRightList"
            @change="handleCheckedRightChange"
          >
            <div
              v-for="(item, index) in state.rightItemList"
              :key="item"
              class="leftCheckBox_div"
            >
              <el-checkbox :label="item"
                >{{ index + 1 }}：{{ item.name }}</el-checkbox
              >
            </div>
          </el-checkbox-group>
          <div>
            <div
              class="leftCheckBox_div flexBtew"
              v-for="(item, index) in state.rightItemList"
              :key="item"
            >
              <span
                :class="[!index ? 'move-disabled' : 'pointer']"
                @click="moveTop(index)"
              >
                <el-icon> <Top /> </el-icon
              ></span>
              <span
                :class="[
                  index + 1 === state.rightItemList.length
                    ? 'move-disabled'
                    : 'pointer',
                ]"
                @click="moveNext(index)"
                ><el-icon> <Bottom /> </el-icon
              ></span>
            </div>
          </div>
        </div>
      </el-form-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, defineProps } from "vue";
import addAuthDivisorApi from "@/core/api/attestation";

const emit = defineEmits(["getYZcheck"]);
const props = defineProps({
  listInfo: {
    type: Object,
    default() {
      return [];
    },
  },
  factorIds: {
    type: Array,
    default() {
      return [];
    },
  },
});

const state: any = reactive({
  leftCheckAll: false, //左侧全选
  rightCheckAll: false, //右侧全选
  checkLeftList: [], // 左侧框选中的数据
  checkRightList: [], // 右侧框选中的数据
  rightItemList: [], // 右侧框遍历的数据

  propListInfo: [],
});

// 全选左侧数据
const handleCheckAllLeft = (val: any) => {
  state.checkLeftList = val
    ? state.propListInfo.filter((item) => item.isChecked)
    : [];
};

// 全选右侧数据
const handleCheckAllRight = (val: any) => {
  state.checkRightList = val ? state.rightItemList.map((item) => item) : [];
};

// 选中或取消左侧框中数据
const handleCheckedChange = () => {
  if (state.leftCheckAll) {
    state.leftCheckAll = false;
  } else {
    let hasTrue = state.propListInfo.map((item) => {
      if (item.isChecked) {
        return item;
      }
    });
    if (hasTrue.length == state.checkLeftList.length) {
      state.leftCheckAll = true;
    }
  }
};

// 选中或取消左侧框中数据
const handleCheckedRightChange = () => {
  if (state.rightCheckAll) {
    state.rightCheckAll = false;
  } else {
    if (state.rightItemList.length == state.checkRightList.length) {
      state.rightCheckAll = true;
    }
  }
};

// 选中的数据挪到右侧
const saveItem = () => {
  if (state.checkLeftList.length == 0) {
    return;
  }
  console.log("state.checkLeftList", state.checkLeftList);

  state.checkLeftList.forEach((item) => {
    state.rightItemList.push(item);
  });
  state.leftCheckAll = false;
  state.checkLeftList = [];
  state.rightItemList.forEach((element) => {
    state.propListInfo.forEach((item) => {
      if (element.id == item.id) {
        item.isChecked = false;
      }
    });
  });
  emit("getYZcheck", state.rightItemList);
};

// 右侧的数据移回左侧
const returnItem = () => {
  if (state.checkRightList.length == 0) {
    return;
  }
  console.log("state.checkRightList", state.checkRightList);

  state.checkRightList.forEach((ele, eleIndex) => {
    state.propListInfo.forEach((pli, index) => {
      if (ele.id == pli.id) {
        pli.isChecked = true;
      }
    });
    state.rightItemList = state.rightItemList.filter((item, ind) => {
      return ele.id != item.id;
    });
  });
  emit("getYZcheck", state.rightItemList);
};

// 向上挪动
const moveTop = (val: any) => {
  if (val == 0) {
    return;
  }
  let tranStr = state.rightItemList[val - 1];
  state.rightItemList[val - 1] = state.rightItemList[val];
  state.rightItemList[val] = tranStr;
  console.log("state.rightItemList", state.rightItemList);

  emit("getYZcheck", state.rightItemList);
};
// 向下挪动
const moveNext = (val: any) => {
  if (val + 1 == state.rightItemList.length) {
    console.log(val);
    return;
  }
  let tranStr = state.rightItemList[val + 1];
  state.rightItemList[val + 1] = state.rightItemList[val];
  state.rightItemList[val] = tranStr;
  emit("getYZcheck", state.rightItemList);
};
const getDivisorList = () => {
  let obj = {
    queryId: "list-zt-auth-factor",
    params: {},
  };
  addAuthDivisorApi.getDivisorList(obj).then((res) => {
    if (res.code == 200) {
      state.propListInfo = res.data.map((item) => {
        return {
          id: item.authFactorId,
          name: item.authFactorName,
          isChecked: true,
        };
      });
    }
  });
};
const isSameArray = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (
      arr1[i] !== arr2[i] &&
      arr1.indexOf(arr2[i]) === i &&
      arr2.indexOf(arr1[i]) === i
    ) {
      return false;
    }
  }
  return true;
};
// getDivisorList();
watch(
  () => {
    return state.rightItemList;
  },
  (newVal, oldVal) => {
    if (newVal.length == 0) {
      state.rightCheckAll = false;
    }
  },
  { deep: true }
);
watch(
  () => props.factorIds,
  (newVal, oldVal) => {
    console.log(JSON.stringify(newVal), JSON.stringify(oldVal));
    // 如果只是位置变化不触发
    if (
      Array.isArray(newVal) &&
      Array.isArray(oldVal) &&
      isSameArray(newVal, oldVal)
    ) {
      return;
    }
    if (newVal.length !== 0) {
      // getDivisorList()
      const list = state.propListInfo.filter((item) => {
        return newVal.includes(item.id);
      });
      state.rightItemList = list;
      console.log(
        "state.rightItemList",
        state.rightItemList,
        state.propListInfo,
        newVal,
        oldVal
      );

      state.propListInfo.forEach((item) => {
        if (newVal.includes(item.id)) {
          item.isChecked = false;
        }
      });
      console.log("state.propListInfo", state.propListInfo);
    } else {
      state.rightItemList = [];
    }
  },
  { immediate: true }
);
watch(
  () => props.listInfo,
  (newVal, oldVal) => {
    state.propListInfo = JSON.parse(JSON.stringify(newVal));
  },
  { deep: true, immediate: true }
);
</script>

<style scoped lang="scss">
.formItemBox {
  width: 178px;
  height: 198px;
  border: 1px solid #ccc;
}

.headerCheckBox {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #ccc;
}

.leftCheckBox {
  width: 100%;
  height: 158px;
  padding-left: 10px;
  overflow-y: auto;
  display: flex;

  .leftCheckBox_div {
    height: 26px;
    .pointer {
      color: #216dd9;
    }
    .move-disabled {
      color: #c0c4cc;
    }
  }
}

.flexBtew {
  width: 26px;
  display: flex;
  justify-content: space-between;
}

.marRight20 {
  margin-right: 10px;
}

.centerBox {
  display: flex;
  width: 56px;
  height: 198px;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-align: center;
    line-height: 24px;
    margin: 8px 0;
  }
}
</style>
