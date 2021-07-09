<script lang="ts">
import { defineComponent } from "vue";

import useAppConfig from "@/hooks/config/useAppConfig";
import useThemeStyle from "@/hooks/web/useThemeStyle";

import { elementPrefix } from "@/utils/cssr";

import style, { selector } from "./style.cssr";

const name = "LayoutDefaultFooter";

export default defineComponent({
  name,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;
    const cE = `${cB}${elementPrefix}`;

    const { homepage, issues, buildTime } = __APP_INFO__;
    const { appName } = __VITE_ENV__;

    return { cB, cE, homepage, issues, buildTime, appName };
  },
});
</script>

<template>
  <footer :class="cB">
    <div :class="`${cE}link`">
      <a href="javascript:;" target="_blank">Help</a>
      <a :href="homepage" target="_blank">GitHub</a>
      <a :href="issues" target="_blank">Issues</a>
    </div>
    <div :class="`${cE}copyright`" :title="buildTime">
      &copy;&nbsp;2021&nbsp;Power&nbsp;By&nbsp;{{ appName }}
    </div>
  </footer>
</template>
