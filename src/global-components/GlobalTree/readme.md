## 树形 GlobalTree 使用说明文档

### 一、入参

| 字段            | 类型    | 是否必填 | 释义                                                    |
| --------------- | ------- | -------- | ------------------------------------------------------- |
| contextMenu     | Array   | Y        | 右键菜单数据                                            |
| dataSource      | Array   | Y        | 展示数据                                                |
| node-key        | string  | Y        | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的    |
| show-checkbox   | Bollean | N        | 节点是否可被选择                                        |
| menusPlacement  | Bollean | N        | 是否需要分页器                                          |
| showContextMenu | Bollean | N        | 是否展示右键菜单                                        |
| nodeIcon        | string  | N        | label 前面自定义图片 与 data.icon 互斥                  |
| nodeIconStyle   | Object  | N        | 默认值{width: '30px'}                                   |
| filterable      | Boolean | N        | 是否可筛选                                              |
| showLabelIcon   | Boolean | N        | 是否展示 label icon false 的话 nodeIcon、data.icon 失效 |
| showLabelId     | Boolean | N        | 是否展示 label 后面 “（ID：XXX）”                       |

`contextMenu 参数说明`

| 字段   | 类型   | 是否必填 | 释义             |
| ------ | ------ | -------- | ---------------- |
| name   | string | Y        | 操作项名称       |
| method | string | Y        | 操作项对应的方法 |
| value  | string | Y        | 操作项唯一键     |

`dataSource` 参数说明
与 el-tree 一样
| 字段 | 类型 | 是否必填 | 释义 | 默认值 |
| -------- | ------ | -------- | ---------- | ------ |
| id | number | N | | |
| label | string | N | | |
| children | Tree[] | N | | |

### 二、出参

| 方法                |     | 功能                       | 参数                                                                    |
| ------------------- | --- | -------------------------- | ----------------------------------------------------------------------- |
| handleClickTreeMenu |     | 树菜单操作之后的的回调函数 | (data, method) 返回两个参数: 1. 当前选择的节点 2. 当前操作菜单的 method |
