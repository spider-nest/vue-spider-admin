<script lang="ts">
import { defineComponent, ref, reactive, toRaw } from "vue";

import SInput from "@/components/input/SInput.vue";
import SIcon from "@/components/icon/SIcon.vue";
import SForm from "@/components/form/SForm.vue";
import SFormItem from "@/components/form/SFormItem.vue";
import SButton from "@/components/button/SButton.vue";

import useForm from "@/hooks/web/useForm";
import { useSuccessMessage } from "@/hooks/web/useMessage";

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
      validate()
        .then((errors) => {
          if (errors) {
            return console.error(errors);
          }
          const userStore = useUserStore();
          userStore.emailLogin(toRaw(formModel)).then(() => {
            useSuccessMessage();
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
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
    @keypress.enter="onSubmit"
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
