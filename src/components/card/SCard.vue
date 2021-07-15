<script lang="ts">
import { defineComponent } from "vue";
import { NCard } from "naive-ui";

export default defineComponent({
  name: "SCard",
  components: { NCard },
  inheritAttrs: false,
});
</script>

<template>
  <NCard v-bind="$attrs">
    <template #cover>
      <slot name="cover" />
    </template>
    <template #header>
      <slot name="header" />
    </template>
    <template #header-extra>
      <slot name="header-extra" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action" />
    </template>
    <slot />
  </NCard>
</template>
