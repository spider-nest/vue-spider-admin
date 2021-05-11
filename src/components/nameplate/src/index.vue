<template>
  <div :class="prefixCls">
    <a :href="homePath">
      <img :src="Logo" :class="`${prefixCls}-logo`" alt="logo" />
      <span v-show="showTitle" :class="`${prefixCls}-title`">{{ title }}</span>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { PageEnum } from "/@/enums/page";
import { useStyles } from "/@/hooks/useStyles";
import { useSetting } from "/@/hooks/useSetting";
import PropTypes from "/@/utils/vue-types";
import Logo from "/@/assets/logo.png";

export default defineComponent({
  name: "Nameplate",
  inheritAttrs: false,
  props: {
    showTitle: PropTypes.bool.def(true),
  },
  setup() {
    const { prefixCls } = useStyles("nameplate");

    const { title } = useSetting();

    return { prefixCls, title, Logo, homePath: PageEnum.BASE_HOME_PATH };
  },
});
</script>

<style lang="less">
@spider-nameplate-prefix-cls: ~"@{spider-prefix}-nameplate";

.@{spider-nameplate-prefix-cls} {
  height: 44px;
  line-height: 44px;
  text-align: center;

  &-logo {
    vertical-align: top;
  }

  &-title {
    margin-left: @margin-xs;
    font-size: 24px;
    font-weight: 600;
    color: @text-color;
    transition: all 0.5s;
    .truncate();
  }
}
</style>
