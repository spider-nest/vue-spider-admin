<script lang="ts">
import { defineComponent } from "vue";

import { SLayout, SAvatar, SIcon } from "@/components";

import LayoutPageToolbarItem from "@/layouts/page/toolbar/item/Index.vue";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

import { useUserStore } from "@/store/modules/user";

const name = "LayoutPageToolbar";

export default defineComponent({
  name,
  components: { SLayout, SAvatar, LayoutPageToolbarItem, SIcon },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;

    const userStore = useUserStore();
    const userInfo = userStore.getUserInfo;

    return { cB, userInfo };
  },
});
</script>

<template>
  <SLayout :class="cB">
    <LayoutPageToolbarItem>
      <SAvatar>{{ userInfo.realName }}</SAvatar>
    </LayoutPageToolbarItem>
    <LayoutPageToolbarItem>
      <SIcon name="ArrowClockwise24Regular" />
    </LayoutPageToolbarItem>
  </SLayout>
</template>
