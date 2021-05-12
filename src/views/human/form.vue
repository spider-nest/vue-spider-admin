<template>
  <PasswordLoginForm v-show="getState === FormStateEnum.PASSWORD_LOGIN" />
  <PhoneLoginForm v-show="getState === FormStateEnum.PHONE_LOGIN" />
  <QrCodeLoginForm v-show="getState === FormStateEnum.QR_CODE_LOGIN" />
  <RegisterForm v-show="getState === FormStateEnum.REGISTER" />
  <ResetPasswordForm v-show="getState === FormStateEnum.RESET_PASSWORD" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
  PasswordLoginForm,
  PhoneLoginForm,
  QrCodeLoginForm,
  RegisterForm,
  ResetPasswordForm,
} from "./form";
import { FormStateEnum, useState } from "./form/useForm";

export default defineComponent({
  components: {
    PasswordLoginForm,
    PhoneLoginForm,
    QrCodeLoginForm,
    RegisterForm,
    ResetPasswordForm,
  },
  inheritAttrs: false,
  setup() {
    const { getState } = useState();

    return { getState, FormStateEnum };
  },
});
</script>
