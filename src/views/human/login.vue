<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-locale`">
      <LocalePicker />
    </div>
    <div :class="`${prefixCls}-content`"></div>
    <CommonFooter />
  </div>
  <SButton type="default">默认</SButton>
  <SButton type="primary">主要</SButton>
  <SButton type="success">成功</SButton>
  <SButton type="warning">警告</SButton>
  <SButton type="danger">危险</SButton>
  <SButton type="dashed">dashed</SButton>
  <SButton type="link">link</SButton>
  <SButton type="link" link-type="default">link default</SButton>
  <SButton type="link" link-type="success">link success</SButton>
  <SButton type="link" link-type="warning">link warning</SButton>
  <SButton type="link" link-type="danger">link danger</SButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CommonFooter from "/@/components/common-footer";
import SButton from "/@/components/button";
import LocalePicker from "/@/components/locale-picker";
import { useStyles } from "/@/hooks/useStyles";

export default defineComponent({
  name: "HumanLogin",
  components: { CommonFooter, SButton, LocalePicker },
  setup() {
    const { prefixCls } = useStyles("human-login");

    return { prefixCls };
  },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{spider-prefix}-human-login";

.@{prefix-cls} {
  display: flex;
  flex-direction: column;
  height: 100%;

  &-locale {
    width: 100%;
    height: 40px;
    line-height: 44px;
    text-align: right;
  }

  &-content {
    flex: 1;
    padding: 32px 0;
  }
}
@media (min-width: @screen-md-min) {
  .@{prefix-cls} {
    &-content {
      padding: 32px 0 24px;
    }
  }
}
</style>
