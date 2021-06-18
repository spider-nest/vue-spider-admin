<template>
  <SLayout :class="prefixCls">
    //todo DrawerSetting LayoutHeader
    <SLayout :class="[classes]">
      //todo LayoutSidebar
      <SLayout :class="`${prefixCls}-main`">
        //todo LayoutMultipleHeader LayoutContent LayoutFooter
      </SLayout>
    </SLayout>
  </SLayout>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from "vue";

import { SLayout } from "/@/components/layout";
import { useMenuSetting } from "/@/hooks/useMenuSetting";
import { useStyles } from "/@/hooks/useStyles";

export default defineComponent({
  name: "BasicLayout",
  components: { SLayout },
  setup() {
    const { prefixCls } = useStyles("layout");

    const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();

    const classes = computed(() => {
      const className = ["ant-layout"];
      if (unref(getIsMixSidebar) || unref(getShowMenu)) {
        className.push("ant-layout-has-sider");
      }
      return className;
    });

    return { prefixCls, classes, getShowSidebar };
  },
});
</script>

<style lang="less">
@spider-layout-prefix-cls: ~"@{spider-prefix}-layout";

.@{spider-layout-prefix-cls} {
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: @component-background;
  flex-direction: column;

  & > .ant-layout {
    min-height: 100%;
  }

  &-main {
    width: 100%;
  }
}
</style>
