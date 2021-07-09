import { c, cB, cE } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

export const selector = "aside";

const { paddingBase, textColor1 } = commonLight;

export default c([
  cB(selector, [
    cE("container", []),
    cE("header", {
      padding: `${paddingBase / 2}px ${(paddingBase * 2) / 3}px`,
      fontSize: "18px",
      fontWeight: 400,
      color: textColor1,
    }),
  ]),
]);
