import type { AppConfig } from "@/types/config";

import {
  MenuTypeEnum,
  MenuModeEnum,
  TopMenuAlignEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from "@/enums/menuEnum";
import { ThemeEnum, RouterTransitionEnum } from "@/enums/appEnum";
import { isProdMode } from "@/utils/env";
import {
  primaryColor,
  white,
  layoutSiderBackground,
} from "@/styles/variable.less";

const setting: AppConfig = {
  settable: true,
  grayMode: false,
  colorWeak: false,
  themeColor: primaryColor,
  fullscreen: false,
  logoVisible: true,
  footerVisible: true,
  headerSetting: {
    theme: ThemeEnum.LIGHT,
    bgColor: white,
    fixed: true,
    visible: true,
    fullscreenAction: true,
    lockScreenAction: true,
    noticeAction: true,
  },
  menuSetting: {
    bgColor: layoutSiderBackground,
    fixed: true,
    collapsed: false,
    collapsedShowTitle: false,
    visible: true,
    width: 200,
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
    theme: ThemeEnum.DARK,
    divisible: false,
    topMenuAlign: TopMenuAlignEnum.CENTER,
    trigger: TriggerEnum.HEADER,
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    mixSideFixed: false,
  },
  multiPageTabsSetting: {
    visible: true,
    draggable: true,
    quickAction: true,
    refreshAction: true,
    collapseAction: true,
  },
  transitionSetting: {
    enable: true,
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    pageLoading: true,
    progressBar: true,
  },
  keepAlive: true,
  lockScreeTime: 0,
  breadcrumbVisible: true,
  breadcrumbIconVisible: false,
  useErrorHandle: isProdMode(),
  backTopAction: true,
  embedIframe: true,
  closeMessageAndNotify: true,
  cancelPendingRequest: true,
};

export default setting;
