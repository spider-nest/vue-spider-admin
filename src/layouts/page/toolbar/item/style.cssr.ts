import { c, cB } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

export const selector = "page-toolbar-item";

const { dividerColor } = commonLight;

export default c([
  cB(
    selector,
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
]);
