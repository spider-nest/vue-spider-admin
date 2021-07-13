import { c, cB } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

export const selector = "page-toolbar-item";

const { dividerColor, marginBase } = commonLight;

const lineHeight = 48;

export default c([
  cB(
    selector,
    {
      height: `${lineHeight}px`,
      lineHeight: `${lineHeight}px`,
      borderBottom: `1px solid ${dividerColor}`,
      boxSizing: "border-box",
    },
    [
      c(".n-avatar", {
        margin: "7px",
      }),
      c(".n-icon", {
        margin: `${marginBase / 2}px`,
        fontSize: `${lineHeight - marginBase}px`,
      }),
    ]
  ),
]);
