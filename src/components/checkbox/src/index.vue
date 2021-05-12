<template>
  <ACheckbox>
    <slot />
  </ACheckbox>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Checkbox as ACheckbox } from "ant-design-vue";

export default defineComponent({
  name: "SCheckbox",
  components: { ACheckbox },
  inheritAttrs: false,
  setup() {
    //todo
  },
});
</script>
