<script lang="ts">
import { defineComponent, ref, reactive, toRaw } from "vue";

import { SInput, SIcon, SForm, SFormItem, SButton } from "@/components";

import useForm from "@/hooks/web/useForm";

import { useUserStore } from "@/store/modules/user";

export default defineComponent({
  name: "EmailLoginForm",
  components: { SForm, SFormItem, SInput, SIcon, SButton },
  inheritAttrs: false,
  setup() {
    const formRef = ref();

    const formModel = reactive({
      email: "spider",
      password: "spider",
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

    const { validate } = useForm(formRef);

    const submitting = ref(false);
    const onSubmit = () => {
      submitting.value = true;
      validate((errors) => {
        if (errors) {
          return console.error(errors);
        }
        const userStore = useUserStore();
        userStore.handleUserLogin(toRaw(formModel));
        setTimeout(() => {
          submitting.value = false;
        }, 300);
      });
    };

    return {
      formRef,
      formModel,
      formRules,
      submitting,
      onSubmit,
    };
  },
});
</script>

<template>
  <SForm
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    @keyup.enter="onSubmit"
  >
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
      <SButton
        type="primary"
        :block="true"
        :loading="submitting"
        :disabled="submitting"
        @click="onSubmit"
      >
        登入
      </SButton>
    </SFormItem>
  </SForm>
</template>
