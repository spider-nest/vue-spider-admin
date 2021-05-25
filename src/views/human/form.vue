<template>
  <transition name="fade-slide" mode="out-in">
    <component
      :is="
        getState === FormStateEnum.PASSWORD_LOGIN
          ? 'PasswordLoginForm'
          : getState === FormStateEnum.PHONE_LOGIN
          ? 'PhoneLoginForm'
          : getState === FormStateEnum.QR_CODE_LOGIN
          ? 'QrcodeLoginForm'
          : getState === FormStateEnum.REGISTER
          ? 'RegisterForm'
          : getState === FormStateEnum.RESET_PASSWORD
          ? 'ResetPasswordForm'
          : null
      "
    />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
  PasswordLoginForm,
  PhoneLoginForm,
  QrcodeLoginForm,
  RegisterForm,
  ResetPasswordForm,
} from "./form";
import { FormStateEnum, useState } from "./form/useForm";

export default defineComponent({
  name: "HumanLoginForm",
  components: {
    PasswordLoginForm,
    PhoneLoginForm,
    QrcodeLoginForm,
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
