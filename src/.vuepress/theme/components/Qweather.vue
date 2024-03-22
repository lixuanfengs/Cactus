<template>
    <!-- 定义一个容器，用于展示天气插件 -->
    <div id="he-plugin-simple">
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';


onMounted(() => {
    // 当组件挂载完成后执行以下代码

    // 创建一个script标签用于配置天气插件
    const configScript = document.createElement('script');
    // 设置配置项
    configScript.textContent = `
    window.WIDGET = {
      "CONFIG": {
        "modules": "0124", // 模块配置,控制显示哪些信息
        "background": "5", // 背景设置
        "tmpColor": "2c3e50", // 温度颜色
        "tmpSize": "16", // 温度大小
        "cityColor": "2c3e50", // 城市颜色
        "citySize": "16", // 城市大小
        "aqiColor": "2c3e50", // 空气质量指数颜色
        "aqiSize": "16", // 空气质量指数大小
        "weatherIconSize": "24", // 天气图标大小
        "alertIconSize": "18", // 警告图标大小
        "padding": "10px 10px 10px 10px", // 内边距
        "shadow": "0", // 阴影设置
        "language": "auto", // 语言设置,自动根据浏览器语言选择
        "borderRadius": "10", // 边框圆角
        "fixed": "false", // 是否固定位置
        "vertical": "top", // 垂直位置
        "horizontal": "left", // 水平位置
        "city": "CN101010100",
        "key": "54d86839346a44d798848862ff846ad1"
      }
    }
  `;
    // 将配置脚本添加到body中
    document.body.appendChild(configScript);

    // 创建另一个script标签用于加载天气插件的JS文件
    const script = document.createElement('script');
    script.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0';
    script.onload = () => {

    };
    // 将脚本添加到body中
    document.body.appendChild(script);
});

onUnmounted(() => {
    // 组件卸载时执行清理工作，例如移除之前添加的script标签等
});
</script>