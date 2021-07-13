import { c, cB } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

export const selector = "page-footer";

const { baseColor, paddingBase, dividerColor } = commonLight;

export default c([
  cB(
    selector,
    {
      backgroundColor: baseColor,
    },
    [
      cB("footer", {
        margin: 0,
        padding: `${paddingBase - 1}px ${paddingBase}px ${paddingBase}px`,
        borderTop: `1px solid ${dividerColor}`,
      }),
    ]
  ),
]);
