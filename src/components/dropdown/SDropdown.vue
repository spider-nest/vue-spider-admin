<script lang="ts">
import type { FollowerPlacement } from "vueuc";

import { defineComponent } from "vue";
import { NDropdown } from "naive-ui";

export default defineComponent({
  name: "SDropdown",
  components: { NDropdown },
  inheritAttrs: false,
  props: {
    placement: {
      type: String as PropType<FollowerPlacement>,
      default: "bottom-start",
    },
  },
});
</script>

<!-- 套一个 span 才可以使 NDropdown 获取到节点 2.15.4 -->
<template>
  <NDropdown v-bind="$attrs" :placement="placement">
    <span>
      <slot />
    </span>
  </NDropdown>
</template>
