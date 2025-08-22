import Clipboard from "clipboard";
import { ElMessage } from "element-plus";
export const useClipboard = () => {
  let clipboard = new Clipboard(".copy");
  clipboard.on("success", (e) => {
    ElMessage.success("复制成功");
    // 释放内存
    clipboard.destroy();
  });
  clipboard.on("error", (e) => {
    ElMessage.error("当前浏览器不支持复制命令");
    // 释放内存
    clipboard.destroy();
  });
};
