import { c, cB, cE } from "@/utils/cssr";

export const selector = "page-content";

export default c([
  cB(
    selector,
    {
      position: "relative",
      display: "flex",
      height: "100%",
    },
    [cE("main", { flex: 1 }), cE("aside", { width: "56px" })]
  ),
]);
