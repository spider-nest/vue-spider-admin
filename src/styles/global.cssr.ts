import { c } from "@/utils/cssr";

import { commonLight } from "./common";

export default c([
  c(`::-webkit-scrollbar-track, ::-webkit-scrollbar-track-piece`, {
    backgroundColor: "transparent",
  }),
  c("::-webkit-scrollbar", {
    width: commonLight.scrollbarWidth,
    height: commonLight.scrollbarHeight,
  }),
  c(`::-webkit-scrollbar-thumb`, {
    backgroundColor: commonLight.scrollbarThumbBackgroundColor,
    borderRadius: "4px",
  }),
  c("html, body, #spider", {
    width: "100%",
    height: "100%",
  }),
  c("body", {
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    textRendering: "optimizeLegibility",
    backgroundColor: "#ffffff",
  }),
  c("canvas", {
    display: "block",
  }),
  c("ul, ol", {
    listStyle: "none",
  }),
  c("img, video", {
    maxWidth: "100%",
    maxHeight: "100%",
  }),
]);
