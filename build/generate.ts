import { resolve } from "path";
import { getThemeVariables } from "ant-design-vue/dist/theme";

import {
  generateAntColors,
  primaryColor,
  successColor,
  errorColor,
  warningColor,
} from "./theme";

export function generateModifyVars(dark = false) {
  // primaryColor === palettes[5]
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];

  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  const modifyVars = getThemeVariables({ dark });
  return {
    ...modifyVars,
    hack: `${modifyVars.hack} @import (reference) "${resolve(
      "src/styles/config.less"
    )}";`,
    "primary-color": primary,
    ...primaryColorObj,
    "info-color": primary,
    "success-color": successColor,
    "processing-color": primary,
    "error-color": errorColor,
    "highlight-color": errorColor,
    "waring-color": warningColor,
    "link-color": primary,
  };
}
