<template>
  <AInput
    v-bind="binds"
    :placeholder="placeholder in binds ? binds.placeholder : t('overall.input')"
  >
    <template #addonAfter>
      <slot name="addonAfter" />
    </template>
    <template #addonBefore>
      <slot name="addonBefore" />
    </template>
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #suffix>
      <slot name="suffix" />
    </template>
  </AInput>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Input as AInput } from "ant-design-vue";

import { useI18n } from "/@/hooks/useLocale";
import inputProps from "./props";

export default defineComponent({
  name: "SInput",
  components: { AInput },
  inheritAttrs: false,
  props: { ...inputProps },
  setup(props, { attrs }) {
    const { t } = useI18n();

    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    return { t, binds };
  },
});
</script>
