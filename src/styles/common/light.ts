import commonVariables from "./common";

// 亮色主题 全局变量
const derived = {
  name: "common" as const,
  ...commonVariables,
  scrollbarThumbBackgroundColor: "rgba(144, 147, 153, 0.3)",
};

export default derived;

export type ThemeCommonVariables = typeof derived;
