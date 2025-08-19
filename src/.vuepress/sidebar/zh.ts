import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    {
      text: "资源导航",
      icon: "creative",
      prefix: "resources/",
      children: [
        {
          text: "开发工具",
          icon: "fa-solid fa-toolbox",
          prefix: "tools/",
          link: "tools/",
        },
        {
          text: "收藏夹",
          icon: "fa-solid fa-bookmark",
          prefix: "collections/",
          link: "collections/",
        },
      ],
    },
    {
      text: "技术文档",
      icon: "fa-solid fa-book",
      children: [
        {
          text: "后端开发",
          icon: "java",
          prefix: "backend/",
          children: [
            {
              text: "Java核心",
              icon: "java",
              prefix: "java/",
              link: "java/",
            },
            {
              text: "Spring生态",
              icon: "spring",
              prefix: "spring/",
              link: "spring/",
            },
            {
              text: "Python开发",
              icon: "python",
              prefix: "python/",
              link: "python/",
            },
            {
              text: "数据库技术",
              icon: "fa-solid fa-database",
              prefix: "database/",
              link: "database/",
            },
          ],
        },
        {
          text: "前端开发",
          icon: "fa-brands fa-html5",
          prefix: "frontend/",
          children: [
            {
              text: "JavaScript",
              icon: "fa-brands fa-js-square",
              prefix: "javascript/",
              link: "javascript/",
            },
            {
              text: "TypeScript",
              icon: "fa-solid fa-code",
              prefix: "typescript/",
              link: "typescript/",
            },
            {
              text: "前端框架",
              icon: "fa-brands fa-react",
              prefix: "frameworks/",
              link: "frameworks/",
            },
          ],
        },
        {
          text: "运维部署",
          icon: "yunfuwuqi",
          prefix: "devops/",
          children: [
            {
              text: "Linux运维",
              icon: "linux",
              prefix: "linux/",
              link: "linux/",
            },
            {
              text: "Docker容器",
              icon: "docker",
              prefix: "docker/",
              link: "docker/",
            },
            {
              text: "Kubernetes",
              icon: "fa-solid fa-dharmachakra",
              prefix: "kubernetes/",
              link: "kubernetes/",
            },
            {
              text: "CI/CD",
              icon: "fa-solid fa-rocket",
              prefix: "cicd/",
              link: "cicd/",
            },
            {
              text: "Git版本控制",
              icon: "fa-brands fa-git-alt",
              prefix: "git/",
              link: "git/",
            },
          ],
        },
        {
          text: "架构设计",
          icon: "fa-solid fa-sitemap",
          prefix: "architecture/",
          children: [
            {
              text: "微服务架构",
              icon: "fa-solid fa-cubes",
              prefix: "microservices/",
              link: "microservices/",
            },
            {
              text: "DDD设计",
              icon: "fa-solid fa-sitemap",
              prefix: "ddd/",
              link: "ddd/",
            },
            {
              text: "设计模式",
              icon: "fa-solid fa-puzzle-piece",
              prefix: "patterns/",
              link: "patterns/",
            },
          ],
        },
      ],
    },
    {
      text: "实战教程",
      icon: "fa-solid fa-book-open",
      prefix: "tutorials/",
      link: "tutorials/",
      children: [
        {
          text: "项目实战",
          icon: "fa-solid fa-laptop-code",
          prefix: "projects/",
          children: [
            {
              text: "Spring AI",
              icon: "fa-solid fa-robot",
              prefix: "spring-ai-rag/",
              link: "spring-ai-rag/",
            },
            {
              text: "OAuth2.0",
              icon: "fa-solid fa-shield-halved",
              prefix: "oauth2/",
              link: "oauth2/",
            },
            {
              text: "性能优化",
              icon: "fa-solid fa-tachometer-alt",
              prefix: "performance/",
              link: "performance/",
            },
            {
              text: "延时任务",
              icon: "fa-solid fa-clock",
              prefix: "delayed-tasks/",
              link: "delayed-tasks/",
            },
          ],
        },
        {
          text: "工具使用",
          icon: "fa-solid fa-toolbox",
          prefix: "tools/",
          children: [
            {
              text: "Maven构建",
              icon: "fa-solid fa-cube",
              prefix: "maven/",
              link: "maven/",
            },
            {
              text: "网络工具",
              icon: "fa-solid fa-network-wired",
              prefix: "network/",
              link: "network/",
            },
            {
              text: "调试工具",
              icon: "fa-solid fa-bug",
              prefix: "debugging/",
              link: "debugging/",
            },
          ],
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
      text: "互动交流",
      icon: "fa-solid fa-users",
      children: [
        { text: "留言板", icon: "fa-solid fa-comments", link: "/visitorsbook" },
        { text: "友情链接", icon: "fa-solid fa-link", link: "/friend" },
      ],
    },
    { text: "关于", icon: "info", link: "/about" },
  ],
  // 新的目录结构配置
  "/backend/java/": "structure",
  "/backend/spring/": "structure",
  "/backend/python/": "structure",
  "/backend/database/": "structure",
  "/frontend/javascript/": "structure",
  "/frontend/typescript/": "structure",
  "/frontend/frameworks/": "structure",
  "/devops/linux/": "structure",
  "/devops/docker/": "structure",
  "/devops/kubernetes/": "structure",
  "/devops/cicd/": "structure",
  "/devops/git/": "structure",
  "/architecture/microservices/": "structure",
  "/architecture/ddd/": "structure",
  "/architecture/patterns/": "structure",
  "/tutorials/": "structure",
  "/tutorials/projects/spring-ai-rag/": "structure",
  "/tutorials/projects/oauth2/": "structure",
  "/tutorials/projects/performance/": "structure",
  "/tutorials/projects/delayed-tasks/": "structure",
  "/tutorials/tools/maven/": "structure",
  "/tutorials/tools/network/": "structure",
  "/tutorials/tools/debugging/": "structure",
  "/resources/tools/": "structure",
  "/resources/collections/": "structure",
  "/blog/": "structure",

});
