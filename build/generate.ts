import { resolve } from "path";
import { getThemeVariables } from "ant-design-vue/dist/theme";

import { generateAntColors, primaryColor } from "./theme";

export function generateModifyVars(dark = false) {
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
      "src/design/config.less"
    )}";`,
    "primary-color": primary,
    ...primaryColorObj,
    "info-color": primary,
    "processing-color": primary,
    "link-color": primary,
  };
}
