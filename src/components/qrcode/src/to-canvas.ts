import type { RenderQrcodeParams } from "../types";

import { renderQrcode } from "./draw-canvas";
import { drawLogo } from "./draw-logo";

export default (options: RenderQrcodeParams) => {
  return renderQrcode(options)
    .then(() => {
      return options;
    })
    .then(drawLogo) as Promise<string>;
};
