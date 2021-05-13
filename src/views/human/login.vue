<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-locale`">
      <LocalePicker />
    </div>
    <div :class="`${prefixCls}-content`">
      <Nameplate />
      <div :class="`${prefixCls}-form`">
        <Form />
      </div>
    </div>
    <CommonFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Form from "./form.vue";
import { useStyles } from "/@/hooks/useStyles";

export default defineComponent({
  name: "HumanLogin",
  components: {
    Form,
  },
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
    padding: 0 @padding-lg;
    margin: auto;
  }

  &-form {
    min-width: 420px;
    margin-top: @margin-lg * 2;

    @media (max-width: @screen-md) {
      min-width: 300px;
    }

    @media (max-width: @screen-sm) {
      min-width: 240px;
    }
  }
}
</style>
