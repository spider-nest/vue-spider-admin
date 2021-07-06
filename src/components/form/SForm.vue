<script lang="ts">
import { defineComponent, ref } from "vue";
import { NForm } from "naive-ui";

import useForm from "@/hooks/web/useForm";

export default defineComponent({
  name: "SForm",
  components: { NForm },
  inheritAttrs: false,
  props: {
    labelPlacement: {
      type: String,
      default: "left",
    },
  },
  setup() {
    const formRef = ref();

    const { validate, restoreValidation } = useForm(formRef);

    return { formRef, validate, restoreValidation };
  },
});
</script>

<template>
  <NForm ref="formRef" v-bind="$attrs" :label-placement="labelPlacement">
    <slot />
  </NForm>
</template>
