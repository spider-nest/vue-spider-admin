<template>
  <SForm @keypress.enter="onSubmit">
    <SFormItem v-bind="validateInfos.phone">
      <SInput v-model:value.trim="formModel.phone" :size="size">
        <template #prefix>
          <APhoneOutlined />
        </template>
      </SInput>
    </SFormItem>
    <SFormItem v-bind="validateInfos.captcha">
      <SInput v-model:value.trim="formModel.captcha" :size="size">
        <template #addonAfter>
          <Countdown
            type="link"
            linkType="default"
            :preStartFn="fetchCaptcha"
          />
        </template>
      </SInput>
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
    <SFormItem>
      <SButton :size="size" block @click="resetState">
        {{ t("overall.back") }}
      </SButton>
    </SFormItem>
  </SForm>
</template>

<script lang="ts">
import type { UnwrapRef } from "vue";

import { computed, defineComponent, reactive, ref } from "vue";
import { useForm } from "@ant-design-vue/use";
import { onKeyStroke, useDebounceFn } from "@vueuse/core";

import { SForm, SFormItem } from "/@/components/form";
import SInput from "/@/components/input";
import Countdown from "/@/components/countdown";
import SButton from "/@/components/button";
import { useI18n } from "/@/hooks/useLocale";
import { FormStateEnum, useState } from "./useForm";

interface FormModel {
  phone: string;
  captcha: string;
}

export default defineComponent({
  name: "HumanLoginPhoneLogin",
  components: { SForm, SFormItem, SInput, Countdown, SButton },
  inheritAttrs: false,
  setup() {
    const { setState, resetState } = useState();

    const formModel: UnwrapRef<FormModel> = reactive({
      phone: "",
      captcha: "",
    });

    const { t } = useI18n();
    const formRules = reactive({
      phone: [{ required: true, message: computed(() => t("overall.input")) }],
      captcha: [
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

    const fetchCaptcha = async () => {
      return await validate("phone")
        .then((formData) => {
          console.log(formData);
          //todo fetch captcha
          return true;
        })
        .catch((error: Error) => {
          console.error(error);
          return false;
        });
    };

    return {
      t,
      setState,
      formModel,
      validateInfos,
      size: "large",
      onSubmit,
      FormStateEnum,
      loginLoading,
      fetchCaptcha,
      resetState,
    };
  },
});
</script>
