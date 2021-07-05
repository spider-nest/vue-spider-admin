<script lang="ts">
import { defineComponent } from "vue";
import { NInput } from "naive-ui";

export default defineComponent({
  name: "SInput",
  components: { NInput },
  inheritAttrs: false,
  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
  },
});
</script>

<template>
  <NInput v-bind="$attrs" :clearable="clearable" :placeholder="placeholder">
    <template #prefix>
      <slot name="prefix" />
    </template>
  </NInput>
</template>
