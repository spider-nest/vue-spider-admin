import antDesignLocale from "ant-design-vue/es/locale/zh_CN";
import momentLocale from "moment/dist/locale/zh-cn";

export default {
  message: {
    ...{
      okText: "确认",
      closeText: "关闭",
      cancelText: "取消",
      loadingText: "加载中...",
      saveText: "保存",
      delText: "删除",
      resetText: "重置",
      searchText: "搜索",
      queryText: "查询",
      inputText: "请输入",
      chooseText: "请选择",
      redo: "刷新",
      back: "返回",

      routes: {
        login: "登入",
      },
    },
    antDesignLocale,
  },
  momentLocale,
  momentLocaleName: "zh-cn",
};
