import { commonLight } from "naive-ui";

const scrollbarThumbBackgroundColor = "rgba(144, 147, 153, 0.3)";

// 全局变量
export default {
  // naive-ui
  ...commonLight,
  primaryColor: commonLight.infoColor,
  primaryColorHover: commonLight.infoColorHover,
  primaryColorPressed: commonLight.infoColorPressed,
  primaryColorSuppl: commonLight.infoColorSuppl,
  scrollbarColor: scrollbarThumbBackgroundColor,
  scrollbarColorHover: scrollbarThumbBackgroundColor,

  // local
  scrollbarWidth: 6,
  scrollbarHeight: 6,
  scrollbarBorderRadius: 4,
  marginBase: 24,
  paddingBase: 24,
  scrollbarThumbBackgroundColor,
};
