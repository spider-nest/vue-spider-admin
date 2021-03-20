<script lang="tsx">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { ConfigProvider } from "@/components";

export default defineComponent({
  name: "Spider",
  setup() {
    return () => {
      return (
        <ConfigProvider>
          <RouterView />
        </ConfigProvider>
      );
    };
  },
});
</script>

<style lang="less">
@import "~@/styles/index.module.less";
</style>
