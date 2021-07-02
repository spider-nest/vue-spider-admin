import type { ThemeCommonVariables } from "./common";
import type { GlobalThemeWithoutCommon } from "./internalInterface";

export interface GlobalTheme extends GlobalThemeWithoutCommon {
  common?: ThemeCommonVariables;
  scrollbarThumbBackgroundColor?: string;
}
