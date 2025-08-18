import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import viteBundler from "@vuepress/bundler-vite";
import { popperPlugin } from "./plugins/vuepress-plugin-popper";
import { PopperShape } from "@moefy-canvas/theme-popper";
import {
  canvasPlugin,
  CanvasPluginType,
} from "./plugins/vuepress-plugin-canvas";
import { gradientCoverPlugin } from "./plugins/vuepress-plugin-gradient-cover";
import { hitokotoPlugin } from "./plugins/vuepress-plugin-hitokoto";
import { getDirname, path } from "vuepress/utils";
import {copyrightPlugin} from "@vuepress/plugin-copyright";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  //dest: "./dev-ops/nginx/html", // 自定义博客构建后，静态文件输出的路径
  base: "/",
  lang: "zh-CN",
  head: [["meta", { name: "referrer", content: "no-referrer-when-downgrade" }]],
  
  // 开发优化
  cache: ".vuepress/.cache", // 启用缓存
  debug: process.env.NODE_ENV === 'development',
  
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Cactus's Blog",
      description: "仙人球的博客",
    },
  },

  alias: {
    "@MyLink": path.resolve(__dirname, "./components/Mylink.vue"),
    "@MyCoverLink": path.resolve(__dirname, "./components/MyCoverLink.vue"),
    "@Design": path.resolve(__dirname, "./data/design.ts"),
    "@Api": path.resolve(__dirname, "./data/api.ts"),
  },

  theme,

  bundler: viteBundler({
    viteOptions: {
      server: {
        proxy: {
          "/bing": {
            target: "https://cn.bing.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/bing/, ""),
          },
        },
      },
      // 开发环境优化
      optimizeDeps: {
        include: [
          "vue",
          "vue-router"
        ],
        exclude: [
          "vuepress-theme-hope",
          "@vuepress/client",
          "@vuepress/theme-default",
          "echarts",
          "mermaid",
          "reveal.js",
          "chart.js"
        ]
      },
      build: {
        // 减少构建时的内存占用
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          output: {
            // 移除 manualChunks 配置，因为这些库在 VuePress 中被视为外部模块
            // 让 Vite 自动处理代码分割
          }
        }
      }
    },
    // vuePluginOptions: {},
  }),
  plugins: [
    // 一言插件
    hitokotoPlugin({}),
    // 鼠标特效插件
    popperPlugin({
      config: {
        shape: PopperShape.Star,
        size: 1.95,
        numParticles: 8,
      },
    }),
    // 背景插件
    canvasPlugin({
      type: CanvasPluginType.Figure,
      ribbonOption: {
        zIndex: 1,
        alpha: 0.8,
        size: 90,
      },
    }),
    // 遮罩插件
    gradientCoverPlugin({}),
  ],
  // Enable it with pwa
  shouldPrefetch: false,
});
