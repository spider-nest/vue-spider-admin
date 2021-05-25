<template>
  <div :class="prefixCls">
    <ACopyrightOutlined
      :title="`${t('overall.lastBuildTime')}: ${lastBuildTime}`"
    />
    &nbsp;2021&nbsp;{{ copyright }}&nbsp;
    <a
      v-if="homepage"
      :class="`${prefixCls}-github`"
      :href="homepage"
      target="_blank"
      title="github"
    >
      <AGithubOutlined />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useStyles } from "/@/hooks/useStyles";
import { useSetting } from "/@/hooks/useSetting";
import { useI18n } from "/@/hooks/useLocale";

export default defineComponent({
  name: "CommonFooter",
  inheritAttrs: false,
  setup() {
    const { t } = useI18n();
    const { prefixCls } = useStyles("footer");
    const { pkg, lastBuildTime } = __APP_INFO__;
    const { title } = useSetting();

    return {
      t,
      prefixCls,
      lastBuildTime,
      copyright: title,
      homepage: pkg.homepage,
    };
  },
});
</script>

<style lang="less">
@spider-footer-prefix-cls: ~"@{spider-prefix}-footer";

.@{spider-footer-prefix-cls} {
  padding: @padding-lg;
  color: @text-color-secondary;
  text-align: center;

  &-github {
    color: inherit;
  }
}
</style>
