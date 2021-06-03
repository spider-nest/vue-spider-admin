import type { App, Directive, DirectiveBinding } from "vue";

import { usePermission } from "/@/hooks/usePermission";

function isVest(el: Element, binding: any) {
  const { hasPermission } = usePermission();

  const value = binding.value;
  if (!value) return;
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isVest(el, binding);
};

const vestDirective: Directive = {
  mounted,
};

export function setupPermissionDirective(app: App) {
  app.directive("vest", vestDirective);
}

export default vestDirective;
