<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-locale`">
      <LocalePicker />
    </div>
    <div :class="`${prefixCls}-content`">
      <Nameplate />
    </div>
    <CommonFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LocalePicker from "/@/components/locale-picker";
import Nameplate from "/@/components/nameplate";
import CommonFooter from "/@/components/common-footer";
import { useStyles } from "/@/hooks/useStyles";

export default defineComponent({
  name: "HumanLogin",
  components: { LocalePicker, Nameplate, CommonFooter },
  setup() {
    const { prefixCls } = useStyles("human-login");

    return { prefixCls };
  },
});
</script>

<style lang="less">
@spider-human-login-prefix-cls: ~"@{spider-prefix}-human-login";

.@{spider-human-login-prefix-cls} {
  display: flex;
  height: 100%;
  flex-direction: column;

  &-locale {
    width: 100%;
    padding: @padding-lg;
    text-align: right;
  }

  &-content {
    margin: auto;
  }
}
</style>
