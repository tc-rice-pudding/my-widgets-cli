export enum statusEnum {
  "开启",
  "关闭",
}

export const columns = [
  { type: "selection", width: 50 },
  {
    label: "名称",
    "min-width": 200,
    prop: "name",
    showTooltip: true,
  },
  {
    label: "类型",
    "min-width": 200,
    tdSlot: "type",
    labelSlot: "typeLabel", 
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
    label: "状态",
    "min-width": 200,
    tdSlot: "stat",
    labelSlot: "statLabel",
    showTooltip: true,
  },
  {
    label: "流程状态",
    "min-width": 200,
    tdSlot: "flowStatus",
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
    placeholder: "请输入应用",
    type: "input",
  },
  {
    label: "调度策略类型",
    field: "scheduleType",
    placeholder: "请输入名称",
    type: "select",
    options: [
      { label: "自动", value: 1 },
      { label: "手动", value: 2 },
    ],
  },
  {
    label: "调度器名称",
    field: "timeRange",
    placeholder: "请输入应用",
    type: "daterange",
  },
]);
