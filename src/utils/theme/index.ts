import {
  mixDarken,
  mixLighten,
  tinycolor,
} from "vite-plugin-theme/es/colorUtils";
import { replaceStyleVariables } from "vite-plugin-theme/es/client";

import { generateColors, getThemeColors } from "/@/../build/theme";

export async function changeTheme(color: string) {
  const colors = generateColors({
    color,
    mixLighten,
    mixDarken,
    tinycolor,
  });

  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors],
  });
}
