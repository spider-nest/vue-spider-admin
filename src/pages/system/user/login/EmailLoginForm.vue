<script lang="ts">
import { defineComponent } from "vue";
import { NFormItem } from "naive-ui";

import SInput from "@/components/input/SInput.vue";
import SIcon from "@/components/icon/SIcon.vue";
import SForm from "@/components/form/SForm";

export default defineComponent({
  name: "EmailLoginForm",
  components: { SForm, NFormItem, SInput, SIcon },
});
</script>

<template>
  <SForm>
    <NFormItem path="email">
      <SInput>
        <template #prefix>
          <SIcon name="Mail24Regular" />
        </template>
      </SInput>
    </NFormItem>
    <NFormItem path="password">
      <SInput type="password" :show-password-toggle="true">
        <template #prefix>
          <SIcon name="LockShield24Regular" />
        </template>
      </SInput>
    </NFormItem>
  </SForm>
</template>
