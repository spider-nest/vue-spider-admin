<script lang="ts">
import { defineComponent } from "vue";
import {
  zhCN,
  dateZhCN,
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
} from "naive-ui";

import App from "@/pages/App.vue";

export default defineComponent({
  name: "Provider",
  components: {
    NConfigProvider,
    NLoadingBarProvider,
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    App,
  },
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
    <NLoadingBarProvider>
      <NMessageProvider>
        <NNotificationProvider>
          <NDialogProvider>
            <App />
          </NDialogProvider>
        </NNotificationProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
