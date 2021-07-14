import { c, cB, cM } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

export const selector = "page-toolbar-item";

const { dividerColor, marginBase } = commonLight;

const lineHeight = 48;

const lineHeightSmall = 36;

export default c([
  cB(
    selector,
    {
      borderBottom: `1px solid ${dividerColor}`,
      boxSizing: "border-box",
    },
    [
      cM("default", {
        height: `${lineHeight}px`,
        lineHeight: `${lineHeight}px`,
      }),
      cM(
        "small",
        {
          height: `${lineHeightSmall}px`,
          lineHeight: `${lineHeightSmall}px`,
        },
        [
          c(".n-icon", {
            margin: `${marginBase / 4}px ${marginBase / 2}px`,
            fontSize: `${lineHeightSmall - marginBase / 2}px`,
          }),
        ]
      ),
      c("&:hover", {
        cursor: "pointer",
      }),
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
