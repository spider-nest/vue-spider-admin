import type { CNode } from "css-render";

import { onBeforeMount } from "vue";
import { useSsrAdapter } from "@css-render/vue3-ssr";

import useAppConfig from "@/hooks/config/useAppConfig";

import globalStyle from "@/styles/global.cssr";

const { styleNamespace } = useAppConfig();

export default function useThemeStyle(
  mountId?: string,
  style?: CNode,
  clsPrefixRef?: string
): void {
  const ssrAdapter = useSsrAdapter();

  globalStyle.mount({
    id: `${styleNamespace}/global`,
    head: true,
    ssr: ssrAdapter,
  });

  if (mountId && style) {
    const mountStyle = (): void => {
      const clsPrefix = clsPrefixRef || styleNamespace;
      style.mount({
        id: `${clsPrefix}${mountId}`,
        head: true,
        props: {
          bPrefix: `.${clsPrefix}-`,
        },
        ssr: ssrAdapter,
      });
    };

    if (ssrAdapter) {
      mountStyle();
    } else {
      onBeforeMount(mountStyle);
    }
  }
}
