export const columns = [
  { type: "selection", width: 50 }, 
  {
    label: "参数名",
    "min-width": 120,
    prop: "varName",
    showTooltip: true,
  },
  {
    label: "名称",
    "min-width": 120,
    prop: "zhName",
    showTooltip: true,
  },
  {
    label: "值",
    "min-width": 120,
    prop: "value",
    showTooltip: true,
  },
  {
    label: "描述",
    "min-width": 120,
    prop: "desc",
    showTooltip: true,
  },
  {
    label: "状态",
    "min-width": 120,
    tdSlot: "status",
    showTooltip: true,
  },
  {
    label: "修改人ID",
    "min-width": 120,
    prop: "updateBy",
    showTooltip: true,
  },
  {
    label: "更新时间",
    "min-width": 120,
    prop: "updateTime",
    showTooltip: true,
    sortable: true,
  },
  { label: "操作", tdSlot: "default", width: 200, fixed: "right" },
];

export const searchForm = reactive([
  {
    label: "",
    field: "varName",
    placeholder: "请输入参数或名称",
    type: "input",
  },
]);
