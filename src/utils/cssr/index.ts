import CSSRender from "css-render";
import BEMPlugin from "@css-render/plugin-bem";
import createKey from "./createKey";

export const namespace = "spider";
export const prefix = `.${namespace}-`;
export const elementPrefix = "__";
export const modifierPrefix = "--";

const cssRender = CSSRender();
const plugin = BEMPlugin({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix,
});
cssRender.use(plugin);

const { c, find } = cssRender;
const { cB, cE, cM, cNotM } = plugin;

export { c, find, cB, cE, cM, cNotM, createKey };
