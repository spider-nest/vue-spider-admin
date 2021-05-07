<template>
  <svg
    :class="[prefixCls, spin && `${prefixCls}-spin`]"
    :style="styles"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
import type { CSSProperties } from "vue";

import { defineComponent, computed } from "vue";

import { useStyles } from "/@/hooks/useStyles";
import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SvgIcon",
  inheritAttrs: false,
  props: {
    prefix: PropTypes.string.def("icon"),
    name: PropTypes.string.isRequired,
    pixel: PropTypes.number.def(16),
    spin: PropTypes.looseBool.def(false),
  },
  setup(props) {
    const { prefixCls } = useStyles("svg-icon");

    const symbolId = computed(() => `#${props.prefix}-${props.name}`);

    const styles = computed(
      (): CSSProperties => {
        const { pixel } = props;
        return {
          width: `${pixel}px`,
          height: `${pixel}px`,
        };
      }
    );

    return { prefixCls, symbolId, styles };
  },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{prefix-cls}-svg-icon";

.@{prefix-cls} {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;

  &-spin {
    animation: loadingCircle 1s infinite linear;
  }
}
</style>
