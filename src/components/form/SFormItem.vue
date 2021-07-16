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
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <slot />
  </NFormItem>
</template>
