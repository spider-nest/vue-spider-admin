<template>
  <SIcon v-if="option.icon" :icon="option.icon" />
  <span>{{ option.title }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { SIcon } from "/@/components/icon";
import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  components: { SIcon },
  inheritAttrs: false,
  props: {
    option: PropTypes.object,
  },
});
</script>
