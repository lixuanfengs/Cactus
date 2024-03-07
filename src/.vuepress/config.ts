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
import { shikiPlugin } from "@vuepress/plugin-shiki";


export default defineUserConfig({
  //dest: "./dev-ops/nginx/html", // 自定义博客构建后，静态文件输出的路径
  base: "/",
  lang: "zh-CN",
  head: [["meta", { name: "referrer", content: "no-referrer-when-downgrade" }]],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Cactus's Blog",
      description: "仙人球的博客",
    },
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
      }
    },
    // vuePluginOptions: {},
  }),
  plugins: [
    // 代码高亮
    shikiPlugin({
      theme: "one-dark-pro",
    }),
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
