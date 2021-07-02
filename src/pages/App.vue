<script lang="ts">
import { defineComponent } from "vue";
import { useMessage, useLoadingBar } from "naive-ui";

import { messageRef } from "@/router/guard/messageGuard";
import { loadingBarRef } from "@/router/guard/loadingBarGuard";

export default defineComponent({
  name: "Spider",
  setup() {
    messageRef.value = useMessage();

    loadingBarRef.value = useLoadingBar();

    return {};
  },
});
</script>

<template>
  <RouterView />
</template>
