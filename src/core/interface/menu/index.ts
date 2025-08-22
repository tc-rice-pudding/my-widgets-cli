export interface Menus {
  children?: Array<Menus>;
  component: Function;
  path: string;
  icon: string;
  hidden: any;
  meta: {
    title: string;
    affix: boolean;
    permission: string;
  };
  name: string;
  redirect?: string;
}
export interface MenuItem {
  url: string;
  title: string;
  icon: string;
  hidden: any;
  permission: string;
  children: Array<MenuItem>;
}
export interface AsyncMenus {
  attr: {
    icon: string;
    meta: { title: string };
    name: string;
    path: string;
  };
  children: Array<AsyncMenus>;
  code: string;
  id: number;
  name: string;
  parentId: string;
  sort: number;
  systemCode: string;
  systemId: number;
  systemName: string;
  systemSite: string;
}
