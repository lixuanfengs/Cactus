import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    {
      text: "工具导航",
      icon: "creative",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "技术博客",
      icon: "fa-solid fa-blog",
      children: [
        {
          text: "后端技术",
          icon: "java",
          prefix: "posts/",
          children: [
            {
              text: "Java核心",
              icon: "java",
              prefix: "Java/",
              link: "Java/",
            },
            {
              text: "Spring生态",
              icon: "spring",
              prefix: "Spring/",
              link: "Spring/",
            },
            {
              text: "Python开发",
              icon: "python",
              prefix: "Python/",
              link: "Python/",
            },
          ],
        },
        {
          text: "前端技术",
          icon: "fa-brands fa-html5",
          prefix: "webs/",
          children: [
            {
              text: "ES6进阶",
              icon: "fa-brands fa-js-square",
              prefix: "ES6/",
              link: "ES6/",
            },
            {
              text: "TypeScript",
              icon: "fa-solid fa-code",
              prefix: "TypeScript/",
              link: "TypeScript/",
            },
          ],
        },
        {
          text: "运维部署",
          icon: "yunfuwuqi",
          prefix: "linuxs/",
          children: [
            {
              text: "Linux运维",
              icon: "linux",
              prefix: "Linux/",
              link: "Linux/",
            },
            {
              text: "Docker容器",
              icon: "docker",
              prefix: "Docker/",
              link: "Docker/",
            },
          ],
        },
        {
          text: "架构设计",
          icon: "fa-solid fa-sitemap",
          prefix: "tutorial/",
          children: [
            {
              text: "DDD架构",
              icon: "fa-solid fa-sitemap",
              prefix: "DDD 技术体系/",
              link: "DDD 技术体系/",
            },
            {
              text: "性能优化",
              icon: "fa-solid fa-tachometer-alt",
              prefix: "Java项目性能优化/",
              link: "Java项目性能优化/",
            },
          ],
        },
      ],
    },
    {
      text: "实战教程",
      icon: "fa-solid fa-book-open",
      prefix: "tutorial/",
      link: "tutorial/",
      children: [
        {
          text: "开发实战",
          icon: "fa-solid fa-laptop-code",
          children: [
            {
              text: "Spring AI",
              icon: "fa-solid fa-robot",
              prefix: "Spring-AI-RAG/",
              link: "Spring-AI-RAG/",
            },
            {
              text: "OAuth2.0",
              icon: "fa-solid fa-shield-halved",
              prefix: "OAuth2.0 教程/",
              link: "OAuth2.0 教程/",
            },
            {
              text: "Maven构建",
              icon: "fa-solid fa-cube",
              prefix: "Maven 基础/",
              link: "Maven 基础/",
            },
          ],
        },
        {
          text: "部署运维",
          icon: "fa-solid fa-server",
          children: [
            {
              text: "系统部署",
              icon: "fa-solid fa-rocket",
              prefix: "系统开发部署/",
              link: "系统开发部署/",
            },
            {
              text: "网络工具",
              icon: "fa-solid fa-network-wired",
              prefix: "网络工具使用/",
              link: "网络工具使用/",
            },
            {
              text: "抓包调试",
              icon: "fa-solid fa-bug",
              prefix: "抓包工具指南/",
              link: "抓包工具指南/",
            },
          ],
        },
      ],
    },
    {
      text: "开发工具",
      icon: "fa-solid fa-toolbox",
      prefix: "devops/",
      children: [
        {
          text: "Git使用",
          icon: "fa-brands fa-git-alt",
          prefix: "Git使用教程/",
          link: "Git使用教程/",
        },
      ],
    },
    {
      text: "博客相关",
      icon: "blog",
      prefix: "blog/",
      link: "blog/",
    },
    {
      text: "关于",
      icon: "info",
      prefix: "about/",
      link: "about/",
    },
  ],
  "/posts/Java/": "structure",
  "/posts/Spring/": "structure",
  "/posts/Python/": "structure",
  "/linuxs/Linux/": "structure",
  "/linuxs/Docker/": "structure",
  "/webs/ES6/": "structure",
  "/webs/TypeScript/": "structure",
  "/tutorial/": "structure",
  "/tutorial/Spring-AI-RAG/": "structure",
  "/tutorial/OAuth2.0 教程/": "structure", 
  "/tutorial/Maven 基础/": "structure",
  "/tutorial/系统开发部署/": "structure",
  "/tutorial/网络工具使用/": "structure",
  "/tutorial/抓包工具指南/": "structure",
  "/tutorial/实现延时任务的方式汇总/": "structure",
  "/tutorial/DDD 技术体系/": "structure",
  "/tutorial/Java项目性能优化/": "structure",
  "/devops/Git使用教程/": "structure",
  "/blog/": "structure",

});
