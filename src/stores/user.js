import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: null,
      loginState: null,
      userErrorCode: "",
      userErrorMessage: "",
    };
  },
  actions: {
    getUserData(payload) {
      // console.log(payload);
      this.user = payload;
    },
    getLoginState(payload) {
      console.log(payload);
      this.loginState = payload;
    },
    clearUser() {
      this.user = null;
      this.userErrorCode = "";
      this.userErrorMessage = "";
    },
  },
});
