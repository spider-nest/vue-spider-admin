<script lang="ts">
import { defineComponent, ref, unref } from "vue";
import { NForm } from "naive-ui";

import useForm from "@/hooks/web/useForm";

/**
 * list：常用于列表页
 */
type Mode = "list";

export default defineComponent({
  name: "SForm",
  components: { NForm },
  inheritAttrs: false,
  props: {
    // naive-ui
    inline: {
      type: Boolean,
      default: false,
    },
    labelPlacement: {
      type: String as PropType<NaiveFormLabelPlacement>,
      default: "left",
    },
    showFeedback: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "medium",
    },

    // local
    mode: {
      type: String as PropType<Mode>,
      default: undefined,
    },
  },
  setup(props) {
    const formRef = ref();

    const { validate, restoreValidation } = useForm(formRef);

    let sInline = unref(props.inline);
    let sShowFeedback = unref(props.showFeedback);
    let sSize = unref(props.size);
    if (props.mode === "list") {
      sInline = true;
      sShowFeedback = false;
      sSize = "small";
    }

    return {
      formRef,
      validate,
      restoreValidation,
      sInline,
      sShowFeedback,
      sSize,
    };
  },
});
</script>

<template>
  <NForm
    ref="formRef"
    v-bind="$attrs"
    :inline="sInline"
    :label-placement="labelPlacement"
    :show-feedback="sShowFeedback"
    :size="sSize"
  >
    <slot />
  </NForm>
</template>
