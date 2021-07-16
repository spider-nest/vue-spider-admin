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
    <template v-if="$slots.cover" #cover>
      <slot name="cover" />
    </template>
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots['header-extra']" #header-extra>
      <slot name="header-extra" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action" />
    </template>
    <slot />
  </NCard>
</template>
