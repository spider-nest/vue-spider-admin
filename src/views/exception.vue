<template>
  <SResult
    :class="prefixCls"
    :status="getStatus.status"
    :title="getStatus.title"
    :subTitle="getStatus.subTitle"
  >
    <template #icon>
      <img :src="getStatus.icon" alt="" />
    </template>
    <template #extra>
      <SButton type="primary" @click="getStatus.handler">
        {{ getStatus.btnText }}
      </SButton>
    </template>
  </SResult>
</template>

<script lang="ts">
import type { PropType } from "vue";

import { computed, defineComponent, ref, unref } from "vue";
import { useRoute } from "vue-router";

import SResult from "/@/components/result";
import SButton from "/@/components/button";
import { useStyles } from "/@/hooks/useStyles";
import { useGo } from "/@/hooks/usePage";
import { ExceptionEnum } from "/@/enums/exception";
import { PageEnum } from "/@/enums/page";

interface StatusMapValue {
  status?: string;
  title: string;
  subTitle: string;
  btnText?: string;
  icon?: string;
  handler?: Fn;
}

export default defineComponent({
  name: "Exception",
  components: { SResult, SButton },
  props: {
    status: {
      type: Number as PropType<number>,
      default: ExceptionEnum.PAGE_NOT_FOUND,
    },
    title: {
      type: String as PropType<string>,
      default: "",
    },
    subTitle: {
      type: String as PropType<string>,
      default: "",
    },
    logout: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const { prefixCls } = useStyles("exception");

    const statusMap = ref(new Map<string | number, StatusMapValue>());
    const { query } = useRoute();
    const getStatusCode = computed(() => {
      const { statusCode } = query;
      return Number(statusCode) || props.status;
    });
    const getStatus = computed((): StatusMapValue => {
      return unref(statusMap).get(unref(getStatusCode)) as StatusMapValue;
    });

    const btnText = props.logout ? "重新登入" : "返回主页";
    const go = useGo();
    const handler = () => (props.logout ? go(PageEnum.BASE_LOGIN_PATH) : go());
    Object.keys(ExceptionEnum).map((key) => {
      unref(statusMap).set(key, {
        status: String(key),
        title: String(key),
        subTitle: String(key),
        btnText,
        handler,
      });
    });

    return { prefixCls, getStatus };
  },
});
</script>

<style lang="less">
@spider-exception-prefix-cls: ~"@{spider-prefix}-exception";

.@{spider-exception-prefix-cls} {
  .ant-result-icon {
    & > img {
      max-width: 400px;
      max-height: 300px;
    }
  }
}
</style>
