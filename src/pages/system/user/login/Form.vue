<script lang="ts">
import { defineComponent } from "vue";

import STabs from "@/components/tabs/STabs.vue";
import STabPane from "@/components/tabs/STabPane.vue";
import EmailLoginForm from "./EmailLoginForm.vue";
import PhoneLoginForm from "./PhoneLoginForm.vue";

import { FormStateEnum, useState } from "./useForm";

const name = "LoginForm";

export default defineComponent({
  name,
  components: {
    STabs,
    STabPane,
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
  <STabs
    :default-value="FormStateEnum.EMAIL_LOGIN"
    justify-content="space-evenly"
  >
    <STabPane :name="FormStateEnum.EMAIL_LOGIN" tab="邮箱登入">
      <EmailLoginForm />
    </STabPane>
    <STabPane :name="FormStateEnum.PHONE_LOGIN" tab="手机登入">
      <PhoneLoginForm />
    </STabPane>
  </STabs>
</template>
