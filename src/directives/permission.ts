import { useAccount } from "@/pinia/modules/account";
import type { Directive, DirectiveBinding } from "vue";

interface PermissionBinding extends DirectiveBinding {
  value: string | string[];
}

const isHasPermission = (el: HTMLElement, binding: PermissionBinding) => {
  const { permissionList } = useAccount();
  const permissions = Array.isArray(binding.value)
    ? binding.value
    : [binding.value];

  const hasPermission = permissions.some((permission) =>
    permissionList.includes(permission)
  );

  if (!hasPermission) {
    nextTick(() => {
      el.parentNode?.removeChild(el);
    });
  }
};

const vPermission: Directive = {
  beforeMount(el: HTMLElement, binding: PermissionBinding) {
    isHasPermission(el, binding);
  },
  updated(el: HTMLElement, binding: PermissionBinding) {
    isHasPermission(el, binding);
  },
};

declare global {
  interface HTMLElement {
    _permissionOriginalDisplay?: string;
  }
}

export default vPermission;
