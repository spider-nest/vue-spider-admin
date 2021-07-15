import type { CacheTypeEnum } from "@/enums/cacheEnum";

// 菜单配置
export interface MenuConfig {
  collapsed: boolean;
}

// 动画配置
export interface TransitionConfig {
  // 是否开启页面加载滚动条
  openLoadingBar: boolean;
}

// 应用配置
export interface AppConfig {
  // 权限缓存类型
  permissionCacheType: CacheTypeEnum;
  // 页面主内容以全屏显示，即不显示菜单和顶部
  fullContent: boolean;
  menuConfig: MenuConfig;
  transitionConfig: TransitionConfig;
  // 是否开启 keep-alive
  openKeepAlive: boolean;
  // 样式命名空间
  styleNamespace: string;
  // 样式前缀
  stylePrefix: string;
}
