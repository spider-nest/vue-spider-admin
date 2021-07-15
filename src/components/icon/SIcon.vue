<script lang="ts">
import { defineComponent } from "vue";
import { NIcon } from "naive-ui";
import {
  Mail24Regular,
  LockShield24Regular,
  Glance24Regular,
  VehicleCar24Regular,
  Home24Regular,
  ArrowClockwise24Regular,
  InprivateAccount24Regular,
  SignOut24Regular,
} from "@vicons/fluent"; // https://www.xicons.org/#/zh-CN 统一使用24Regular

export default defineComponent({
  name: "SICon",
  components: {
    NIcon,
    Mail24Regular,
    LockShield24Regular,
    Glance24Regular,
    VehicleCar24Regular,
    Home24Regular,
    ArrowClockwise24Regular,
    InprivateAccount24Regular,
    SignOut24Regular,
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
