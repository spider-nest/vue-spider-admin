<script lang="ts">
import { defineComponent, reactive, ref, onMounted, toRaw } from "vue";

import { LayoutPageContent, LayoutPageToolbarItem } from "@/layouts";
import { SCard, SForm, SFormItem, SInput, SIcon, SSpace } from "@/components";

import { requestUserList } from "@/services/modules/system/user";

export default defineComponent({
  name: "SystemUser",
  components: {
    LayoutPageContent,
    LayoutPageToolbarItem,
    SCard,
    SForm,
    SFormItem,
    SInput,
    SIcon,
    SSpace,
  },
  inheritAttrs: false,
  setup() {
    const formModel = reactive({
      page: 1,
      pageSize: 15,
      pageSizes: [15, 25, 50, 100],
      id: "",
      realName: "",
    });

    const submitting = ref(false);
    const onSubmit = async () => {
      submitting.value = true;

      const listResult = await requestUserList(toRaw(formModel));
      console.log(listResult);

      submitting.value = false;
    };

    onMounted(() => {
      onSubmit();
    });

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
        <SIcon name="Cursor24Regular" />
      </LayoutPageToolbarItem>
    </template>
    <SSpace :vertical="true">
      <SCard>
        <SForm mode="list" :model="formModel" @keyup.enter="onSubmit">
          <SFormItem label="用户ID">
            <SInput v-model:value.trim="formModel.id" />
          </SFormItem>
          <SFormItem label="用户姓名">
            <SInput v-model:value.trim="formModel.realName" />
          </SFormItem>
        </SForm>
      </SCard>
      <SCard> table </SCard>
    </SSpace>
  </LayoutPageContent>
</template>
