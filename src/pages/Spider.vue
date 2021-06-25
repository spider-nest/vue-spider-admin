<script lang="ts">
import { defineComponent } from "vue";
import { NConfigProvider, zhCN, dateZhCN } from "naive-ui";

export default defineComponent({
  name: "Spider",
  components: { NConfigProvider },
  setup() {
    return {
      zhCN,
      dateZhCN,
    };
  },
});
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <RouterView />
  </NConfigProvider>
</template>
