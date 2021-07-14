<script lang="ts">
import { defineComponent } from "vue";
import { changeColor } from "seemly";
import { NAvatar } from "naive-ui";

import { commonLight } from "@/styles/common";

export default defineComponent({
  name: "SAvatar",
  components: { NAvatar },
  inheritAttrs: false,
  setup() {
    const { primaryColor } = commonLight;

    return {
      style: {
        color: primaryColor,
        backgroundColor: changeColor(primaryColor, { alpha: 0.1 }),
      },
    };
  },
});
</script>

<template>
  <NAvatar v-bind="$attrs" :style="style">
    <slot />
  </NAvatar>
</template>
