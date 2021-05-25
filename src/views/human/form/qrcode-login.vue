<template>
  <SRow :gutter="[16, 24]">
    <SCol :span="24">
      <Qrcode :value="qrCodeUrl" :width="240" />
    </SCol>
    <SCol :span="24">
      <SButton :size="size" block @click="resetState">
        {{ t("overall.back") }}
      </SButton>
    </SCol>
  </SRow>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SButton from "/@/components/button";
import Qrcode from "/@/components/qrcode";
import SRow from "/@/components/row";
import SCol from "/@/components/col";
import { useI18n } from "/@/hooks/useLocale";
import { useState } from "./useForm";

export default defineComponent({
  name: "HumanLoginQrcodeLogin",
  components: { SButton, Qrcode, SRow, SCol },
  inheritAttrs: false,
  setup() {
    const { t } = useI18n();

    const { resetState } = useState();

    const { pkg } = __APP_INFO__;

    return { t, resetState, size: "large", qrCodeUrl: pkg.homepage };
  },
});
</script>
