import { c, cB, cE } from "@/utils/cssr";

import BackgroundSvg from "@/assets/background.svg";

import { commonLight } from "@/styles/common";

const { textColor2, marginBase, textColor1 } = commonLight;

export const selector = "login";

export default c([
  cB(
    selector,
    {
      width: "100%",
      height: "100%",
    },
    [
      cE("container", {
        position: "relative",
        width: "100%",
        height: "100%",
        padding: "110px 16px 144px",
        background: `#fafafc url(${BackgroundSvg}) no-repeat 50%`,
        backgroundSize: "100%",
        boxSizing: "border-box",
      }),
      cE("header", {
        textAlign: "center",
      }),
      cE("title", {
        textAlign: "center",
        fontSize: "22px",
        fontWeight: 400,
        color: textColor1,
      }),
      cE("logo", {
        width: "48px",
        verticalAlign: "middle",
      }),
      cE("desc", {
        margin: `${marginBase / 2}px 0 ${marginBase * 2}px`,
        color: textColor2,
      }),
      cE("main", {
        maxWidth: "368px",
        minWidth: "260px",
        margin: "0 auto",
      }),
      cE("footer", {
        position: "absolute",
        right: 0,
        bottom: 0,
        left: 0,
        textAlign: "center",
      }),
    ]
  ),
]);
