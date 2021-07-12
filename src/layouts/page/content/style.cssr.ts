import { c, cB, cE } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

export const selector = "page-content";

const { baseColor, dividerColor } = commonLight;

export default c([
  cB(
    selector,
    {
      position: "relative",
      display: "flex",
      height: "100%",
    },
    [
      cE("main", { flex: 1 }),
      cE("aside", {
        width: "48px",
        backgroundColor: baseColor,
        borderLeft: `1px solid ${dividerColor}`,
      }),
    ]
  ),
]);
