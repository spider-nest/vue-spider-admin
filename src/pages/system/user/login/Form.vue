<script lang="ts">
import { defineComponent } from "vue";
import { NTabPane } from "naive-ui";

import STabs from "@/components/tabs/STabs.vue";
import EmailLoginForm from "./EmailLoginForm.vue";
import PhoneLoginForm from "./PhoneLoginForm.vue";

import { FormStateEnum } from "./useForm";

const name = "LoginForm";

export default defineComponent({
  name,
  components: {
    STabs,
    NTabPane,
    EmailLoginForm,
    PhoneLoginForm,
  },
  setup() {
    return { FormStateEnum };
  },
});
</script>

<template>
  <STabs
    :default-value="FormStateEnum.EMAIL_LOGIN"
    justify-content="space-evenly"
  >
    <NTabPane :name="FormStateEnum.EMAIL_LOGIN" tab="邮箱登入">
      <EmailLoginForm />
    </NTabPane>
    <NTabPane :name="FormStateEnum.PHONE_LOGIN" tab="手机登入">
      <PhoneLoginForm />
    </NTabPane>
  </STabs>
</template>
