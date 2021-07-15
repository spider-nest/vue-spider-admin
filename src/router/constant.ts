export const REDIRECT_NAME = "Redirect";

export const PARENT_LAYOUT_NAME = "ParentLayout";

export const EXCEPTION_COMPONENT = () => import("@/pages/exception/Index.vue");

export const LAYOUT = () => import("@/layouts/default/Index.vue");

export const getParentLayout = () => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      });
    });
};
