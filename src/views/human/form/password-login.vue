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
    <ARow>
      <ACol :span="12">
        <AFormItem v-bind="validateInfos.rememberMe">
          <SCheckbox v-model:checked="formModel.rememberMe" :size="size">
            {{ t("overall.rememberMe") }}
          </SCheckbox>
        </AFormItem>
      </ACol>
      <ACol :span="12">
        <AFormItem :style="{ textAlign: 'right' }">
          <SButton
            type="link"
            size="small"
            @click="setState(FormStateEnum.RESET_PASSWORD)"
          >
            {{ t("overall.resetPassword") }}
          </SButton>
        </AFormItem>
      </ACol>
    </ARow>
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
    <ARow :gutter="[16, 8]">
      <ACol :xs="24" :md="8">
        <SButton block @click="setState(FormStateEnum.PHONE_LOGIN)">
          {{ t("overall.phoneLogin") }}
        </SButton>
      </ACol>
      <ACol :xs="24" :md="8">
        <SButton block @click="setState(FormStateEnum.QR_CODE_LOGIN)">
          {{ t("overall.qrCodeLogin") }}
        </SButton>
      </ACol>
      <ACol :xs="24" :md="8">
        <SButton block @click="setState(FormStateEnum.RESET_PASSWORD)">
          {{ t("overall.register") }}
        </SButton>
      </ACol>
    </ARow>
  </AForm>
</template>

<script lang="ts">
import type { UnwrapRef } from "vue";

import { computed, defineComponent, reactive, ref } from "vue";
import { Row as ARow, Col as ACol, Form as AForm } from "ant-design-vue";
import {
  UserOutlined as AUserOutlined,
  LockOutlined as ALockOutlined,
} from "@ant-design/icons-vue";
import { useForm } from "@ant-design-vue/use";

import { SButton } from "/@/components/button";
import { SInput, SInputPassword } from "/@/components/input";
import { SCheckbox } from "/@/components/checkbox";
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
    ARow,
    ACol,
    AForm,
    AFormItem: AForm.Item,
    AUserOutlined,
    ALockOutlined,
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
