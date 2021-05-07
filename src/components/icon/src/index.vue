<template>
  <SvgIcon v-if="isSvg" :name="svgIcon" :size="fontSize" :spin="spin" />
  <span
    v-else
    ref="elRef"
    :class="[prefixCls, 'anticon', spin && `${prefixCls}-spin`]"
    :style="styles"
  />
</template>

<script lang="ts">
import type { CSSProperties } from "vue";

import {
  defineComponent,
  ref,
  watch,
  onMounted,
  nextTick,
  unref,
  computed,
} from "vue";
import Iconify from "@purge-icons/generated";

import SvgIcon from "./svg.vue";
import PropTypes from "/@/utils/vue-types";
import { useStyles } from "/@/hooks/useStyles";

export default defineComponent({
  name: "SIcon",
  components: { SvgIcon },
  inheritAttrs: false,
  props: {
    prefix: PropTypes.string.def(""),
    icon: PropTypes.string,
    fontSize: PropTypes.number.def(16),
    color: PropTypes.string,
    spin: PropTypes.looseBool.def(false),
  },
  setup(props) {
    const className = "iconify";
    const { prefixCls } = useStyles(className);

    const SVG_END_FLAG = "|svg";
    const isSvg = computed(() => props.icon?.endsWith(SVG_END_FLAG));
    const svgIcon = computed(() => props.icon.replace(SVG_END_FLAG, ""));

    const elRef = ref<ElRef>(null);
    const getIconRef = computed(
      () => `${props.prefix ? `${props.prefix}:` : ""}${props.icon}`
    );

    const update = async () => {
      if (unref(isSvg)) return;

      const el = unref(elRef);
      if (!el) return;

      await nextTick();
      const icon = unref(getIconRef);
      if (!icon) return;

      const svg = Iconify.renderSVG(icon, {});
      if (svg) {
        el.textContent = "";
        el.appendChild(svg);
      } else {
        const span = document.createElement("span");
        span.className = className;
        span.dataset.icon = icon;
        el.textContent = "";
        el.appendChild(span);
      }
    };

    const styles = computed(
      (): CSSProperties => {
        const { fontSize, color } = props;
        return {
          display: "inline-flex",
          fontSize: `${fontSize}px`,
          color,
        };
      }
    );

    watch(() => props.icon, update, { flush: "post" });

    onMounted(update);

    return { prefixCls, elRef, isSvg, svgIcon, styles };
  },
});
</script>

<style lang="less">
@spider-iconify-prefix-cls: ~"@{spider-prefix}-iconify";

.@{spider-iconify-prefix-cls} {
  &-spin {
    svg {
      animation: loadingCircle 1s infinite linear;
    }
  }
}
</style>
