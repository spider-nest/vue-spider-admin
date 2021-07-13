import type { Breadcrumb } from "./types";

import { RouterLink } from "vue-router";

export const renderLabel = (option: Breadcrumb): VueNode => {
  const { label } = option;
  if (!option.path) return label;
  return <RouterLink to={option.path}>{option.label}</RouterLink>;
};
