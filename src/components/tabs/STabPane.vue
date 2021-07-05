<!-- NTabPane 不支持二次封装 -->
<script lang="ts">
import { defineComponent } from "vue";
import { NTabPane } from "naive-ui";

export default defineComponent({
  name: "STabPane",
  components: { NTabPane },
  inheritAttrs: false,
});
</script>

<template>
  <NTabPane v-bind="$attrs">
    <slot />
  </NTabPane>
</template>
