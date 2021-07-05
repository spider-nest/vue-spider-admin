<script lang="ts">
import { defineComponent } from "vue";
import { NFormItem } from "naive-ui";

export default defineComponent({
  name: "SFormItem",
  components: { NFormItem },
  inheritAttrs: false,
});
</script>

<template>
  <NFormItem v-bind="$attrs">
    <slot />
  </NFormItem>
</template>
