import { ThemeEnum, RouterTransitionEnum } from "@/enums/appEnum";
import {
  MenuTypeEnum,
  MenuModeEnum,
  TriggerEnum,
  TopMenuAlignEnum,
  MixSidebarTriggerEnum,
} from "@/enums/menuEnum";

// 页头配置
export interface HeaderSetting {
  theme: ThemeEnum;
  bgColor: string; // 背景颜色
  fixed: boolean; // 固定
  visible: boolean; // 是否可见
  fullscreenAction: boolean; // 显示全屏按钮
  lockScreenAction: boolean; // 显示锁屏按钮
  noticeAction: boolean; // 显示消息按钮
}

// 菜单配置
export interface MenuSetting {
  bgColor: string; // 背景颜色
  fixed: boolean; // 固定
  collapsed: boolean; // 折叠
  collapsedShowTitle: boolean; // 折叠时显示标题
  visible: boolean; // 是否可见
  width: number; // 宽度
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  divisible: boolean; // 分割
  topMenuAlign: TopMenuAlignEnum;
  trigger: TriggerEnum;
  accordion: boolean; // 手风琴
  closeMixSidebarOnChange: boolean; // 切换页面时关闭
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean; // 固定左侧混合模式菜单
}

// 多页标签配置
export interface MultiPageTabsSetting {
  visible: boolean; // 是否可见
  draggable: boolean; // 是否可拖动
  quickAction: boolean; // 显示快捷操作
  refreshAction: boolean; // 显示刷新按钮
  collapseAction: boolean; // 显示折叠按钮
}

// 页面切换动画配置
export interface TransitionSetting {
  enable: boolean; // 开启
  basicTransition: RouterTransitionEnum;
  pageLoading: boolean; // 页面加载
  progressBar: boolean; // 顶部进度条
}

// 网站配置
export interface AppConfig {
  settable: boolean; // 设置按钮
  grayMode: boolean; // 灰色模式
  colorWeak: boolean; // 色弱模式
  themeColor: string; // 主题色
  fullscreen: boolean; // 全屏
  logoVisible: boolean; // 显示 logo
  footerVisible: boolean; // 显示页脚
  headerSetting: HeaderSetting;
  menuSetting: MenuSetting;
  multiPageTabsSetting: MultiPageTabsSetting;
  transitionSetting: TransitionSetting;
  keepAlive: boolean; // 开启 keep-alive
  lockScreeTime: number; // 锁屏时间
  breadcrumbVisible: boolean; // 显示面包屑
  breadcrumbIconVisible: boolean; // 显示面包屑图标
  useErrorHandle: boolean; // 使用 error-handler-plugin
  backTopAction: boolean; // 显示回到顶部
  embedIframe: boolean; // 是否可以嵌入 iframe
  closeMessageAndNotify: boolean; // 切换界面时删除未关闭的 message 及 notify
  cancelPendingRequest: boolean; // 切换界面时取消已经发送但未响应的 http 请求
}

// 环境配置
export interface EnvConfig {
  mode: string; // 模式
  mock: string; // 模拟数据
  base_url: string; // 请求路径
  domain: string; // 主域名
}
