<script lang="ts">
import { defineComponent } from "vue";

import { SResult, SButton, SLayout } from "@/components";
import LayoutDefaultFooter from "@/layouts/default/footer/Index.vue";

import useThemeStyle from "@/hooks/web/useThemeStyle";
import useAppConfig from "@/hooks/config/useAppConfig";
import { useGo } from "@/hooks/web/usePage";

import { elementPrefix } from "@/utils/cssr";

import { PageEnum } from "@/enums/pageEnum";

import style, { selector } from "./style.cssr";

const name = "ErrorPage";

export default defineComponent({
  name,
  components: { SResult, SButton, SLayout, LayoutDefaultFooter },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;
    const cE = `${cB}${elementPrefix}`;

    const go = useGo();
    const goHome = () => {
      go(PageEnum.BASE_HOME, true);
    };

    return { cB, cE, goHome };
  },
});
</script>

<template>
  <SLayout position="absolute">
    <div :class="cB">
      <div :class="`${cE}content`">
        <SResult status="418" title="先喝杯绿茶">
          <template #footer>
            <SButton @click.stop.prevent="goHome">去主页</SButton>
          </template>
        </SResult>
      </div>
      <LayoutDefaultFooter />
    </div>
  </SLayout>
</template>
