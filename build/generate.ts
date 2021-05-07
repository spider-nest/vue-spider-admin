import { resolve } from "path";
import { getThemeVariables } from "ant-design-vue/dist/theme";

import {
  generateAntColors,
  primaryColor,
  successColor,
  errorColor,
  warningColor,
} from "./theme";

const swatch = () => {
  const colors = [
    { type: "primary", value: primaryColor },
    { type: "success", value: successColor },
    { type: "error", value: errorColor },
    { type: "warning", value: warningColor },
  ];
  const swatches = {};
  colors.map((color) => {
    const palettes = generateAntColors(color.value);
    for (let index = 0; index < 10; index++) {
      swatches[`${color.type}-${index + 1}`] = palettes[index];
    }
    swatches[`${color.type}-color`] = color.value;
    if (color.type === "primary") {
      swatches["info-color"] = color.value;
      swatches["processing-color"] = color.value;
      swatches["link-color"] = color.value;
    } else if (color.type === "error") {
      swatches["highlight-color"] = color.value;
    }
  });
  return swatches;
};

export function generateModifyVars(dark = false) {
  const modifyVars = getThemeVariables({ dark });
  const swatches = swatch();
  return {
    ...modifyVars,
    hack: `${modifyVars.hack} @import (reference) "${resolve(
      "src/styles/config.less"
    )}";`,
    ...swatches,
  };
}
