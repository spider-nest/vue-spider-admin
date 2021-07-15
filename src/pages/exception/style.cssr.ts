import { c, cB, cE } from "@/utils/cssr";

export const selector = "error-page";

export default c([
  cB(
    selector,
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    [
      cE("content", {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }),
    ]
  ),
]);
