// import { glueDicList } from "@/core/api/taskMgr";

const tableData = ref([]);

const transformData = (data: any[] = []) => {
  data.forEach((it) => {
    it.value = it.id;
    it.label = it.name;
    transformData(it.children ?? []);
  });
};
export const useDictTree = () => {
  const getTableList = async () => {
    // const { data, code }: any = await glueDicList({
    //   pageNum: 1,
    //   pageSize: 99999,
    // });
    // if (code != 200) return;
    // tableData.value = data?.records ?? [];
    // transformData(tableData.value);
  };

  return { getTableList, tableData };
};
