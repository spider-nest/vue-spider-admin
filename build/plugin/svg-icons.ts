import type { Plugin } from "vite";

import path from "path";
import SvgIconsPlugin from "vite-plugin-svg-icons";

export default function (isBuild: boolean): Plugin {
  return SvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    svgoOptions: isBuild,
    symbolId: "icon-[dir]-[name]",
  });
}
