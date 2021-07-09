<script lang="ts">
import { defineComponent } from "vue";
import { NLayoutSider } from "naive-ui";

export default defineComponent({
  name: "SLayoutAside",
  components: { NLayoutSider },
  inheritAttrs: false,
  props: {
    bordered: {
      type: Boolean,
      default: true,
    },
    collapseMode: {
      type: String,
      default: "width",
    },
    collapsedWidth: {
      type: Number,
      default: 56,
    },
    width: {
      type: Number,
      default: 252,
    },
  },
});
</script>

<template>
  <NLayoutSider
    v-bind="$attrs"
    :bordered="bordered"
    :collapse-mode="collapseMode"
    :collapsed-width="collapsedWidth"
    :width="width"
  >
    <slot />
  </NLayoutSider>
</template>
