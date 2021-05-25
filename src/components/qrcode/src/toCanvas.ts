import type { RenderQrCodeParams } from "../types";

import { renderQrCode } from "./drawCanvas";
import { drawLogo } from "./drawLogo";

export default (options: RenderQrCodeParams) => {
  return renderQrCode(options)
    .then(() => {
      return options;
    })
    .then(drawLogo) as Promise<string>;
};
