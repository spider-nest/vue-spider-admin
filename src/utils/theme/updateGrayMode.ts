import { toggleClass } from "./util";

export default (flag: boolean) => {
  toggleClass(flag, "gray-mode");
};
