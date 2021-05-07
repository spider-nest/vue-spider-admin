<template>
  <div>Login</div>
  <AButton type="primary">登入</AButton>
  <AButton type="danger">危险</AButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button as AButton } from "ant-design-vue";

export default defineComponent({
  name: "HumanLogin",
  components: { AButton },
});
</script>
