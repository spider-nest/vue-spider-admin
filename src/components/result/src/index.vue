<template>
  <AResult v-bind="binds">
    <template #title>
      <slot name="title" />
    </template>
    <template #subTitle>
      <slot name="subTitle" />
    </template>
    <template #icon>
      <slot name="icon" />
    </template>
    <template #extra>
      <slot name="extra" />
    </template>
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </AResult>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Result as AResult } from "ant-design-vue";

import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SResult",
  components: { AResult },
  inheritAttrs: false,
  props: {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.VNodeChild]),
    subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.VNodeChild]),
    status: PropTypes.oneOf([
      "info",
      "success",
      "warning",
      "error",
      "403",
      "404",
      "500",
    ]).def("info"),
  },
  setup(props, { attrs }) {
    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    return { binds };
  },
});
</script>
