import { replaceStyleVariables } from "vite-plugin-theme/es/client";
import { mixLighten, mixDarken, tinycolor } from "vite-plugin-theme";
import { generate } from "@ant-design/colors";

type Fn = (...arg: any) => any;
type Theme = "default" | "dark";

export interface GenerateColorsParams {
  mixLighten: Fn;
  mixDarken: Fn;
  tinycolor: any;
  color?: string;
}

export const primaryColor = "#0336ff";
export const successColor = "#356859";
export const errorColor = "#e30425";
export const warningColor = "#f9aa33";

export function generateAntColors(color: string, theme: Theme = "default") {
  return generate(color, {
    theme,
  });
}

export function getThemeColors(color?: string) {
  const tc = color || primaryColor;
  const lightColors = generateAntColors(tc);
  const primary = lightColors[5];
  const modeColors = generateAntColors(primary, "dark");

  return [...lightColors, ...modeColors];
}

export function generateColors({
  color = primaryColor,
  mixLighten,
  mixDarken,
  tinycolor,
}: GenerateColorsParams) {
  const arr = new Array(19).fill(0);
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5);
  });

  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5);
  });

  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString();
  });

  const shortAlphaColors = alphaColors.map((item) =>
    item.replace(/\s/g, "").replace(/0\./g, ".")
  );

  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString();
    })
    .filter((item) => item !== "#ffffff");

  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString();
    })
    .filter((item) => item !== "#000000");
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes("-"));
}

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
