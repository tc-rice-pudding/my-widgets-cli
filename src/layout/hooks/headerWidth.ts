/* eslint-disable no-shadow */
import { useApp } from "@/pinia/modules/app";
import { watch, ref } from "vue";

const headerWidth = () => {
  const { sidebar } = useApp();
  const headerWidth = ref<boolean>(false);
  watch(
    () => sidebar.collapse,
    (v) => {
      headerWidth.value = v === true;
    },
    { immediate: true }
  );
  return headerWidth;
};

export default headerWidth;
