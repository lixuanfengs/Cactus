import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: "主页", icon: "fa-solid fa-home", link: "/" },
  {
    text: "技术文档",
    icon: "fa-solid fa-book",
    children: [
      {
        text: "后端开发",
        prefix: "/backend/",
        children: [
          { text: "Java核心", icon: "fa-brands fa-java", link: "java/" },
          { text: "Spring生态", icon: "iconfont icon-spring", link: "spring/" },
          { text: "Python开发", icon: "fa-brands fa-python", link: "python/" },
          {
            text: "数据库技术",
            icon: "fa-solid fa-database",
            prefix: "database/",

            link: "database/",
            children: [
              { text: "MySQL", icon: "fa-solid fa-database", link: "MySQL/" },
            ],
          },
        ],
      },
      {
        text: "前端开发",
        prefix: "/frontend/",
        children: [
          { text: "JavaScript", icon: "fa-brands fa-js-square", link: "javascript/" },
          { text: "TypeScript", icon: "fa-solid fa-code", link: "typescript/" },
          { text: "前端框架", icon: "fa-brands fa-react", link: "frameworks/" },
        ],
      },
      {
        text: "运维部署",
        prefix: "/devops/",
        children: [
          { text: "Linux运维", icon: "fa-brands fa-linux", link: "linux/" },
          { text: "Docker容器", icon: "fa-brands fa-docker", link: "docker/" },
          { text: "Kubernetes", icon: "fa-solid fa-dharmachakra", link: "kubernetes/" },
          { text: "CI/CD", icon: "fa-solid fa-rocket", link: "cicd/" },
          { text: "Git版本控制", icon: "fa-brands fa-git-alt", link: "git/" },
        ],
      },
      {
        text: "架构设计",
        prefix: "/architecture/",
        children: [
          { text: "微服务架构", icon: "fa-solid fa-cubes", link: "microservices/" },
          { text: "DDD设计", icon: "fa-solid fa-sitemap", link: "ddd/" },
          { text: "设计模式", icon: "fa-solid fa-puzzle-piece", link: "patterns/" },
        ],
      },
    ],
  },
  {
    text: "实战教程",
    icon: "fa-solid fa-graduation-cap",
    children: [
      {
        text: "项目实战",
        prefix: "/tutorials/projects/",
        children: [
          { text: "Spring AI", icon: "fa-solid fa-robot", link: "spring-ai-rag/" },
          { text: "AI MCP Cactus", icon: "fa-solid fa-microchip", link: "ai-mcp-cactusli/" },
          { text: "OAuth2.0", icon: "fa-solid fa-shield-halved", link: "oauth2/" },
          { text: "性能优化", icon: "fa-solid fa-tachometer-alt", link: "performance/" },
          { text: "延时任务", icon: "fa-solid fa-clock", link: "delayed-tasks/" },
        ],
      },
      {
        text: "工具使用",
        prefix: "/tutorials/tools/",
        children: [
          { text: "Ai编程工具", icon: "fa-solid fa-code", link: "aicoding/" },
          { text: "Maven构建", icon: "fa-solid fa-cube", link: "maven/" },
          { text: "网络工具", icon: "fa-solid fa-network-wired", link: "network/" },
          { text: "调试工具", icon: "fa-solid fa-bug", link: "debugging/" },
        ],
      },
    ],
  },
  {
    text: "资源导航",
    icon: "fa-solid fa-toolbox",
    children: [
      { text: "开发工具", icon: "fa-solid fa-compass", link: "/resources/tools/" },
      { text: "收藏夹", icon: "fa-solid fa-bookmark", link: "/resources/collections/" },
      { text: "博客相关", icon: "fa-solid fa-blog", link: "/blog/" },
    ],
  },
  {
    text: "互动交流",
    icon: "fa-solid fa-users",
    children: [
      { text: "留言板", icon: "fa-solid fa-comments", link: "/visitorsbook" },
      { text: "友情链接", icon: "fa-solid fa-link", link: "/friend" },
    ],
  },
  {
    text: "关于",
    icon: "fa-solid fa-info-circle",
    children: [
      { text: "关于我", icon: "fa-solid fa-user", link: "/intro" },
      { text: "关于本站", icon: "fa-solid fa-info", link: "/about" },
    ],
  },
]);
