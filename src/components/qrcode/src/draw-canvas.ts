import type { QRCodeRenderersOptions } from "qrcode";

import type { RenderQrcodeParams, ContentType } from "../types";

import { toCanvas } from "qrcode";

function getOriginWidth(content: ContentType, options: QRCodeRenderersOptions) {
  const _canvas = document.createElement("canvas");
  return toCanvas(_canvas, content, options).then(() => _canvas.width);
}

function getErrorCorrectionLevel(content: ContentType) {
  if (content.length > 36) {
    return "M";
  } else if (content.length > 16) {
    return "Q";
  } else {
    return "H";
  }
}

const defaultOptions = {
  margin: 0,
};

export const renderQrcode = ({
  canvas,
  content,
  width = 0,
  options = {},
}: RenderQrcodeParams) => {
  const sOptions = { ...options, ...defaultOptions };
  sOptions.errorCorrectionLevel =
    sOptions.errorCorrectionLevel || getErrorCorrectionLevel(content);

  return getOriginWidth(content, sOptions).then((_width: number) => {
    if (width > 0) {
      sOptions.scale = (width / _width) * 4;
    }
    return toCanvas(canvas, content, sOptions);
  });
};
