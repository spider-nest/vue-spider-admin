import { defineStore } from "pinia";

//todo
export const usePermissionStore = defineStore({
  id: "app-permission",
  actions: {
    resetState() {
      this.isDynamicAddedRoute = false;
      this.permissionCodeList = [];
      this.menuList = [];
      this.lastBuildMenuTime = 0;
    },
  },
});
