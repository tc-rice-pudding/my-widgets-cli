# Vue 3 + TypeScript + Vite

欢迎来到 通用管理系统

## Recommended IDE Setup

- 开发工具

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 项目结构

```
.
├── README.md
├── config 配置信息
│   ├── default-settings.js
│   └── index.js
├── index.html
├── package-lock.json
├── package.json
├── deploy 打包脚本
├── release-dist 版本存储文件
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── api
│   ├── assets
│   ├── backup
│   ├── bc
│   ├── global-components 公共组件
│   ├── layout  公共页面框架
│   ├── main.js app挂载js
│   ├── permission  权限控制 暂时全部跳过
│   ├── router
│   ├── pinia   全局信息存储
│   ├── utils 公共方法
│   └── views pages
└── vite.config.js vite配置信息
```

## Git 贡献提交规范

- 后续将引入 pre-commit 严格检查模式
- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 运行项目

- 推荐 node 版本 v14.17.0 推荐安装 nvm / n 控制。

```text
 npm i  / yarn / pnpm i
 npm run dev
```

## Eslint 配置

- 配置参见 [vue](https://juejin.cn/post/6844903925686992904)

- vue3 有些许区别，修改参数



## aes加解密 配置
  - 配置见 /public/properties/system.js
      ```
        // aes 加解密key
        secretKey: "Y/ICzMXlWqgvv7qx+83YRkkuMNLj9nJs",
        // 加解密开启后排除在外不需要加解密的接口path，例如：["/common", "/hw?type=1"]
        excludeAesPath: [],
        // 请求体是否开启加密
        openHw110ReqEncrypt: false,
        // 只支持'/hwgz110','/hwgz110/**'两种格式,空数组则代表全部加密
        reqEncryptPath: [],
        // 响应体是否开启解密
        openHw110ResDecrypt: false,
        // 只支持'/hwgz110','/hwgz110/**'两种格式,空数组则代表全部加密
        resDecryptPath: [],
    ```
  - 使用见 src/utils/request.ts
