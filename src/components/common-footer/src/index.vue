<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-copyright`">
      <CopyrightOutlined
        :title="`${t('system.lastBuildTime')}: ${lastBuildTime}`"
      />
      &nbsp;2021&nbsp;{{ copyright }}&nbsp;
      <a v-if="homepage" :href="homepage" target="_blank" title="github">
        <GithubOutlined />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { GithubOutlined, CopyrightOutlined } from "@ant-design/icons-vue";

import { useStyles } from "/@/hooks/useStyles";
import { useSetting } from "/@/hooks/useSetting";
import { useI18n } from "/@/hooks/useLocale";

export default defineComponent({
  name: "CommonFooter",
  components: { GithubOutlined, CopyrightOutlined },
  inheritAttrs: false,
  setup() {
    const { prefixCls } = useStyles("footer");
    const { pkg, lastBuildTime } = __APP_INFO__;
    const { title } = useSetting();
    const { t } = useI18n();

    return {
      t,
      prefixCls,
      lastBuildTime,
      copyright: title,
      homepage: pkg?.homepage,
    };
  },
});
</script>

<style lang="less">
@spider-footer-prefix-cls: ~"@{spider-prefix}-footer";

.@{spider-footer-prefix-cls} {
  padding: @padding-lg;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;

  &-copyright {
    margin-top: (@padding-lg / 2);
  }
}
</style>
