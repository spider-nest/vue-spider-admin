import { c, cB, cE } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

const { marginBase, paddingBase, textColor3, primaryColorHover } = commonLight;

export const selector = "footer";

export default c([
  cB(
    selector,
    {
      margin: `${marginBase * 2}px 0 ${marginBase}px 0`,
      padding: `0 ${paddingBase}px`,
      textAlign: "center",
    },
    [
      cE(
        "link",
        {
          marginBottom: `${marginBase / 3}px`,
        },
        [
          c(
            " > a",
            {
              margin: `0 ${marginBase / 2}px`,
              color: textColor3,
            },
            [
              c("&:hover", {
                color: primaryColorHover,
              }),
            ]
          ),
        ]
      ),
      cE("copyright", {
        color: textColor3,
      }),
    ]
  ),
]);
