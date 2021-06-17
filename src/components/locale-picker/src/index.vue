<template>
  <SDropdown
    placement="bottomCenter"
    :options="localeList"
    :selectedKeys="selectedKeys"
    @clickMenu="onClickMenu"
  >
    <SIcon icon="ion:language" />
    <span v-if="showTitle">{{ title }}</span>
  </SDropdown>
</template>

<script lang="ts">
import type { LocaleType } from "/#/config";
import type { DropdownMenu } from "/@/components/dropdown/types";

import { defineComponent, ref, watchEffect, unref, computed } from "vue";

import SDropdown from "/@/components/dropdown";
import SIcon from "/@/components/icon";
import { localeList } from "/@/settings/locale";
import PropTypes from "/@/utils/vue-types";
import { useLocale } from "/@/hooks/useLocale";

export default defineComponent({
  name: "LocalePicker",
  components: { SDropdown, SIcon },
  inheritAttrs: false,
  props: {
    showTitle: PropTypes.bool.def(true),
  },
  setup() {
    const selectedKeys = ref<string[]>([]);
    const { changeLocale, getLocale } = useLocale();
    watchEffect(() => {
      selectedKeys.value = [unref(getLocale)];
    });

    const title = computed(() => {
      const key = selectedKeys.value[0];
      if (!key) return undefined;
      return localeList.find((locale) => locale.event === key)?.title;
    });

    const toggleLocale = (locale: LocaleType | string) => {
      changeLocale(locale as LocaleType);
      window.location.reload();
    };
    const onClickMenu = (menuItem: DropdownMenu) => {
      if (unref(getLocale) === menuItem.event) return;
      toggleLocale(menuItem.event as string);
    };

    return { localeList, selectedKeys, title, onClickMenu };
  },
});
</script>
