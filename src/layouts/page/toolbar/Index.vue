<script lang="ts">
import { defineComponent } from "vue";

import { SLayout, SAvatar, SIcon, STooltip } from "@/components";
import LayoutPageToolbarItem from "@/layouts/page/toolbar/item/Index.vue";

import useThemeStyle from "@/hooks/web/useThemeStyle";
import useAppConfig from "@/hooks/config/useAppConfig";
import { useRedo } from "@/hooks/web/usePage";

import { useUserStore } from "@/store/modules/user";

import style, { selector } from "./style.cssr";

const name = "LayoutPageToolbar";

export default defineComponent({
  name,
  components: { SLayout, SAvatar, LayoutPageToolbarItem, SIcon, STooltip },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;

    const userStore = useUserStore();
    const userInfo = userStore.getUserInfo;

    const redo = useRedo();

    return { cB, userInfo, redo };
  },
});
</script>

<template>
  <SLayout :class="cB">
    <LayoutPageToolbarItem size="default">
      <SAvatar>{{ userInfo.realName }}</SAvatar>
    </LayoutPageToolbarItem>
    <STooltip placement="left">
      <template #trigger>
        <LayoutPageToolbarItem @click.stop.prevent="redo">
          <SIcon name="ArrowClockwise24Regular" />
        </LayoutPageToolbarItem>
      </template>
      刷新页面
    </STooltip>
  </SLayout>
</template>
