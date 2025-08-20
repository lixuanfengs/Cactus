# AI-MCP-CactusLi 自动发帖系统

## 📖 项目简介

AI-MCP-CactusLi 是一个基于 Spring AI MCP（Model Context Protocol）框架构建的智能自动发帖系统。该系统通过 AI 驱动的工作流，自动生成技术文章并发布到 CSDN 平台，同时支持微信公众号消息通知功能。

## 🏗️ 项目架构

```
ai-mcp-cactusli/
├── ai-mcp-cactusli-app/          # 主应用模块
├── ai-mcp-cactusli-trigger/      # 定时任务触发器模块
├── mcp-server-compute/           # 计算服务 MCP 服务器
├── mcp-server-csdn/              # CSDN 发帖 MCP 服务器
├── mcp-server-weixin/            # 微信通知 MCP 服务器
├── docs/                         # 项目文档
├── data/                         # 数据目录
└── pom.xml                       # Maven 父项目配置
```

## 🚀 核心功能

### 1. 智能文章生成
- 基于 Spring AI 和 OpenAI GPT-4 模型
- 自动生成 Java 技术面试相关文章
- 支持多种业务场景和技术栈覆盖
- 文章内容包含面试对话和详细答案解析

### 2. 自动发布系统
- 自动发布文章到 CSDN 平台
- 支持文章分类和标签管理
- 获取发布后的文章 URL

### 3. 微信公众号通知
- 发布成功后自动发送微信公众号通知
- 包含文章标题、描述和跳转链接
- 支持模板消息推送

### 4. 定时任务调度
- 支持 Cron 表达式配置定时任务
- 智能时间段控制（8:00-23:00）
- 异常处理和日志记录

## 🛠️ 技术栈

- **框架**: Spring Boot 3.4.6, Spring AI 1.0.0
- **语言**: Java 17
- **数据库**: PostgreSQL
- **缓存**: Redis
- **构建工具**: Maven
- **容器化**: Docker, Docker Compose
- **AI 模型**: OpenAI GPT-4, Ollama
- **HTTP 客户端**: Retrofit2
- **其他**: Lombok, FastJSON, Guava

## 📋 环境要求

- Java 17+
- Maven 3.6+
- Docker & Docker Compose
- Node.js (用于 MCP 服务)
- PostgreSQL 数据库
- Redis 缓存

## 🔧 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/your-repo/ai-mcp-cactusli.git
cd ai-mcp-cactusli
```

### 2. 配置环境
复制并修改配置文件：
```bash
cp ai-mcp-cactusli-app/src/main/resources/application-dev.yml.example application-dev.yml
```

### 3. 配置 MCP 服务
编辑 `ai-mcp-cactusli-app/src/main/resources/config/mcp-servers-config.json`：
```json
{
  "mcpServers": {
    "mcp-server-csdn": {
      "command": "java",
      "args": [
        "-Dspring.ai.mcp.server.stdio=true",
        "-jar",
        "path/to/mcp-server-csdn-1.0.0.jar",
        "--csdn.api.cookie=your-csdn-cookie"
      ]
    }
  }
}
```

### 4. 构建项目
```bash
mvn clean install
```

### 5. 启动服务
```bash
# 启动环境依赖
docker-compose -f docs/tag/docker-compose-environment.yml up -d

# 启动应用
docker-compose -f docs/tag/docker-compose-app-v1.0.yml up -d
```

## ⚙️ 配置说明

### 主要配置项

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `spring.ai.openai.api-key` | OpenAI API 密钥 | `sk-xxx` |
| `spring.ai.openai.base-url` | OpenAI API 地址 | `https://api.openai.com/` |
| `spring.datasource.url` | 数据库连接地址 | `jdbc:postgresql://localhost:5432/ai-rag-cactusli` |
| `csdn.api.cookie` | CSDN 登录 Cookie | `your-csdn-cookie` |
| `weixin.appid` | 微信公众号 AppID | `wx123456789` |

### 定时任务配置
在 `MCPServerCSDNJob` 中修改 Cron 表达式：
```java
@Scheduled(cron = "0 0 * * * ?") // 每小时执行一次
```

## 📚 使用指南

### 1. CSDN Cookie 获取
1. 登录 CSDN 网站
2. 打开浏览器开发者工具
3. 在 Network 标签页找到请求头中的 Cookie
4. 复制完整的 Cookie 值到配置文件

### 2. 微信公众号配置
1. 在微信公众平台获取 AppID 和 AppSecret
2. 配置模板消息 ID
3. 设置接收用户的 OpenID

### 3. 文章生成配置
系统支持以下技术栈的文章生成：
- Java SE/EE, Spring Boot, Spring Cloud
- 数据库技术：MySQL, PostgreSQL, Redis
- 微服务架构：Kubernetes, Docker
- AI 技术：Spring AI, RAG, 向量数据库

## 🐳 Docker 部署

### 1. 构建镜像
```bash
cd ai-mcp-cactusli-app
./build.sh
```

### 2. 推送镜像
```bash
./push.sh
```

### 3. 部署服务
```bash
# 部署环境依赖
docker-compose -f docker-compose-environment.yml up -d

# 部署应用
docker-compose -f docker-compose-app-v1.0.yml up -d
```

## 📊 监控和日志

### 日志文件位置
- 应用日志：`data/log/ai-mcp-cactusli.log`
- CSDN 服务日志：`data/log/mcp-server-csdn.log`
- 微信服务日志：`data/log/mcp-server-weixin.log`

### 健康检查
```bash
# 检查应用状态
curl http://localhost:8090/actuator/health

# 检查 MCP 服务状态
docker logs ai-mcp-cactusli-app
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者

**仙人球⁶ᴳ** - [GitHub](https://github.com/lixuanfengs)

## 🙏 致谢

- [Spring AI](https://spring.io/projects/spring-ai) - AI 应用开发框架
- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP 协议规范
- [OpenAI](https://openai.com/) - AI 模型服务

## 📞 支持

如果您在使用过程中遇到问题，请：
1. 查看 [文档](docs/md/) 目录下的详细文档
2. 提交 [Issue](https://github.com/your-repo/ai-mcp-cactusli/issues)
3. 联系作者获取技术支持

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
