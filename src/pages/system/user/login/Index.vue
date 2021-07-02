<script lang="ts">
import { defineComponent } from "vue";
import { NLayout, NButton } from "naive-ui";

import useAppConfig from "@/hooks/config/useAppConfig";
import useThemeStyle from "@/hooks/web/useThemeStyle";

import { elementPrefix } from "@/utils/cssr";

import style from "./style.cssr";

const name = "Login";

export default defineComponent({
  name,
  components: { NLayout, NButton },
  setup() {
    const { styleNamespace } = useAppConfig();

    useThemeStyle(name, style);

    const cB = `${styleNamespace}-${name.toLowerCase()}`;
    const cE = `${cB}${elementPrefix}`;

    return { cB, cE };
  },
});
</script>

<template>
  <NLayout position="absolute">
    <div :class="cB">
      <div :class="`${cE}container`">
        <NButton>登入</NButton>
        <NButton type="primary">登入</NButton>
      </div>
    </div>
  </NLayout>
</template>
