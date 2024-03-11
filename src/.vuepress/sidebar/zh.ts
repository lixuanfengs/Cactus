import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "creative",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "后端知识体系",
      icon: "note",
      prefix: "posts/",
      // collapsible: true,
      children: [
        {
          text: "Java",
          icon: "java",
          prefix: "Java/",
          link: "Java/",
          // children: ["swift/", "source/", "other/", "tool/", "system/", "ui/"],
        },
        {
          text: "Python",
          icon: "python",
          prefix: "Python/",
          link: "Python/",
        },
      ],
    },
    {
      text: "前端知识体系",
      icon: "html5",
      prefix: "webs/",
      // collapsible: true,
      children: [
        {
          text: "Web",
          icon: "code",
          prefix: "Web/",
          link: "Web/",
          // children: ["Browser/", "JavaScript/", "CSS/", "node/", "Vue/"],
        },
      ],
    },
    {
      text: "服务器知识体系",
      icon: "yunfuwuqi",
      prefix: "linuxs/",
      // collapsible: true,
      children: [
        {
          text: "Linux",
          icon: "linux",
          prefix: "Linux/",
          link: "Linux/",
          // children: ["Browser/", "JavaScript/", "CSS/", "node/", "Vue/"],
        },
      ],
    },
    {
      text: "软件/工具教程",
      icon: "software",
      prefix: "tutorial/",
      link: "tutorial",
    },
    {
      text: "博客相关",
      icon: "blog",
      prefix: "blog/",
      link: "blog/",
    },
    {
      text: "站点收藏",
      icon: "sitemap",
      prefix: "site",
      link: "site",
      children: "structure",
    },
    {
      text: "随笔",
      icon: "flower",
      prefix: "private/",
      children: "structure",
    },
    {
      text: "关于",
      icon: "info",
      prefix: "about/",
      link: "about",
    },
  ],
  "/posts/Java/": "structure",
});
