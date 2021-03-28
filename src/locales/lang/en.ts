import antDesignLocale from "ant-design-vue/es/locale/en_US";
import momentLocale from "moment/dist/locale/eu";

export default {
  message: {
    ...{
      okText: "OK",
      closeText: "Close",
      cancelText: "Cancel",
      loadingText: "Loading...",
      saveText: "Save",
      delText: "Delete",
      resetText: "Reset",
      searchText: "Search",
      queryText: "Search",
      inputText: "Please enter",
      chooseText: "Please choose",
      redo: "Refresh",
      back: "Back",

      routes: {
        exception401: "401",
        exception403: "403",
        exception404: "404",
        exception500: "500",
        redirect: "Redirect",
        login: "Login",
        home: "Home",
      },
    },
    antDesignLocale,
  },
  momentLocale,
  momentLocaleName: "eu",
};
