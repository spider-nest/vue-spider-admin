<template>
  <ConfigProvider :locale="locale">
    <slot />
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { ConfigProvider } from "ant-design-vue";

import { i18n } from "/@/locales";

export default defineComponent({
  name: "SConfigProvider",
  components: { ConfigProvider },
  inheritAttrs: false,
  setup() {
    const locale: any = computed(() => {
      return i18n.global.getLocaleMessage("zh_CN")?.antDesignLocale;
    });

    return { locale };
  },
});
</script>
