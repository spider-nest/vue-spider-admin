<template>
  <SForm @keypress.enter="onSubmit">
    <SFormItem v-bind="validateInfos.account">
      <SInput v-model:value.trim="formModel.account" :size="size">
        <template #prefix>
          <AUserOutlined />
        </template>
      </SInput>
    </SFormItem>
    <SFormItem v-bind="validateInfos.password">
      <SInputPassword v-model:value.trim="formModel.password" :size="size">
        <template #prefix>
          <ALockOutlined />
        </template>
      </SInputPassword>
    </SFormItem>
    <SFormItem>
      <SButton
        type="primary"
        :loading="loginLoading"
        :size="size"
        block
        @click="onSubmit"
      >
        {{ t("overall.login") }}
      </SButton>
    </SFormItem>
    <SRow :gutter="[16, 8]">
      <SCol :xs="24" :md="12">
        <SButton block @click="setState(FormStateEnum.PHONE_LOGIN)">
          {{ t("overall.phoneLogin") }}
        </SButton>
      </SCol>
      <SCol :xs="24" :md="12">
        <SButton block @click="setState(FormStateEnum.QR_CODE_LOGIN)">
          {{ t("overall.qrCodeLogin") }}
        </SButton>
      </SCol>
    </SRow>
  </SForm>
</template>

<script lang="ts">
import type { UnwrapRef } from "vue";

import { computed, defineComponent, reactive, ref } from "vue";
import { useForm } from "@ant-design-vue/use";
import { onKeyStroke, useDebounceFn } from "@vueuse/core";

import SRow from "/@/components/row";
import SCol from "/@/components/col";
import SButton from "/@/components/button";
import { SInput, SInputPassword } from "/@/components/input";
import { SForm, SFormItem } from "/@/components/form";
import { useI18n } from "/@/hooks/useLocale";
import { FormStateEnum, useState } from "./useForm";

interface FormModel {
  account: string;
  password: string;
}

export default defineComponent({
  name: "HumanLoginPasswordLogin",
  components: {
    SRow,
    SCol,
    SButton,
    SInput,
    SInputPassword,
    SForm,
    SFormItem,
  },
  inheritAttrs: false,
  setup() {
    const { setState } = useState();

    const formModel: UnwrapRef<FormModel> = reactive({
      account: "",
      password: "",
    });

    const { t } = useI18n();
    const formRules = reactive({
      account: [
        { required: true, message: computed(() => t("overall.input")) },
      ],
      password: [
        { required: true, message: computed(() => t("overall.input")) },
      ],
    });
    const { validate, validateInfos } = useForm(formModel, formRules);

    const loginLoading = ref<boolean>(false);
    const onSubmit = useDebounceFn(() => {
      loginLoading.value = true;
      validate()
        .then((formData) => {
          console.log(formData);
          //todo login
        })
        .catch((error: Error) => {
          console.error(error);
        })
        .finally(() => {
          loginLoading.value = false;
        });
    }, 150);

    onKeyStroke("Enter", onSubmit);

    return {
      t,
      formModel,
      validateInfos,
      onSubmit,
      size: "large",
      loginLoading,
      setState,
      FormStateEnum,
    };
  },
});
</script>
