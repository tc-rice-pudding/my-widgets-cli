import { computed } from "vue";
// import { useStore } from "vuex";
import { useAccount } from "@/pinia/modules/account";
import { storeToRefs } from "pinia";
export const useUserInfo = () => {
  const { userInfo } = storeToRefs(useAccount());
  return { userInfo };
};
