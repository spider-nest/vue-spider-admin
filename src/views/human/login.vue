<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-locale`">
      <LocalePicker />
    </div>
    <div :class="`${prefixCls}-content`"></div>
    <CommonFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LocalePicker from "/@/components/locale-picker";
import CommonFooter from "/@/components/common-footer";
import { useStyles } from "/@/hooks/useStyles";

export default defineComponent({
  name: "HumanLogin",
  components: { LocalePicker, CommonFooter },
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
  padding: @padding-lg;
  overflow: hidden;
  flex-direction: column;

  &-locale {
    width: 100%;
    text-align: right;
  }

  &-content {
    padding: 32px 0;
    flex: 1;
  }
}
@media (min-width: @screen-md-min) {
  .@{spider-human-login-prefix-cls} {
    &-content {
      padding: 32px 0 24px;
    }
  }
}
</style>
