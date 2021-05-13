<template>
  <ARow v-bind="binds">
    <slot />
  </ARow>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Row as ARow } from "ant-design-vue";

import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SRow",
  components: { ARow },
  inheritAttrs: false,
  props: {
    align: PropTypes.oneOf(["top", "middle", "bottom", "stretch"]).def(
      "middle"
    ),
    gutter: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]).def(0),
    justify: PropTypes.oneOf([
      "start",
      "end",
      "center",
      "space-around",
      "space-between",
    ]).def("start"),
    type: PropTypes.oneOf(["flex"]).def("flex"),
  },
  setup(props, { attrs }) {
    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    return { binds };
  },
});
</script>
