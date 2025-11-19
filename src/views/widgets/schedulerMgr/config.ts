// import { FormSelectFieldValue } from "@/core/interface/common";

export enum ScheduleTypeEnum {
  "无",
  "固定速度",
  "cron",
  "单次",
}

export const columns = [
  { type: "selection", width: 50 },
  {
    label: "调度器名称",
    "min-width": 200,
    prop: "scheduleName",
    showTooltip: true,
  },
  {
    label: "调度策略类型",
    "min-width": 200,
    tdSlot: "scheduleType",
    labelSlot: "scheduleTypeLabel",
    showTooltip: true,
  },
  {
    label: "表达式",
    "min-width": 240,
    tdSlot: "expression",
  },
  {
    label: "创建时间",
    "min-width": 200,
    prop: "createTime",
    showTooltip: true,
    sortable: true,
  },
  {
    label: "关联任务数",
    "min-width": 200,
    tdSlot: "jobNum",
    showTooltip: true,
  },
  {
    label: "备注",
    "min-width": 200,
    prop: "remark",
    showTooltip: true,
  },
  { label: "操作", tdSlot: "default", width: 200, fixed: "right" },
];

export const searchForm = reactive([
  {
    label: "调度器名称",
    field: "scheduleName",
    placeholder: "请输入调度器名称",
    type: "input",
  },
  // {
  //   label: "调度策略类型",
  //   field: "scheduleType",
  //   placeholder: "请输入名称",
  //   type: "select",
  //   options: [] as FormSelectFieldValue[],
  // },
]);
