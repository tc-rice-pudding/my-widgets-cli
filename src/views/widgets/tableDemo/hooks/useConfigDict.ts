// import { dictList, vendorList } from "@/core/api/request";

const vendorIdOps = ref([]);
const sendTypeOps = ref([]);
const methodTypeOps = ref([]);
export const useConfigDict = () => {
  const getVendorIdOps = async () => {
    // const { data, code }: any = await vendorList();
    // vendorIdOps.value = (data ?? []).map((it) => ({
    //   ...it,
    //   label: it.vendorName,
    //   value: it.id,
    // }));
  };

  const getSendTypeOps = async () => {
    // const { data, code }: any = await dictList({
    //   pid: "0",
    //   groupCode: "syslog_send_type",
    // });
    // sendTypeOps.value = (data ?? []).map((it) => ({
    //   ...it,
    //   label: it.dictName,
    //   value: it.dictCode,
    // }));
  };
  const getMethodTypeOps = async () => {
    // const { data, code }: any = await dictList({
    //   pid: "0",
    //   groupCode: "request_method_type",
    // });
    // methodTypeOps.value = (data ?? []).map((it) => ({
    //   ...it,
    //   label: it.dictName,
    //   value: it.dictCode,
    // }));
  };

  const init = () => {
    Promise.all([getVendorIdOps(), getSendTypeOps(), getMethodTypeOps()]);
  };

  return { init, vendorIdOps, getVendorIdOps, sendTypeOps, methodTypeOps };
};
