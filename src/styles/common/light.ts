import commonVariables from "./common";

// 亮色主题 全局变量
const derived = {
  ...commonVariables,
};

export default derived;

export type ThemeCommonVariables = typeof derived;
