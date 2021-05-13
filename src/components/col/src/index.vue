<template>
  <ACol v-bind="binds">
    <slot />
  </ACol>
</template>

<script lang="ts">
import type { ColProps } from "/@/components/col/types";

import { computed, defineComponent } from "vue";
import { Col as ACol } from "ant-design-vue";

import PropTypes from "/@/utils/vue-types";

const PropTypes1 = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const PropTypes2 = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.shape({
    offset: PropTypes1,
    order: PropTypes1,
    pull: PropTypes1,
    push: PropTypes1,
    span: PropTypes1,
  }).loose,
]);

export default defineComponent<ColProps>({
  name: "SCol",
  components: { ACol },
  inheritAttrs: false,
  props: {
    flex: PropTypes1,
    offset: PropTypes1.def(0),
    order: PropTypes1.def(0),
    pull: PropTypes1.def(0),
    push: PropTypes1.def(0),
    span: PropTypes1,
    xs: PropTypes2,
    sm: PropTypes2,
    md: PropTypes2,
    lg: PropTypes2,
    xl: PropTypes2,
    xxl: PropTypes2,
  },
  setup(props, { attrs }) {
    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    return { binds };
  },
});
</script>
