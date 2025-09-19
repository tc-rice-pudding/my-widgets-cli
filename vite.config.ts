import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";
import postcsspxtoviewport8plugin from "postcss-px-to-viewport-8-plugin";

const timeStamp = new Date().getTime();
const optimizeDepsElementPlusIncludes = ["element-plus/es"];

const getSystem = (VITE_ENV, VITE_PUBLIC_PATH) => {
  let str = `<script src="${
    VITE_ENV === "development" ? "." : VITE_PUBLIC_PATH
  }/properties/system.js?_v=${new Date().getTime()}"></script>`;

  if (VITE_ENV === "development") {
    try {
      const fileData = fs.readFileSync(
        path.resolve(__dirname, "./localSystem.js"),
        {
          encoding: "utf-8",
        }
      );
      if (fileData) {
        str = `<script src="./localSystem.js"></script>`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return str;
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd(); // 当前工作目录
  const { VITE_PUBLIC_PATH, VITE_ENV } = loadEnv(mode, root); // 加载env环境
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            injectScript: getSystem(VITE_ENV, VITE_PUBLIC_PATH),
          },
        },
      }),
      AutoImport({
        // 不建议自动导入element-plus 会导致打包体积过大
        imports: ["vue"],
        dts: "src/auto-import.d.ts",
        eslintrc: {
          //自动生成.eslintrc-auto-import 配置
          enabled: true,
        },
      }),
    ],
    base: VITE_PUBLIC_PATH,
    server: {
      open: true, // 自开启浏览器
      host: "0.0.0.0",
      port: 1234,
      https: false,
      proxy: {
        "/api": {
          target: "http://192.168.8.80:9201/", // 测试
          changeOrigin: true,
          rewrite: (paths) => paths.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      minify: "terser",
      // target: 'esnext',
      // vue中使用顶级await 打包时报错 解决方法
      target: [
        "edge90",
        "chrome90",
        "firefox90",
        "safari15",
        "esnext",
        "chrome86",
      ],
      // css兼容老版本内核(360，红莲华浏览器dialog不显示问题)
      cssTarget: "chrome83",
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 禁用该功能可能会提高大型项目的构建性能
      // brotliSize: false,
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          // filename: `assets/[name].${timeStamp}.js`,
          // chunkFileNames: `assets/[name].${timeStamp}.js`,
          // 资源文件名 css 图片等等
          // assetFileNames: `assets/[name]-${timeStamp}-balabala.[ext]`
          // eslint-disable-next-line consistent-return
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // 分割包：pnpm下载的依赖，索引取2代表具体的依赖包名，npm取1
              const index = /.pnpm/.test(id) ? 2 : 1;
              return id
                .toString()
                .split("node_modules/")
                [index].split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    optimizeDeps: {
      // vite 默认不预构建node_modules中的包 但是  include 表示强制预约构建
      include: optimizeDepsElementPlusIncludes,
      // exclude 表示对以下包不做依赖于构建
      // exculde:['lodash-es']
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        $: path.resolve(__dirname, ""),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 全局变量
          additionalData: `@use "@/assets/style/index.scss" as *;`,
          // additionalIcon: `@use "@/assets/iconfont/iconfont.css" as *;`,
        },
      },
      postcss: {
        plugins: [
          postcsspxtoviewport8plugin({
            unitToConvert: "px",
            viewportWidth: 1920,
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ["*"], // 能转化为vw的属性列表
            viewportUnit: "vw", // 希望使用的视口单位
            fontViewportUnit: "vw", // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: true, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: [/src\/views\/widgets\/adaptScreenDemo/], // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: "vw", // 横屏时使用的单位
            landscapeWidth: 1024, // 横屏时使用的视口宽度
          }),
        ],
      },
    },
  };
});
