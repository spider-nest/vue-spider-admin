import { MenuModeEnum, MenuTypeEnum } from "/@/enums/menuEnum";

export interface BeforeRestoreInfo {
  menuCollapsed?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}

export interface UserInfo {
  userId: string | number;
  account: string;
  realName: string;
  avatar: string;
  desc?: string;
}
