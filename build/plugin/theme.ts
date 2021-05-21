import type { Plugin } from "vite";

import path from "path";
import {
  viteThemePlugin,
  antdDarkThemePlugin,
  mixLighten,
  mixDarken,
  tinycolor,
} from "vite-plugin-theme";

import { getThemeColors, generateColors } from "../theme";
import { generateModifyVars } from "../generate";

export default function themePlugin(isBuild: boolean): Plugin[] {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
  });
  const plugin = [
    viteThemePlugin({
      resolveSelector: (s) => {
        s = s.trim();
        switch (s) {
          case ".ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon":
            return ".ant-steps-item-icon > .ant-steps-icon";
          case ".ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)":
          case ".ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover":
          case ".ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active":
            return s;
          case ".ant-steps-item-icon > .ant-steps-icon":
            return s;
        }

        return `[data-theme] ${s}`;
      },
      colorVariables: [...getThemeColors(), ...colors],
    }),
    antdDarkThemePlugin({
      preloadFiles: [
        path.resolve(
          process.cwd(),
          "node_modules/ant-design-vue/dist/antd.less"
        ),
        path.resolve(process.cwd(), "src/styles/index.less"),
      ],
      filter: (id) => (isBuild ? !id.endsWith("antd.less") : true),
      darkModifyVars: {
        ...generateModifyVars(true),
        "text-color": "#c9d1d9",
        "text-color-base": "#c9d1d9",
        "component-background": "#151515",
        "text-color-secondary": "#8b949e",
        "border-color-base": "#303030",
        "item-active-bg": "#111b26",
      },
    }),
  ];

  return plugin as unknown as Plugin[];
}
