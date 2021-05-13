<template>
  <AForm layout="vertical">
    <AFormItem v-bind="validateInfos.account">
      <SInput
        v-model:value="formModel.account"
        :size="size"
        :placeholder="t('overall.input')"
      >
        <template #prefix>
          <AUserOutlined />
        </template>
      </SInput>
    </AFormItem>
    <AFormItem v-bind="validateInfos.password">
      <SInputPassword
        v-model:value="formModel.password"
        :size="size"
        :placeholder="t('overall.input')"
      >
        <template #prefix>
          <ALockOutlined />
        </template>
      </SInputPassword>
    </AFormItem>
    <SRow>
      <SCol :span="12">
        <AFormItem v-bind="validateInfos.rememberMe">
          <SCheckbox v-model:checked="formModel.rememberMe" :size="size">
            {{ t("overall.rememberMe") }}
          </SCheckbox>
        </AFormItem>
      </SCol>
      <SCol :span="12">
        <AFormItem :style="{ textAlign: 'right' }">
          <SButton
            type="link"
            linkType="minor"
            size="small"
            @click="setState(FormStateEnum.RESET_PASSWORD)"
          >
            {{ t("overall.resetPassword") }}
          </SButton>
        </AFormItem>
      </SCol>
    </SRow>
    <AFormItem>
      <SButton
        type="primary"
        :loading="loginLoading"
        :size="size"
        block
        @click="onSubmit"
      >
        {{ t("overall.login") }}
      </SButton>
    </AFormItem>
    <SRow :gutter="[16, 8]">
      <SCol :xs="24" :md="8">
        <SButton block @click="setState(FormStateEnum.PHONE_LOGIN)">
          {{ t("overall.phoneLogin") }}
        </SButton>
      </SCol>
      <SCol :xs="24" :md="8">
        <SButton block @click="setState(FormStateEnum.QR_CODE_LOGIN)">
          {{ t("overall.qrCodeLogin") }}
        </SButton>
      </SCol>
      <SCol :xs="24" :md="8">
        <SButton block @click="setState(FormStateEnum.RESET_PASSWORD)">
          {{ t("overall.register") }}
        </SButton>
      </SCol>
    </SRow>
  </AForm>
</template>

<script lang="ts">
import type { UnwrapRef } from "vue";

import { computed, defineComponent, reactive, ref } from "vue";
import { Form as AForm } from "ant-design-vue";
import { useForm } from "@ant-design-vue/use";

import SRow from "/@/components/row";
import SCol from "/@/components/col";
import SButton from "/@/components/button";
import { SInput, SInputPassword } from "/@/components/input";
import SCheckbox from "/@/components/checkbox";
import { useI18n } from "/@/hooks/useLocale";
import { FormStateEnum, useState } from "./useForm";

interface FormModel {
  account: string | undefined;
  password: string | undefined;
  rememberMe: boolean;
}

export default defineComponent({
  name: "HumanLoginPasswordLogin",
  components: {
    AForm,
    AFormItem: AForm.Item,
    SRow,
    SCol,
    SButton,
    SInput,
    SInputPassword,
    SCheckbox,
  },
  inheritAttrs: false,
  setup() {
    const { setState } = useState();

    const formModel: UnwrapRef<FormModel> = reactive({
      account: undefined,
      password: undefined,
      rememberMe: false,
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
    const onSubmit = () => {
      loginLoading.value = true;
      validate()
        .then((formData) => {
          console.log(formData);
          //todo login
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loginLoading.value = false;
        });
    };

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
