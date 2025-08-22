## 树形 GlobalUpload 使用说明文档

### 一、入参

| 字段            | 类型    | 是否必填 | 释义                                                               |
| --------------- | ------- | -------- | ------------------------------------------------------------------ |
| action          | String  | Y        | 请求 URL                                                           |
| headers         | Object  | N        | 设置上传的请求头部                                                 |
| data            | Object  | N        | 上传时附带的额外参数                                               |
| uploadBtnConfig | Object  | N        | 上传按钮配置 { text: '', btnType: 'primary' }                      |
| limitNum        | Number  | N        | 限制上传的数量，默认 1 个                                          |
| limitSize       | Number  | N        | 限制文件的大小, 默认 5MB                                           |
| listType        | String  | N        | 文件显示格式 ['text','picture', 'picture-card']其中一种。默认 text |
| multiple        | Boolean | N        | 是否支持多选 默认 false                                            |
| uploadFileType  | Array   | N        | 上传文件类型, 默认：["png", "jpeg", "jpg"]                         |
| showFileList    | Boolean | N        | 是否显示文件列表 默认：true                                        |
| fileList        | Array   | N        | 默认上传文件                                                       |
| autoUpLoad      | Boolean | N        | 是否自动上传 默认：true                                            |
| drag            | Boolean | N        | 是否启用拖拽上传                                                   |
| tempList        | Array   | N        | 模版下载列表 默认 [] item= {fileName: ''}                          |

### 二、出参

| 方法            |     | 功能         | 参数     |
| --------------- | --- | ------------ | -------- |
| update:fileList |     | 更新文件列表 | 文件列表 |
| updateSuccess   |     | 上传成功     | 文件列表 |
| handleTemplate  |     | 点击模版列表 | 模版对象 |
