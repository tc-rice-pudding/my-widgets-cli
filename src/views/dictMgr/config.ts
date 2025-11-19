export const columns = [
  // { type: "selection", width: 50 },
  // { label: "", tdSlot: "default", width: 200 },
  {
    label: "ID",
    "min-width": 120,
    prop: "id",
    showTooltip: true,
  },
  {
    label: "分组",
    "min-width": 120,
    prop: "group",
    showTooltip: true,
  },
  {
    label: "名称",
    "min-width": 200,
    prop: "name",
    showTooltip: true,
  },
  {
    label: "父ID",
    "min-width": 120,
    prop: "parentId",
    showTooltip: true,
  },
  {
    label: "code",
    "min-width": 200,
    prop: "code",
  },
  {
    label: "排序",
    "min-width": 120,
    prop: "sort",
  },
  {
    label: "备注",
    "min-width": 200,
    prop: "remark",
  },
  {
    label: "更新时间",
    "min-width": 160,
    prop: "updateTime",
    showTooltip: true,
    sortable: true,
  },
  { label: "操作", tdSlot: "opera", width: 200, fixed: "right" },
];

export const searchForm = reactive([
  {
    label: "分组",
    field: "group",
    placeholder: "请输入分组",
    type: "input",
  },
  {
    label: "名称",
    field: "name",
    placeholder: "请输入名称",
    type: "input",
  },
]);
