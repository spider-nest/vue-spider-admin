<template>
  <SIcon icon="ion:language" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SIcon from "/@/components/icon";
import { localeList } from "/@/settings/locale";

export default defineComponent({
  name: "LocalePicker",
  components: { SIcon },
  inheritAttrs: false,
  setup() {
    return { localeList };
  },
});
</script>
