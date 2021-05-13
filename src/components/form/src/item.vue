<template>
  <AFormItem v-bind="binds">
    <template #extra>
      <slot name="extra" />
    </template>
    <template #help>
      <slot name="help" />
    </template>
    <template #label>
      <slot name="label" />
    </template>
    <slot />
  </AFormItem>
</template>

<script lang="ts">
import type { PropType } from "vue";

import type { ColProps } from "/@/components/col/types";

import { computed, defineComponent } from "vue";
import { Form as AForm } from "ant-design-vue";

import PropTypes from "/@/utils/vue-types";

export default defineComponent({
  name: "SFormItem",
  components: { AFormItem: AForm.Item },
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Number, Array] as PropType<
        string | number | string[] | number[]
      >,
    },
    rules: PropTypes.oneOfType([Array, Object]),
    autoLink: PropTypes.bool.def(true),
    colon: PropTypes.bool.def(true),
    extra: PropTypes.VNodeChild,
    hasFeedback: PropTypes.bool.def(false),
    help: PropTypes.VNodeChild,
    htmlFor: PropTypes.string,
    label: PropTypes.VNodeChild,
    labelCol: { type: Object as PropType<ColProps> },
    labelAlign: PropTypes.oneOf(["left", "right"]).def("right"),
    required: PropTypes.bool.def(false),
    validateStatus: PropTypes.oneOf([
      "",
      "success",
      "warning",
      "error",
      "validating",
    ]),
    wrapperCol: { type: Object as PropType<ColProps> },
    validateFirst: PropTypes.bool.def(false),
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
