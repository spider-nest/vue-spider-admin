<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useLoadingBar } from "naive-ui";

import { loadingBarRef } from "@/router/guard/loadingBarGuard";

export default defineComponent({
  name: "Spider",
  setup() {
    const loadingBar = useLoadingBar();

    onMounted(() => {
      loadingBarRef.value = loadingBar;
    });

    return {};
  },
});
</script>

<template>
  <RouterView />
</template>
