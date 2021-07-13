import type { Breadcrumb } from "@/layouts/page/header/Index.vue";

import { RouterLink } from "vue-router";

export const renderLabel = (option: Breadcrumb): VueNode => {
  const { label } = option;
  if (!option.path) return label;
  return <RouterLink to={option.path}>{option.label}</RouterLink>;
};
