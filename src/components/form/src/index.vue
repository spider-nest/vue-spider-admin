<template>
  <AForm v-bind="binds">
    <slot />
  </AForm>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { Options as scrollToFirstErrorOptions } from "scroll-into-view-if-needed";

import type { VueNode } from "/#/type";
import type { ColProps } from "/@/components/col/types";

import { computed, defineComponent } from "vue";
import { Form as AForm } from "ant-design-vue";

import PropTypes from "/@/utils/vue-types";

type ValidationRule = {
  message?: VueNode;
  type?: string;
  required?: boolean;
  whitespace?: boolean;
  len?: number;
  min?: number;
  max?: number;
  enum?: string | string[];
  pattern?: RegExp;
  transform?: (value: any) => any;
  validator?: (
    rule: any,
    value: any,
    callback: any,
    source?: any,
    options?: any
  ) => any;
  trigger?: string;
};

export default defineComponent({
  name: "SForm",
  components: { AForm },
  inheritAttrs: false,
  props: {
    model: PropTypes.object,
    rules: {
      type: Object as PropType<{
        [k: string]: ValidationRule[] | ValidationRule;
      }>,
    },
    hideRequiredMark: PropTypes.bool.def(false),
    labelAlign: PropTypes.oneOf(["left", "right"]).def("right"),
    layout: PropTypes.oneOf(["horizontal", "inline", "vertical"]).def(
      "vertical"
    ),
    labelCol: { type: Object as PropType<ColProps> },
    wrapperCol: { type: Object as PropType<ColProps> },
    colon: PropTypes.bool.def(true),
    validateOnRuleChange: PropTypes.bool.def(true),
    scrollToFirstError: {
      type: [Boolean, Object] as PropType<boolean | scrollToFirstErrorOptions>,
      default: true,
    },
    name: PropTypes.string,
    validateTrigger: {
      type: [String, Array] as PropType<string | string[]>,
      default: "change",
    },
  },
  setup(props, { attrs }) {
    const binds = computed(() => {
      return { ...attrs, ...props };
    });

    return { binds };
  },
});
</script>
