<script lang="ts">
import { defineComponent, toRaw } from "vue";

import { SMenu } from "@/components";

import { usePermissionStore } from "@/store/modules/permission";

const name = "LayoutDefaultMenu";

export default defineComponent({
  name,
  components: { SMenu },
  inheritAttrs: false,
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const permissionStore = usePermissionStore();
    const options = permissionStore.getMenuList;
    console.log(toRaw(options));

    return { options };
  },
});
</script>

<template>
  <SMenu :collapsed="collapsed" :options="options" />
</template>
