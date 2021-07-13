import { c, cB, cE } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

export const selector = "page-toolbar";

const { dividerColor } = commonLight;

export default c([
  cB(selector, [
    cE(
      "avatar",
      {
        height: "48px",
        lineHeight: "48px",
        borderBottom: `1px solid ${dividerColor}`,
        boxSizing: "border-box",
      },
      [
        c("& > .n-avatar", {
          margin: "7px",
        }),
      ]
    ),
  ]),
]);
