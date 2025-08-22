import { useAccount } from "@/pinia/modules/account";
const { authInfo, userInfo } = useAccount();
const adminId = (window as any).globalConstant.adminId;

export const permission = {
  has: function (action: any) {
    if (!action || !authInfo.permissions || userInfo.userId == adminId) {
      return true;
    }
    if (typeof action === "string" && action) {
      return authInfo.permissions.find((item) => item == action);
    } else {
      throw "The param of permission.has must be strings!";
    }
  },
};
