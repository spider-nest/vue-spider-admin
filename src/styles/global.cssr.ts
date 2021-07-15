import { c } from "@/utils/cssr";

import { commonLight } from "./common";

const {
  scrollbarWidth,
  scrollbarHeight,
  scrollbarBorderRadius,
  scrollbarThumbBackgroundColor,
  primaryColorHover,
} = commonLight;

export default c([
  c(`::-webkit-scrollbar-track, ::-webkit-scrollbar-track-piece`, {
    backgroundColor: "transparent",
  }),
  c("::-webkit-scrollbar", {
    width: `${scrollbarWidth}px`,
    height: `${scrollbarHeight}px`,
  }),
  c(`::-webkit-scrollbar-thumb`, {
    backgroundColor: scrollbarThumbBackgroundColor,
    borderRadius: `${scrollbarBorderRadius}px`,
  }),
  c("html, body, #spider", {
    width: "100%",
    height: "100%",
  }),
  c("body", {
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    textRendering: "optimizeLegibility",
    backgroundColor: "#f0f2f5",
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
  c(
    "a",
    {
      textDecoration: "none",
      backgroundColor: "transparent",
      outline: "none",
    },
    [
      c("&:hover", {
        color: primaryColorHover,
      }),
    ]
  ),
  c(
    "a, area, button, [role='button'], input:not([type='range']), label, select, summary, textarea",
    {
      touchAction: "manipulation",
    }
  ),
]);
