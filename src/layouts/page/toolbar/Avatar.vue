<script lang="ts">
import { defineComponent } from "vue";

import { SDropdown, SAvatar } from "@/components";
import LayoutPageToolbarItem from "@/layouts/page/toolbar/item/Index.vue";
import { renderLabel } from "./util";

import { useUserStore } from "@/store/modules/user";

export default defineComponent({
  name: "LayoutPageToolbarAvatar",
  components: { SDropdown, SAvatar, LayoutPageToolbarItem },
  inheritAttrs: false,
  setup() {
    const userStore = useUserStore();
    const userInfo = userStore.getUserInfo;

    const options = [
      {
        key: "SystemUser",
        label: "用户管理 ",
        path: "/system/user",
        iconName: "InprivateAccount24Regular",
      },
      {
        key: "Divider",
        type: "divider",
      },
      {
        key: "Logout",
        label: "登出 ",
        iconName: "SignOut24Regular",
      },
    ];

    const onSelect = (key) => {
      if (key === "Logout") {
        userStore.logout();
      }
    };

    return { userInfo, options, renderLabel, onSelect };
  },
});
</script>

<template>
  <SDropdown
    placement="left-start"
    trigger="click"
    :options="options"
    :render-label="renderLabel"
    @select="onSelect"
  >
    <LayoutPageToolbarItem size="default">
      <SAvatar>{{ userInfo.realName }}</SAvatar>
    </LayoutPageToolbarItem>
  </SDropdown>
</template>
