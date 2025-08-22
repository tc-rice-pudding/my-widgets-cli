import { computed } from "vue";
// import { useStore } from "vuex";
import { useAccount } from "@/pinia/modules/account";
import { storeToRefs } from "pinia";
export const useUserInfo = () => {
  // 第一种写法
  // const account = useAccount();
  // const userInfo = computed(() => account.userInfo);
  //第二种写法
  const account = storeToRefs(useAccount());
  const { userInfo } = account;
  return { userInfo };
};
