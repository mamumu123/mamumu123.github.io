import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    // "",
    {
      icon: "discover",
      text: "案例",
      prefix: "blog/",
      link: "blog/",
      children: "structure",
    },
    // {
    //   text: "文档",
    //   icon: "note",
    //   prefix: "guide/",
    //   children: "structure",
    // },
    // "slides",
  ],
});
