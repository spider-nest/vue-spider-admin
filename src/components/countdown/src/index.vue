<template>
  <SButton
    v-bind="binds"
    :loading="loading"
    :disabled="isStart"
    @click="onStart"
  >
    {{ isStart ? sTotal : text ? text : t("overall.acquireCaptcha") }}
  </SButton>
</template>

<script lang="ts">
import type { PropType } from "vue";

import { computed, defineComponent, ref } from "vue";

import SButton from "/@/components/button";
import PropTypes from "/@/utils/vue-types";
import { useI18n } from "/@/hooks/useLocale";
import { useCountdown } from "/@/hooks/useCountdown";
import { isFunction } from "/@/utils/is";

export default defineComponent({
  name: "Countdown",
  components: { SButton },
  inheritAttrs: false,
  props: {
    value: PropTypes.any,
    total: PropTypes.number.def(60),
    preStartFn: PropTypes.func,
    text: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    const { t } = useI18n();

    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    const loading = ref<boolean>(false);
    const { sTotal, isStart, start } = useCountdown(props.total);
    async function onStart() {
      const { preStartFn } = props;
      if (preStartFn && isFunction(preStartFn)) {
        loading.value = true;
        try {
          const preStart = await preStartFn();
          //todo 处理异步
          console.log(preStart);
          preStart && start();
        } finally {
          loading.value = false;
        }
      } else {
        start();
      }
    }

    return { t, binds, loading, sTotal, isStart, onStart };
  },
});
</script>
