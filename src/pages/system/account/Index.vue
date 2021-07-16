<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import { SCard, SForm, SFormItem, SInput } from "@/components";
import LayoutPageContent from "@/layouts/page/content/Index.vue";
import LayoutPageToolbarItem from "@/layouts/page/toolbar/item/Index.vue";

export default defineComponent({
  name: "SystemAccount",
  components: {
    SCard,
    SForm,
    SFormItem,
    SInput,
    LayoutPageContent,
    LayoutPageToolbarItem,
  },
  inheritAttrs: false,
  setup() {
    const formModel = reactive({
      id: "",
      name: "",
    });

    const submitting = ref(false);
    const onSubmit = () => {
      submitting.value = true;
    };

    return {
      formModel,
      submitting,
      onSubmit,
    };
  },
});
</script>

<template>
  <LayoutPageContent>
    <template #toolbar>
      <LayoutPageToolbarItem>SystemAccount container</LayoutPageToolbarItem>
    </template>
    <SCard>
      <SForm :model="formModel" @keyup.enter="onSubmit">
        <SFormItem>
          <SInput v-model:value.trim="formModel.id" />
        </SFormItem>
        <SFormItem>
          <SInput v-model:value.trim="formModel.name" />
        </SFormItem>
      </SForm>
    </SCard>
  </LayoutPageContent>
</template>
