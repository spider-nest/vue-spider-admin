import { c, cB, cE } from "@/utils/cssr";

import BackgroundSvg from "@/assets/background.svg";

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
      cE("header", {}),
      cE("main", {}),
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
