<template>
  <AInputPassword
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
  </AInputPassword>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Input as AInput } from "ant-design-vue";

import { useI18n } from "/@/hooks/useLocale";
import PropTypes from "/@/utils/vue-types";
import inputProps from "./props";

export default defineComponent({
  name: "SInputPassword",
  components: { AInputPassword: AInput.Password },
  inheritAttrs: false,
  props: { ...inputProps, visibilityToggle: PropTypes.bool.def(true) },
  setup(props, { attrs }) {
    const { t } = useI18n();

    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    return { t, binds };
  },
});
</script>
