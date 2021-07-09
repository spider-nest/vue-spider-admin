import { c, cB, cE } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

export const selector = "aside";

const { paddingBase, textColor1 } = commonLight;

const headerPadding = `${paddingBase / 2}px ${(paddingBase * 2) / 3}px`;

export default c([
  cB(selector, [
    cE("container", []),
    cE("header", {
      height: "48px",
      lineHeight: "48px",
      fontSize: "18px",
      fontWeight: 400,
      color: textColor1,
      overflow: "hidden",
    }),
    cE("collapse", {
      padding: headerPadding,
      verticalAlign: "top",
    }),
    cE("title", {
      padding: headerPadding,
    }),
  ]),
]);
