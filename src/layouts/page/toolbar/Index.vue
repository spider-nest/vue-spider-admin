<script lang="ts">
import { defineComponent } from "vue";

import { SLayout, SAvatar } from "@/components";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

import { useUserStore } from "@/store/modules/user";

import { elementPrefix } from "@/utils/cssr";

const name = "LayoutPageToolbar";

export default defineComponent({
  name,
  components: { SLayout, SAvatar },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;
    const cE = `${cB}${elementPrefix}`;

    const userStore = useUserStore();
    const userInfo = userStore.getUserInfo;

    return { cB, cE, userInfo };
  },
});
</script>

<template>
  <SLayout :class="cB">
    <div :class="`${cE}avatar`">
      <SAvatar>{{ userInfo.realName }}</SAvatar>
    </div>
    <!-- 以后或许会有全局的操作呢 -->
  </SLayout>
</template>
