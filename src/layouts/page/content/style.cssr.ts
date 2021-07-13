import { c, cB, cE } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

import fadeInTransition from "@/styles/transitions/fade-in.cssr";

export const selector = "page-content";

const { baseColor, dividerColor, paddingBase } = commonLight;

export default c([
  cB(
    selector,
    {
      position: "relative",
      display: "flex",
      height: "100%",
    },
    [
      fadeInTransition(),
      cE("main", { flex: 1, overflow: "auto" }),
      cE("container", {
        padding: `${paddingBase}px`,
        minHeight: "calc(100% - 148px)",
        boxSizing: "border-box",
      }),
      cE("aside", {
        width: "48px",
        backgroundColor: baseColor,
        borderLeft: `1px solid ${dividerColor}`,
      }),
    ]
  ),
]);
