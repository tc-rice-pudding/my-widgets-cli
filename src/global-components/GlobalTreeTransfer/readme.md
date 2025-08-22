## 树形 GlobalTransfer 使用说明文档

### 一、入参

| 字段       | 类型    | 是否必填 | 释义       |
| ---------- | ------- | -------- | ---------- |
| filterable | Boolean | N        | 是否可筛选 |
| dataSource | Array   | Y        | 展示数据   |
| defaultKey | Array   | N        | 回显数据   |

`dataSource` 参数说明
与 el-tree 一样
| 字段 | 类型 | 是否必填 | 释义 | 默认值 |
| -------- | ------ | -------- | ---- | ------ |
| id | number | N | | |
| label | string | N | | |
| children | Tree[] | N | | |

### 二、出参

| 方法                  |     | 功能                       | 参数          |
| --------------------- | --- | -------------------------- | ------------- |
| handleClickMoveLeft   |     | 移动数据之后的的回调函数   | data 右侧数据 |
| handleClickMoveRight  |     | 移动数据之后的的回调函数   | data 右侧数据 |
| handleRightDataChange |     | 右侧数据发生变化的回调函数 | data 右侧数据 |
