import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: "主页", icon: "fa-solid fa-home", link: "/" },
  {
    text: "技术博客",
    icon: "fa-solid fa-blog",
    children: [
      {
        text: "后端技术",
        prefix: "/posts/",
        children: [
          { text: "Java核心", icon: "java", link: "Java/" },
          { text: "Spring生态", icon: "spring", link: "Spring/" },
          { text: "Python开发", icon: "python", link: "Python/" },
        ],
      },
      {
        text: "前端技术",
        prefix: "/webs/",
        children: [
          { text: "ES6进阶", icon: "fa-brands fa-js-square", link: "ES6/" },
          { text: "TypeScript", icon: "fa-solid fa-code", link: "TypeScript/" },
        ],
      },
      {
        text: "运维部署",
        prefix: "/linuxs/",
        children: [
          { text: "Linux运维", icon: "linux", link: "Linux/" },
          { text: "Docker容器", icon: "docker", link: "Docker/" },
        ],
      },
      {
        text: "架构设计",
        prefix: "/tutorial/",
        children: [
          { text: "DDD架构", icon: "fa-solid fa-sitemap", link: "DDD 技术体系/" },
          { text: "性能优化", icon: "fa-solid fa-tachometer-alt", link: "Java项目性能优化/" },
        ],
      },
    ],
  },
  {
    text: "实战教程",
    icon: "fa-solid fa-book-open", // FontAwesome图标
    children: [
      {
        text: "开发实战",
        prefix: "/tutorial/",
        children: [
          { text: "Spring AI", icon: "fa-solid fa-robot", link: "Spring-AI-RAG/" },
          { text: "OAuth2.0", icon: "fa-solid fa-shield-halved", link: "OAuth2.0 教程/" },
          { text: "Maven构建", icon: "fa-solid fa-cube", link: "Maven 基础/" },
        ],
      },
      {
        text: "部署运维",
        prefix: "/tutorial/",
        children: [
          { text: "系统部署", icon: "fa-solid fa-rocket", link: "系统开发部署/" },
          { text: "网络工具", icon: "fa-solid fa-network-wired", link: "网络工具使用/" },
          { text: "抓包调试", icon: "fa-solid fa-bug", link: "抓包工具指南/" },
        ],
      },
    ],
  },
  {
    text: "开发工具",
    icon: "fa-solid fa-toolbox",
    children: [
      { text: "Git使用", icon: "fa-brands fa-git-alt", link: "/devops/Git使用教程/" },
      { text: "工具导航", icon: "fa-solid fa-compass", link: "/demo/" },
      { text: "延时任务", icon: "fa-solid fa-clock", link: "/tutorial/实现延时任务的方式汇总/" },
    ],
  },
  {
    text: "收藏夹",
    icon: "fa-solid fa-bookmark",
    link: "/collect",
  },
  {
    text: "互动",
    icon: "fa-solid fa-users",
    children: [
      { text: "留言板", icon: "fa-solid fa-comments", link: "/visitorsbook" },
      { text: "友情链接", icon: "fa-solid fa-link", link: "/friend" },
    ],
  },
  {
    text: "关于",
    icon: "guanyu",
    children: [
      { text: "关于我", icon: "people", link: "/intro" },
      { text: "关于本站", icon: "info", link: "/about" },
    ],
  },
]);
