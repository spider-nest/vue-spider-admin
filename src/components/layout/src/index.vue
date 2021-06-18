<template>
  <ALayout v-bind="$attrs" :hasSider="hasSidebar">
    <slot />
  </ALayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Layout as ALayout } from "ant-design-vue";

import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SLayout",
  components: { ALayout },
  inheritAttrs: false,
  props: {
    hasSidebar: PropTypes.looseBool,
  },
});
</script>
