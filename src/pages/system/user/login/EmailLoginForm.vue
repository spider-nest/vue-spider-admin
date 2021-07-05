<script lang="ts">
import { defineComponent } from "vue";

import SInput from "@/components/input/SInput.vue";
import SIcon from "@/components/icon/SIcon.vue";
import SForm from "@/components/form/SForm.vue";
import SFormItem from "@/components/form/SFormItem.vue";

export default defineComponent({
  name: "EmailLoginForm",
  components: { SForm, SFormItem, SInput, SIcon },
});
</script>

<template>
  <SForm>
    <SFormItem path="email">
      <SInput>
        <template #prefix>
          <SIcon name="Mail24Regular" />
        </template>
      </SInput>
    </SFormItem>
    <SFormItem path="password">
      <SInput type="password" :show-password-toggle="true">
        <template #prefix>
          <SIcon name="LockShield24Regular" />
        </template>
      </SInput>
    </SFormItem>
  </SForm>
</template>
