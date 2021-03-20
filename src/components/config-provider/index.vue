<script lang="tsx">
import { defineComponent, computed } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { i18n } from "@/locales";

export default defineComponent({
  name: "ConfigProvider",
  inheritAttrs: false,
  setup(_, { slots }) {
    const locale: any = computed(() => {
      return i18n.global.getLocaleMessage("zh_CN")?.antDesignLocale;
    });

    return () => {
      return (
        <ConfigProvider locale={locale}>{slots.default?.()}</ConfigProvider>
      );
    };
  },
});
</script>
