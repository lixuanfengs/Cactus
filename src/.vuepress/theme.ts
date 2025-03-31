import {MyTheme} from "./theme/index";
import {zhNavbar} from "./navbar/index.js";
import {zhSidebar} from "./sidebar/index.js";

export default MyTheme({
    // 开启热重载
    hotReload: true,
    // 启用主题颜色切换功能
    themeColor: true,
    // 全屏功能开关
    fullscreen: true,
    // 网站的主机名，用于 SEO 和一些社交分享功能
    hostname: "https://cactusli.net",
    // 作者信息配置
    author: {
        name: "Cactus li",
        url: "https://cactusli.net",
    },

    // 网站 logo 配置
    logo: "/logo.svg",
    // 项目仓库地址，用于在页面上显示“在 GitHub 上编辑此页”链接
    repo: "lixuanfengs/Cactus",
    // 文档所在目录
    docsDir: "src",
    // 导航栏布局配置
    navbarLayout: {
        start: ["Brand"],
        // start: ["Qweather"],
        center: ["Links"],
        end: ["Language", "Repo", "Wormhole", "Travelling", "Outlook", "Search"],
    },

    blog: {
        medias: {
            // Baidu: "https://example.com",
            // BiliBili: "https://example.com",
            // Bitbucket: "https://example.com",
            // Dingding: "https://example.com",
            // Discord: "https://example.com",
            // Dribbble: "https://example.com",
            Email: "mailto:1183895890@qq.com",
            // Evernote: "https://example.com",
            // Facebook: "https://example.com",
            // Flipboard: "https://example.com",
            Gitee: "https://gitee.com/cactusllx",
            GitHub: "https://github.com/lixuanfengs",
            // Gitlab: "https://example.com",
            Gmail: "mailto:lixf19970809@gmail.com",
            // Instagram: "https://example.com",
            // Lark: "https://example.com",
            // Lines: "https://example.com",
            // Linkedin: "https://example.com",
            // Pinterest: "https://example.com",
            // Pocket: "https://example.com",
            // QQ: "https://example.com",
            // Qzone: "https://example.com",
            // Reddit: "https://example.com",
            // Rss: "https://example.com",
            // Steam: "https://example.com",
            // Twitter: "https://example.com",
            // Wechat: "https://example.com",
            // Weibo: "https://example.com",
            // Whatsapp: "https://example.com",
            // Youtube: "https://example.com",
            // Zhihu: "https://example.com",
            // MrHope: ["https://mister-hope.com", MR_HOPE_AVATAR],
        },
    },
    // 多语言配置
    locales: {
        "/": {
            // navbar
            navbar: zhNavbar,

            // sidebar
            sidebar: zhSidebar,

            footer: "默认页脚",
            // 是否显示页脚
            displayFooter: false,
            // 博客描述和介绍页面路径
            blog: {
                description: "在这里，属于我自己的",
                intro: "/intro.html",
            },

            metaLocales: {
                editLink: "在 GitHub 上编辑此页",
            },
        },


        // "/zh/": {
        //   // navbar
        //   navbar: zhNavbar,
        //
        //   // sidebar
        //   sidebar: zhSidebar,
        //
        //   footer: "默认页脚",
        //
        //   displayFooter: true,
        //
        //   blog: {
        //     description: "一个后端开发者",
        //     intro: "/zh/intro.html",
        //   },
        //
        //   // page meta
        //   metaLocales: {
        //     editLink: "在 GitHub 上编辑此页",
        //   },
        // },
    },
    // 页面加密配置
    encrypt: {
        config: {
            "/demo/encrypt.html": ["cactusli"],
            "/zh/demo/encrypt.html": ["cactusli"],
            "/tutorial/系统开发部署/Linux部署cactus-vue-pro.html": "cactusli",
            "/tutorial/系统开发部署/Docker部署cactus-vue-pro.html": "cactusli",
        },
    },

    markdown: {
        alert: true,
        align: true,
        attrs: true,
        codeTabs: true,
        component: true,
        figure: true,
        gfm: true,
        imgLazyload: true,
        imgMark: true,
        imgSize: true,
        include: {
            deep: true,
            resolvePath: (file) => {
                if (file.startsWith("@components/"))
                    return file.replace(
                        "@components",
                        path.resolve(__dirname, "../../../components/src"),
                    );

                if (file.startsWith("@echarts/"))
                    return file.replace(
                        "@echarts",
                        path.resolve(__dirname, "../../../md-enhance/src/echarts"),
                    );

                if (file.startsWith("@md-enhance/"))
                    return file.replace(
                        "@md-enhance",
                        path.resolve(__dirname, "../../../md-enhance/src"),
                    );

                return file;
            },
            resolveLinkPath: false,
        },
        math: true,
        mark: true,
        revealjs: {
            plugins: ["highlight", "math", "search", "notes", "zoom"],
            themes: [
                "auto",
                "beige",
                "black",
                "blood",
                "league",
                "moon",
                "night",
                "serif",
                "simple",
                "sky",
                "solarized",
                "white",
            ],
        },
        spoiler: true,
        stylize: [
            {
                matcher: "Recommended",
                replacer: ({
                               tag,
                           }): {
                    tag: string;
                    attrs: Record<string, string>;
                    content: string;
                } | void => {
                    if (tag === "em")
                        return {
                            tag: "Badge",
                            attrs: {type: "tip"},
                            content: "Recommended",
                        };
                },
            },
        ],
        sub: true,
        sup: true,
        tabs: true,
        tasklist: true,
        vPre: true,

        highlighter: {
            type: "shiki",
            lineNumbers: 15,
            notationDiff: true,
            themes: {
                light: "one-light",
                dark: "one-dark-pro",
            },
        },

        chartjs: true,
        demo: true,
        echarts: true,
        flowchart: true,
        kotlinPlayground: true,
        markmap: true,
        mermaid: true,
        plantuml: true,
        playground: {
            presets: ["ts", "vue", "unocss"],
        },
        sandpack: true,
        vuePlayground: true,
    },


    // enable it to preview all changes in time
    // hotReload: true,
    // 插件配置
    plugins: {
        // 启用博客插件
        blog: {
            filter: ({filePathRelative, frontmatter}) => {
                // 将标记为非文章，并且是说说的加入文章采集中，以便后续筛选
                if (!frontmatter.article && frontmatter.news) return true;
                return true;
            },
            type: [
                {
                    key: "news",
                    filter: (page) => page.frontmatter.news === true,
                    layout: "News",
                    frontmatter: () => ({title: "说说"}),
                },
            ],
        },

        copyright: {
            global: true,
            author: "Cactus li",
        },

        icon: {
            assets: [
                // 图标资源，可以添加多个来源
                // 默认：
                "//at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css",
                // 自己的
                "//at.alicdn.com/t/c/font_4094073_jquxe6b57p.css",

            ],
        },

        components: {
            components: ["Badge", "VPCard"],
        },
        // uncomment these if you want a PWA
        pwa: {
            favicon: "/favicon.ico",
            cacheHTML: true,
            cachePic: true,
            appendBase: true,
            apple: {
                icon: "/assets/icon/apple-icon-152.png",
                statusBarColor: "black",
            },
            msTile: {
                image: "/assets/icon/ms-icon-144.png",
                color: "#ffffff",
            },
            manifest: {
                icons: [
                    {
                        src: "/assets/icon/chrome-mask-512.png",
                        sizes: "512x512",
                        purpose: "maskable",
                        type: "image/png",
                    },
                    {
                        src: "/assets/icon/chrome-mask-192.png",
                        sizes: "192x192",
                        purpose: "maskable",
                        type: "image/png",
                    },
                    {
                        src: "/assets/icon/chrome-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "/assets/icon/chrome-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                ],
                shortcuts: [
                    {
                        name: "Demo",
                        short_name: "Demo",
                        url: "/demo/",
                        icons: [
                            {
                                src: "/assets/icon/guide-maskable.png",
                                sizes: "192x192",
                                purpose: "maskable",
                                type: "image/png",
                            },
                        ],
                    },
                ],
            },
        },

        search: {
            // 排除首页
            isSearchable: (page) => page.path !== '/',
            maxSuggestions: 10,
        },
        git: true,
        feed: {
            rss: true,
        },
        comment: {
            provider: "Waline",
            serverURL: "https://content.199228.xyz/", // your server url
            reaction: true,
            requiredMeta: ["nick"],
            wordLimit: 300,
            emoji: [
                "https://unpkg.com/@waline/emojis@1.1.0/tieba",
                "https://unpkg.com/@waline/emojis@1.1.0/weibo",
                "https://emoji.shojo.cn/bili/webp/tv_小电视_动图",
                "https://emoji.shojo.cn/bili/webp/罗小黑战记",
                "https://emoji.shojo.cn/bili/webp/2233娘",
                "https://emoji.shojo.cn/bili/webp/装扮小姐姐梦幻冬季",
                "https://emoji.shojo.cn/bili/webp/装扮小姐姐·秋日午后",
                "https://emoji.shojo.cn/bili/webp/星尘",
                "https://emoji.shojo.cn/bili/webp/池年"
            ],
            locales: {
                "/": {
                    placeholder:
                        "欢迎留言~ _(≧∇≦」∠)_ (填写常用邮箱即可快速收到回复通知~)",
                },
            },
        },
    },

});
