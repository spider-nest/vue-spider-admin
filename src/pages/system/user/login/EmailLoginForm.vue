<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

import SInput from "@/components/input/SInput.vue";
import SIcon from "@/components/icon/SIcon.vue";
import SForm from "@/components/form/SForm.vue";
import SFormItem from "@/components/form/SFormItem.vue";
import SButton from "@/components/button/SButton.vue";

export default defineComponent({
  name: "EmailLoginForm",
  components: { SForm, SFormItem, SInput, SIcon, SButton },
  inheritAttrs: false,
  setup() {
    const formRef = ref();

    const formModel = reactive({
      email: "",
      password: "",
    });

    const formRules = {
      email: {
        required: true,
        message: "请输入",
        trigger: "blur",
      },
      password: {
        required: true,
        message: "请输入",
        trigger: "blur",
      },
    };

    const onSubmit = () => {
      formRef.value.validate((error) => {
        if (error) {
          return console.error(error);
        }

        console.log(formModel);
      });
    };

    return {
      formRef,
      formModel,
      formRules,
      onSubmit,
    };
  },
});
</script>

<template>
  <SForm ref="formRef" :model="formModel" :rules="formRules">
    <SFormItem path="email">
      <SInput v-model:value.trim="formModel.email">
        <template #prefix>
          <SIcon name="Mail24Regular" />
        </template>
      </SInput>
    </SFormItem>
    <SFormItem path="password">
      <SInput
        v-model:value.trim="formModel.password"
        type="password"
        :show-password-toggle="true"
      >
        <template #prefix>
          <SIcon name="LockShield24Regular" />
        </template>
      </SInput>
    </SFormItem>
    <SFormItem>
      <SButton type="primary" :block="true" @click="onSubmit">登入</SButton>
    </SFormItem>
  </SForm>
</template>
