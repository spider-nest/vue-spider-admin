import type { SessionTimeoutProcessingEnum } from "@/enums/appEnum";
import type { CacheTypeEnum } from "@/enums/cacheEnum";

// 菜单配置
export interface MenuConfig {
  collapsed: boolean;
}

// 应用配置
export interface AppConfig {
  // 权限缓存类型
  permissionCacheType: CacheTypeEnum;
  // 会话超时处理类型
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // 主题颜色
  themeColor: string;
  // 页面主内容以全屏显示，即不显示菜单和顶部
  fullContent: boolean;
  // 菜单配置
  menuConfig: MenuConfig;
  // 是否开启 keep-alive
  openKeepAlive: boolean;
}
