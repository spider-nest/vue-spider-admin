<template>
  <Form v-show="show" layout="vertical">
    <FormItem v-bind="validateInfos.account">
      <Input
        v-model:value="formModel.account"
        :size="size"
        :placeholder="t('overall.input')"
        allowClear
      >
        <template #prefix>
          <UserOutlined />
        </template>
      </Input>
    </FormItem>
    <FormItem v-bind="validateInfos.password">
      <InputPassword
        v-model:value="formModel.password"
        :size="size"
        :placeholder="t('overall.input')"
        visibilityToggle
      >
        <template #prefix>
          <LockOutlined />
        </template>
      </InputPassword>
    </FormItem>
    <Row>
      <Col :span="12">
        <FormItem v-bind="validateInfos.rememberMe">
          <Checkbox v-model:checked="formModel.rememberMe" :size="size">
            {{ t("overall.rememberMe") }}
          </Checkbox>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem :style="{ textAlign: 'right' }">
          <SButton type="link" size="small">
            <!--//todo-->
            {{ t("overall.resetPassword") }}
          </SButton>
        </FormItem>
      </Col>
    </Row>
    <FormItem>
      <SButton
        type="primary"
        :loading="loginLoading"
        :size="size"
        block
        @click="onSubmit"
      >
        {{ t("overall.login") }}
      </SButton>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import type { UnwrapRef } from "vue";

import { computed, defineComponent, reactive, unref, ref } from "vue";
import { Row, Col, Form, Input, Checkbox } from "ant-design-vue";
import { useForm } from "@ant-design-vue/use";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

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
    Row,
    Col,
    Form,
    FormItem: Form.Item,
    Input,
    InputPassword: Input.Password,
    Checkbox,
    SButton,
    UserOutlined,
    LockOutlined,
  },
  inheritAttrs: false,
  setup() {
    const { getState } = useState();
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
    };
  },
});
</script>
