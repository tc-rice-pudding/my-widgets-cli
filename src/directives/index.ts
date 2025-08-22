import { App } from 'vue';

// 类型定义
type DirectiveModule = {
  default: {
    name?: string;
    [key: string]: any;
  };
};
type DirectiveLoader = () => Promise<DirectiveModule>;

export async function registerDirectives(app: App) {
  // 1. 动态导入所有指令文件
  const directiveFiles = import.meta.glob<DirectiveLoader>("./*.ts", {
    import: "default",
    eager: false,
  });

  // 2. 排除 index.ts、has.ts 文件
  const filteredFiles = Object.entries(directiveFiles)
    .filter(([path]) => !path.includes("index.ts"))
    .filter(([path]) => !path.includes("has.ts"));

  // 3. 加载并注册指令
  await Promise.all(
    filteredFiles.map(async ([path, loader]) => {
      try {
        const module = await loader();
        const directive = module;

        // 获取指令名 (从文件名或指令对象的 name 属性)
        const directiveName = path.split("/").pop()?.replace(/\.ts$/, "") || "";

        if (directiveName) {
          // 注册指令 (自动添加 v- 前缀)
          app.directive(directiveName, directive);
          console.log(`[Directive] Registered: v-${directiveName}`);
        }
      } catch (error) {
        console.error(`[Directive] Failed to load ${path}:`, error);
      }
    })
  );
}

