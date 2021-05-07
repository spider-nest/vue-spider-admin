<template>
  //todo
  <SIcon icon="ion:language" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SIcon from "/@/components/icon";

export default defineComponent({
  name: "LocalePicker",
  components: { SIcon },
  inheritAttrs: false,
});
</script>
