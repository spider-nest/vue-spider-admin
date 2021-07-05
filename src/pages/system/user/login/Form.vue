<script lang="ts">
import { defineComponent } from "vue";
import { NTabs, NTabPane } from "naive-ui";

import EmailLoginForm from "./EmailLoginForm.vue";
import PhoneLoginForm from "./PhoneLoginForm.vue";

import { FormStateEnum, useState } from "./useForm";

const name = "LoginForm";

export default defineComponent({
  name,
  components: {
    NTabs,
    NTabPane,
    EmailLoginForm,
    PhoneLoginForm,
  },
  setup() {
    const { getState } = useState();

    return { getState, FormStateEnum };
  },
});
</script>

<template>
  <NTabs
    :default-value="FormStateEnum.EMAIL_LOGIN"
    justify-content="space-evenly"
  >
    <NTabPane :name="FormStateEnum.EMAIL_LOGIN" tab="邮箱登入">
      <EmailLoginForm />
    </NTabPane>
    <NTabPane :name="FormStateEnum.PHONE_LOGIN" tab="手机登入">
      <PhoneLoginForm />
    </NTabPane>
  </NTabs>
</template>
