import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "导航", icon: "daohang", link: "/demo/" },
  {
    text: "知识体系",
    icon: "biji",
    children: [
      {
        text: "后端",
        prefix:"/posts/",
        children: [
          { text: "Java", icon: "java", link: "Java/" },
          { text: "前端", icon: "code", link: "Web/" },
          { text: "Linux", icon: "linux", link: "Linux/" },
          { text: "Python", icon: "python", link: "Python/" },
          { text: "React", icon: "react", link: "cross-platform/ReactNative/" },
          {
            text: "Flutter",
            icon: "hk-flutter",
            link: "cross-platform/Flutter/",
          },
        ],
      },
      {
        text: "博客相关",
        prefix:"/blog/",
        children: [
          { text: "博客相关", icon: "blog", link: "" },
        ],
      },
    ],
  },
  {
    text: "软件教程",
    icon: "ruanjian",
    link: "/tutorial/",
  },
  {
    text: "收藏",
    icon: "shoucang1",
    link: "/collect",
  },
  {
    text: "说说",
    icon: "xiaoshuo1",
    link: "/news/",
  },
  {
    text: "留言板",
    icon: "liuyanpinglun",
    link: "/visitorsbook",
  },
  {
    text: "友链",
    icon: "duankailianjie",
    link: "/friend",
  },
  {
    text: "关于",
    icon: "guanyu",
    children:[
      { text: "关于我", icon: "people", link: "/intro" },
      { text: "关于本站", icon: "info", link: "/about" },
    ]
  },
]);
