import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "知识点记录", icon: "discover", link: "/log/" },
  { text: "刷题", icon: "discover", link: "/guide/" },
  // {
  //   text: "指南",
  //   icon: "creative",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "creative",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "more", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "config",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "more", link: "" }],
  //     },
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "note",
  //   link: "https://theme-hope.vuejs.press/",
  // },
]);
