// 菜单类型
export enum MenuTypeEnum {
  SIDEBAR = "sidebar", // 左侧菜单
  MIX_SIDEBAR = "mix-sidebar", // 左侧混合菜单
  TOP_MENU = "top-menu", // 顶部菜单
  MIX = "mix", // 顶部混合菜单
}

// 菜单模式
export enum MenuModeEnum {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
  VERTICAL_RIGHT = "vertical-right",
  INLINE = "inline",
}

// 菜单折叠触发器位置
export enum TriggerEnum {
  NONE = "NONE", // 不显示
  FOOTER = "FOOTER", // 菜单底部
  HEADER = "HEADER", // 页面顶部
}

// 菜单分割类型
export enum MenuSplitTypeEnum {
  NONE,
  TOP,
  LEFT,
}

// 顶部菜单位置
export enum TopMenuAlignEnum {
  CENTER = "center",
  START = "start",
  END = "end",
}

// 混合菜单触发方式
export enum MixSidebarTriggerEnum {
  HOVER = "hover",
  CLICK = "click",
}
