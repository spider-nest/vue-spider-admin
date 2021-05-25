import type { QRCodeSegment, QRCodeRenderersOptions } from "qrcode";

export type ContentType = string | QRCodeSegment[];

export type { QRCodeRenderersOptions };

export type LogoType = {
  src: string;
  logoSize: number;
  borderColor: string;
  bgColor: string;
  borderSize: number;
  crossOrigin: string;
  borderRadius: number;
  logoRadius: number;
};

export interface RenderQrcodeParams {
  canvas: any;
  content: ContentType;
  width?: number;
  options?: QRCodeRenderersOptions;
  logo?: LogoType | string;
  image?: HTMLImageElement;
}

export type ToCanvasFn = (options: RenderQrcodeParams) => Promise<unknown>;

export interface QrcodeDoneEventParams {
  url: string;
  ctx?: CanvasRenderingContext2D | null;
}
