<script lang="ts">
import { defineComponent } from "vue";

import { LayoutDefaultFooter } from "@/layouts";
import { SLayout } from "@/components";
import LoginForm from "./Form.vue";

import useAppConfig from "@/hooks/config/useAppConfig";
import useThemeStyle from "@/hooks/web/useThemeStyle";

import { elementPrefix } from "@/utils/cssr";

import LogoPng from "@/assets/logo.png";

import style, { selector } from "./style.cssr";

const name = "Login";

export default defineComponent({
  name,
  components: { SLayout, LayoutDefaultFooter, LoginForm },
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;
    const cE = `${cB}${elementPrefix}`;

    const { appName } = __VITE_ENV__;

    return { cB, cE, LogoPng, appName };
  },
});
</script>

<template>
  <SLayout position="absolute">
    <div :class="cB">
      <div :class="`${cE}container`">
        <div :class="`${cE}header`">
          <div :class="`${cE}title`">
            <img :class="`${cE}logo`" :src="LogoPng" alt="logo" />
            <span>{{ appName }}</span>
          </div>
          <div :class="`${cE}desc`">前天看到了小兔，昨天是小鹿，今天是你</div>
        </div>
        <div :class="`${cE}main`">
          <LoginForm />
        </div>
        <div :class="`${cE}footer`">
          <LayoutDefaultFooter />
        </div>
      </div>
    </div>
  </SLayout>
</template>
