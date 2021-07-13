<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

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
    const router = useRouter();

    const value = computed(() => router.currentRoute.value.path);

    const permissionStore = usePermissionStore();
    const options = permissionStore.getMenuList;

    return { value, options };
  },
});
</script>

<template>
  <SMenu :value="value" :collapsed="collapsed" :options="options" />
</template>
