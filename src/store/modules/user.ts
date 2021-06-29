import { defineStore } from "pinia";

//todo
export const useUserStore = defineStore({
  id: "app-user",
  actions: {
    resetState() {
      this.userInfo = null;
      this.token = "";
      this.roleList = [];
      this.sessionTimeout = false;
    },
  },
});
