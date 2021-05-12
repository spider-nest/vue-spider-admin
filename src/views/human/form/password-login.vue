<template>
  <AForm v-show="show" layout="vertical">
    <AFormItem v-bind="validateInfos.account">
      <AInput
        v-model:value="formModel.account"
        :size="size"
        :placeholder="t('overall.input')"
        allowClear
      >
        <template #prefix>
          <AUserOutlined />
        </template>
      </AInput>
    </AFormItem>
    <AFormItem v-bind="validateInfos.password">
      <AInputPassword
        v-model:value="formModel.password"
        :size="size"
        :placeholder="t('overall.input')"
        visibilityToggle
      >
        <template #prefix>
          <ALockOutlined />
        </template>
      </AInputPassword>
    </AFormItem>
    <ARow>
      <ACol :span="12">
        <AFormItem v-bind="validateInfos.rememberMe">
          <ACheckbox v-model:checked="formModel.rememberMe" :size="size">
            {{ t("overall.rememberMe") }}
          </ACheckbox>
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
    <AFormItem>
      <!--//todo-->
    </AFormItem>
  </AForm>
</template>

<script lang="ts">
import type { UnwrapRef } from "vue";

import { computed, defineComponent, reactive, unref, ref } from "vue";
import {
  Row as ARow,
  Col as ACol,
  Form as AForm,
  Input as AInput,
  Checkbox as ACheckbox,
} from "ant-design-vue";
import {
  UserOutlined as AUserOutlined,
  LockOutlined as ALockOutlined,
} from "@ant-design/icons-vue";
import { useForm } from "@ant-design-vue/use";

import { SButton } from "/@/components/button";
import { useI18n } from "/@/hooks/useLocale";
import { FormStateEnum, useState } from "./useForm";

interface FormModel {
  account: string | undefined;
  password: string | undefined;
  rememberMe: boolean;
}

export default defineComponent({
  components: {
    ARow,
    ACol,
    AForm,
    AFormItem: AForm.Item,
    AInput,
    AInputPassword: AInput.Password,
    ACheckbox,
    AUserOutlined,
    ALockOutlined,
    SButton,
  },
  inheritAttrs: false,
  setup() {
    const { getState, setState } = useState();
    const show = computed(
      () => unref(getState) === FormStateEnum.PASSWORD_LOGIN
    );

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
      show,
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
