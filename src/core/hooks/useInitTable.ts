//表单初始化 hooks
export const useInitTable = (fun: Function, pagination: any) => {
  const init = () => {
    pagination.pageNum = 1;
    pagination.pageSize = 10;
    fun();
  };
  // 条数变化 ?hooks 传参
  const sizeChanges = (val?: number) => {
    pagination.pageSize = val;
    pagination.pageNum = 1;
    fun();
  };

  // 页数变化
  const pageChanges = (val?: number) => {
    pagination.pageNum = val;
    fun();
  };
  return [init, sizeChanges, pageChanges];
};
