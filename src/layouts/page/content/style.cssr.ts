import { c, cB, cE } from "@/utils/cssr";

import { commonLight } from "@/styles/common";

import fadeInTransition from "@/styles/transitions/fade-in.cssr";

export const selector = "page-content";

const {
  baseColor,
  dividerColor,
  paddingBase,
  scrollbarWidth,
  scrollbarBorderRadius,
} = commonLight;

export default c([
  cB(
    selector,
    {
      position: "relative",
      display: "flex",
      height: "100%",
    },
    [
      fadeInTransition(),
      cE("main", { flex: 1, overflow: "auto" }),
      cE("container", {
        padding: `${paddingBase}px`,
        minHeight: "calc(100% - 148px)",
        boxSizing: "border-box",
      }),
      cE(
        "aside",
        {
          position: "relative",
          width: "48px",
          backgroundColor: baseColor,
          borderLeft: `1px solid ${dividerColor}`,
        },
        [
          c(".n-scrollbar", [
            c("& > .n-scrollbar-rail", [
              c(
                "&.n-scrollbar-rail--vertical",
                {
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: `${scrollbarWidth}px !important`,
                },
                [
                  c("& > .n-scrollbar-rail__scrollbar", {
                    width: `${scrollbarWidth}px !important`,
                    borderRadius: `${scrollbarBorderRadius}px !important`,
                  }),
                  c("& > .n-scrollbar-rail__scrollbar:hover", {
                    width: `${scrollbarWidth}px !important`,
                    borderRadius: `${scrollbarBorderRadius}px !important`,
                  }),
                ]
              ),
            ]),
          ]),
        ]
      ),
    ]
  ),
]);
