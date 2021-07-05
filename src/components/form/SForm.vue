<script lang="ts">
import { defineComponent } from "vue";
import { NForm } from "naive-ui";

export default defineComponent({
  name: "SForm",
  components: { NForm },
  inheritAttrs: false,
  props: {
    labelPlacement: {
      type: String,
      default: "left",
    },
  },
});
</script>

<template>
  <NForm v-bind="$attrs" :label-placement="labelPlacement">
    <slot />
  </NForm>
</template>
