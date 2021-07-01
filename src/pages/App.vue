<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useMessage, useLoadingBar } from "naive-ui";

import { messageRef } from "@/router/guard/messageGuard";
import { loadingBarRef } from "@/router/guard/loadingBarGuard";

export default defineComponent({
  name: "Spider",
  setup() {
    const message = useMessage();
    const loadingBar = useLoadingBar();

    onMounted(() => {
      messageRef.value = message;
      loadingBarRef.value = loadingBar;
    });

    return {};
  },
});
</script>

<template>
  <RouterView />
</template>
