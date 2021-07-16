<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import { SCard, SForm, SFormItem, SInput, SIcon } from "@/components";
import LayoutPageContent from "@/layouts/page/content/Index.vue";
import LayoutPageToolbarItem from "@/layouts/page/toolbar/item/Index.vue";

export default defineComponent({
  name: "SystemAccount",
  components: {
    SCard,
    SForm,
    SFormItem,
    SInput,
    SIcon,
    LayoutPageContent,
    LayoutPageToolbarItem,
  },
  inheritAttrs: false,
  setup() {
    const formModel = reactive({
      id: "",
      realName: "",
    });

    const submitting = ref(false);
    const onSubmit = () => {
      submitting.value = true;
      setTimeout(() => {
        submitting.value = false;
      }, 300);
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
      <LayoutPageToolbarItem
        :loading="submitting"
        tooltip="查询"
        @click.stop.prevent="onSubmit"
      >
        <SIcon name="Search24Regular" />
      </LayoutPageToolbarItem>
    </template>
    <SCard>
      <SForm mode="list" :model="formModel" @keyup.enter="onSubmit">
        <SFormItem label="账号ID">
          <SInput v-model:value.trim="formModel.id" />
        </SFormItem>
        <SFormItem label="账号姓名">
          <SInput v-model:value.trim="formModel.realName" />
        </SFormItem>
      </SForm>
    </SCard>
  </LayoutPageContent>
</template>
