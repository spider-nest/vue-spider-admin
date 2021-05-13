<template>
  <SIcon v-if="option.icon" :icon="option.icon" />
  <span>{{ option.title }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { SIcon } from "/@/components";
import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SDropdownMenuItemContent",
  components: { SIcon },
  inheritAttrs: false,
  props: {
    option: PropTypes.object,
  },
});
</script>
