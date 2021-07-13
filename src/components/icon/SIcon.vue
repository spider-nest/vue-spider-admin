<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@vicons/utils";
import {
  Mail24Regular,
  LockShield24Regular,
  Glance24Regular,
  VehicleCar24Regular,
} from "@vicons/fluent";

export default defineComponent({
  name: "SICon",
  components: {
    Icon,
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
  <Icon v-bind="$attrs">
    <component :is="name" :key="name" />
  </Icon>
</template>
