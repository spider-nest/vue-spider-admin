<script lang="ts">
import { defineComponent } from "vue";
import { NIcon } from "naive-ui";
import {
  Mail24Regular,
  LockShield24Regular,
  Glance24Regular,
  VehicleCar24Regular,
} from "@vicons/fluent";

export default defineComponent({
  name: "SICon",
  components: {
    NIcon,
    Mail24Regular,
    LockShield24Regular,
    Glance24Regular,
    VehicleCar24Regular,
  },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: undefined,
    },
  },
});
</script>

<template>
  <NIcon v-bind="$attrs">
    <component :is="name" :key="name" />
  </NIcon>
</template>
