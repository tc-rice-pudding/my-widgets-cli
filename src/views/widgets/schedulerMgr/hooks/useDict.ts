// import {
//   getCronType,
//   getPeriodType,
//   getScheduleType,
// } from "@/core/api/schedulerMgr";

const state = reactive({
  scheduleTypeMap: {} as Record<string | number, string>, // 调度策略类型
  cronTypeMap: {} as Record<string | number, string>, // cron类型
  periodMap: {} as Record<string | number, string>, // 	周期
});

export const useDict = () => {
  const getPeriodTypeHandler = async () => {
    // const { data = [], code }: any = await getPeriodType();
    // if (code == 200) {
    //   state.periodMap = data.reduce(
    //     (map, item) => ({ ...map, [item.code]: item.desc }),
    //     {}
    //   );
    // }
    state.periodMap = [
      {
        code: "SECOND",
        desc: "秒",
      },
      {
        code: "MINUTE",
        desc: "分钟",
      },
      {
        code: "HOUR",
        desc: "小时",
      },
      {
        code: "DAY",
        desc: "天",
      },
    ].reduce((map, item) => ({ ...map, [item.code]: item.desc }), {});
  };
  const getCronTypeHandler = async () => {
    // const { data = [], code }: any = await getCronType();
    // if (code == 200) {
    //   state.cronTypeMap = data.reduce(
    //     (map, item) => ({ ...map, [item.code]: item.desc }),
    //     {}
    //   );
    // }
    state.cronTypeMap = [
      {
        code: 1,
        desc: "简易类型",
      },
      {
        code: 2,
        desc: "高级设置",
      },
      {
        code: 3,
        desc: "手写cron",
      },
    ].reduce((map, item) => ({ ...map, [item.code]: item.desc }), {});
  };
  const getScheduleTypeHandler = async () => {
    // const { data = [], code }: any = await getScheduleType();
    // if (code == 200) {
    //   state.scheduleTypeMap = data.reduce(
    //     (map, item) => ({ ...map, [item.code]: item.desc }),
    //     {}
    //   );
    // }
    state.scheduleTypeMap = [
      {
        code: 0,
        desc: "无",
      },
      {
        code: 1,
        desc: "固定速度",
      },
      {
        code: 2,
        desc: "CRON",
      },
      {
        code: 3,
        desc: "单次",
      },
    ].reduce((map, item) => ({ ...map, [item.code]: item.desc }), {});
  };

  const initDict = async () => {
    if (!Object.keys(state.periodMap).length) {
      await getPeriodTypeHandler();
    }
    if (!Object.keys(state.cronTypeMap).length) {
      await getCronTypeHandler();
    }
    if (!Object.keys(state.scheduleTypeMap).length) {
      await getScheduleTypeHandler();
    }
  };

  return { ...toRefs(state), initDict };
};
