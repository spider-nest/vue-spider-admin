<script lang="ts">
import { defineComponent } from "vue";
import { NLayoutSider } from "naive-ui";

export default defineComponent({
  name: "SLayoutAside",
  components: { NLayoutSider },
  inheritAttrs: false,
});
</script>

<template>
  <NLayoutSider v-bind="$attrs">
    <slot />
  </NLayoutSider>
</template>
