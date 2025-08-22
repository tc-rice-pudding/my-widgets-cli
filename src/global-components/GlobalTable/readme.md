<!--
 * @Author: liuqi
 * @Date: 2022-07-05 11:24:10
 * @LastEditTime: 2022-07-07 17:02:50
 * @LastEditors: user
 * @Description:
-->

## 表格组件：GobalTable 使用说明文档

### 一、入参

| 字段              | 类型    | 是否必填 | 释义                               |
| ----------------- | ------- | -------- | ---------------------------------- |
| tableData         | Array   | Y        | 渲染数据                           |
| columns           | Array   | Y        | 表头和渲染的对应字段               |
| loading           | Bollean | Y        | 表格 loading                       |
| pagination        | Object  | N        | 表格分页器                         |
| havePagination    | Bollean | N        | 是否需要分页器                     |
| showTooltip       | Bollean | N        | 元素超出宽度是否 tooltip 显示      |
| tableHeaderOption | Object  | N        | 表头操作项，如新增，删除等按钮操作 |

`tableHeaderOption 参数说明`

| 字段            | 类型    | 是否必填 | 释义             | 默认值 |
| --------------- | ------- | -------- | ---------------- | ------ |
| addText         | string  | N        | 添加按钮文本     | ‘添加' |
| isShowAddBtn    | Boolean | N        | 是否显示添加按钮 | true   |
| deleteText      | string  | N        | 删除按钮文本     | ‘删除' |
| isShowDeleteBtn | Boolean | N        | 是否显示删除按钮 | true   |

`pagination` 参数说明

| 字段     | 类型   | 是否必填 | 释义       | 默认值 |
| -------- | ------ | -------- | ---------- | ------ |
| page     | Number | N        | 页数       | 1      |
| pageSize | Number | N        | 每页多少条 | 10     |
| total    | Number | N        | 总条数     | 0      |

### 二、出参

| 方法         |     | 功能                   |
| ------------ | --- | ---------------------- |
| sizeChange   |     | 改变每页显示条数的方法 |
| pageChange   |     | 改变页数的方法         |
| selectChange |     | 表格选择项的数据       |

### 三、colums 属性

| 字段        | 是否必填 | 释义                             |
| ----------- | -------- | -------------------------------- |
| prop        | Y        | 字段                             |
| label       | Y        | 字段中文名                       |
| showTooltip | N        | 超出宽度是否 tooltip 提示        |
| min-width   | N        | 最小宽度，其他列的宽度将自动分配 |
| formatter   | N        | 对字段值做格式化的函数           |
| tdSlot      | N        | 操作项属性 插槽，值为：'operate' |
| labelSlot   | N        | 自定义表头 插槽                  |

### 四、插槽

| 插槽名            | 说明                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| tableHeaderOption | 表格头部提供了一个插槽，当 `tableHeaderOption` 对象都不满足你的需求<br />的时候，可以通过这个插槽自定义插入内容 |
|                   |                                                                                                                 |
