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
        {
          text: "Spring",
          icon: "spring",
          prefix: "Spring/",
          link: "Spring/",
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
          text: "ES6",
          icon: "code",
          prefix: "ES6/",
          link: "ES6/",
          // children: ["Browser/", "JavaScript/", "CSS/", "node/", "Vue/"],
        },
        {
          text: "TypeScript",
          icon: "code",
          prefix: "TypeScript/",
          link: "TypeScript/",
          // children: ["Browser/", "JavaScript/", "CSS/", "node/", "Vue/"],
        }
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
      text: "工具|软件",
      icon: "software",
      prefix: "tutorial/",
      link: "tutorial",
      children: [
        {
          text: "Maven",
          icon: "java",
          prefix: "Maven/",
          link: "Maven/",
        },
        {
          text: "服务器基础环境配置",
          icon: "java",
          prefix: "Devops/",
          link: "Devops/",
        }
      ],
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
  "/posts/Spring/": "structure",
  "/posts/Python/": "structure",
  "/linuxs": "structure",
  "/tutorial": "structure",
  "/webs/ES6/": "structure",
  "/webs/TypeScript/": "structure",
  "/blog": "structure",


});
