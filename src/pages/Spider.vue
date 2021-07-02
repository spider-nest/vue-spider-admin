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

import appConfig from "@/configs/appConfig";

import {
  createHoverColor,
  createPressedColor,
  createSupplColor,
} from "@/utils/color";

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
    const { themeColor } = appConfig;

    const themeOverrides = {
      common: {
        primaryColor: themeColor,
        primaryColorHover: createHoverColor(themeColor),
        primaryColorPressed: createPressedColor(themeColor),
        primaryColorSuppl: createSupplColor(themeColor),
      },
    };

    return {
      zhCN,
      dateZhCN,
      themeOverrides,
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
