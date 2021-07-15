import type { Breadcrumb } from "./types";

import { RouterLink } from "vue-router";

export const renderLabel = (
  option: Breadcrumb
): VueNode | string | undefined => {
  const { label, path } = option;
  if (!path) return label;
  return <RouterLink to={path}>{label}</RouterLink>;
};
