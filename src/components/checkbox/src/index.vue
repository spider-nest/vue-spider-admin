<template>
  <ACheckbox v-bind="binds">
    <slot />
  </ACheckbox>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Checkbox as ACheckbox } from "ant-design-vue";

import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SCheckbox",
  components: { ACheckbox },
  inheritAttrs: false,
  props: {
    autofocus: PropTypes.bool.def(false),
    checked: PropTypes.bool.def(false),
    disabled: PropTypes.bool.def(false),
    indeterminate: PropTypes.bool.def(false),
  },
  setup(props, { attrs }) {
    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    return { binds };
  },
});
</script>
