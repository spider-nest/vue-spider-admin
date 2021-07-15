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

import { commonLight } from "@/styles/common";

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
    const {
      // themeOverrides
      primaryColor,
      primaryColorHover,
      primaryColorPressed,
      primaryColorSuppl,
      scrollbarColor,
      scrollbarColorHover,
      // app
      fontSize,
      textColor1,
    } = commonLight;

    const themeOverrides = {
      common: {
        primaryColor,
        primaryColorHover,
        primaryColorPressed,
        primaryColorSuppl,
        scrollbarColor,
        scrollbarColorHover,
      },
    };

    return {
      zhCN,
      dateZhCN,
      themeOverrides,
      fontSize,
      textColor1,
    };
  },
});
</script>

<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides"
  >
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
