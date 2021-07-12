import { c, cB } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

export const selector = "page-header";

const { paddingBase } = commonLight;

export default c([
  cB(
    selector,
    {
      padding: `0 ${paddingBase}px`,
      height: "48px",
      lineHeight: "48px",
    },
    []
  ),
]);
