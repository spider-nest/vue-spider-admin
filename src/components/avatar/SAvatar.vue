<script lang="ts">
import { defineComponent } from "vue";
import { NAvatar } from "naive-ui";

export default defineComponent({
  name: "SAvatar",
  components: { NAvatar },
  inheritAttrs: false,
});
</script>

<template>
  <NAvatar v-bind="$attrs">
    <slot />
  </NAvatar>
</template>
