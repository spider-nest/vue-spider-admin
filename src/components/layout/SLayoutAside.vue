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
  },
});
</script>

<template>
  <NLayoutSider
    v-bind="$attrs"
    :bordered="bordered"
    :collapse-mode="collapseMode"
  >
    <slot />
  </NLayoutSider>
</template>
