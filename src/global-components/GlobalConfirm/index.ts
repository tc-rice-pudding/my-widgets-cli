import { ElMessage, ElMessageBox } from "element-plus";

export default {
  confirm: (
    message: string = `删除后不可恢复，是否确认删除？`,
    title: string = '',
    type: any = "warning"
  ) => {
    return ElMessageBox.confirm(message, title, {
      autofocus: false,
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type,
    });
  },
};
