import{_ as s,c as l,f as a,o as i}from"./app-RizwwZaB.js";const o={};function t(r,e){return i(),l("div",null,e[0]||(e[0]=[a(`<h2 id="docker-slim" tabindex="-1"><a class="header-anchor" href="#docker-slim"><span>Docker-Slim</span></a></h2><p>Docker-Slim 不会更改 Docker 容器映像中的任何内容并将其缩小多达 30 倍。 Docker-Slim 将通过使用各种分析技术了解您的应用程序及其需求来优化和保护您的容器。它会丢弃你不需要的东西,减少容器的攻击面。</p><p>Github：<a href="https://github.com/slimtoolkit/slim" target="_blank" rel="noopener noreferrer">Docker-Slim</a></p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><h3 id="手动安装" tabindex="-1"><a class="header-anchor" href="#手动安装"><span>手动安装</span></a></h3><ol><li>下载对应平台的包。 <ul><li><a href="https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac.zip" target="_blank" rel="noopener noreferrer">Latest Mac binaries</a> (<code>curl -L -o ds.zip https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac.zip</code>)</li><li><a href="https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac_m1.zip" target="_blank" rel="noopener noreferrer">Latest Mac M1 binaries</a> (<code>curl -L -o ds.zip https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac_m1.zip)</code>)</li><li><a href="https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux.tar.gz" target="_blank" rel="noopener noreferrer">Latest Linux binaries</a> (<code>curl -L -o ds.tar.gz https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux.tar.gz</code>)</li><li><a href="https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm.tar.gz" target="_blank" rel="noopener noreferrer">Latest Linux ARM binaries</a> (<code>curl -L -o ds.tar.gz https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm.tar.gz</code>)</li><li><a href="https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm64.tar.gz" target="_blank" rel="noopener noreferrer">Latest Linux ARM64 binaries</a> (<code>curl -L -o ds.tar.gz https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm64.tar.gz</code>)</li></ul></li><li>解压缩包，并选择性的将其移动到 bin 目录。</li></ol><p><strong>Linux：dist_linux</strong></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">tar</span><span style="color:#D19A66;"> -xvf</span><span style="color:#98C379;"> dist_linux.tar.gz</span></span>
<span class="line"><span style="color:#61AFEF;">mv</span><span style="color:#98C379;">  dist_linux/docker-slim</span><span style="color:#98C379;"> /usr/local/bin/</span></span>
<span class="line"><span style="color:#61AFEF;">mv</span><span style="color:#98C379;">  dist_linux/slim-sensor</span><span style="color:#98C379;"> /usr/local/bin/</span></span>
<span class="line"><span style="color:#61AFEF;">mv</span><span style="color:#98C379;">  dist_linux/slim</span><span style="color:#98C379;"> /usr/local/bin/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>苹果Mac：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">unzip</span><span style="color:#98C379;"> ds.zip</span></span>
<span class="line"><span style="color:#61AFEF;">mv</span><span style="color:#98C379;">  dist_mac/docker-slim</span><span style="color:#98C379;"> /usr/local/bin/</span></span>
<span class="line"><span style="color:#61AFEF;">mv</span><span style="color:#98C379;">  dist_mac/docker-slim-sensor</span><span style="color:#98C379;"> /usr/local/bin/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>将解压缩包的位置添加到 PATH 环境变量中(可选)。</li></ol><blockquote><p>如果提取二进制文件的目录不在 PATH 中，则需要从该目录运行 Slim 应用二进制文件。</p></blockquote><h3 id="脚本安装" tabindex="-1"><a class="header-anchor" href="#脚本安装"><span>脚本安装</span></a></h3><h4 id="脚本" tabindex="-1"><a class="header-anchor" href="#脚本"><span>脚本</span></a></h4><p>你可以使用此脚本在Linux（x86和ARM）和macOS（x86和Apple Silicon）上安装当前版本的Slim。</p><div class="language-ruby line-numbers-mode" data-highlighter="shiki" data-ext="ruby" data-title="ruby" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">curl </span><span style="color:#56B6C2;">-</span><span style="color:#ABB2BF;">sL </span><span style="color:#56B6C2;">https</span><span style="color:#D19A66;">:</span><span style="color:#E06C75;">//</span><span style="color:#ABB2BF;">raw.githubusercontent.com</span><span style="color:#56B6C2;">/</span><span style="color:#ABB2BF;">slimtoolkit</span><span style="color:#56B6C2;">/</span><span style="color:#ABB2BF;">slim</span><span style="color:#56B6C2;">/</span><span style="color:#ABB2BF;">master</span><span style="color:#56B6C2;">/</span><span style="color:#ABB2BF;">scripts</span><span style="color:#56B6C2;">/</span><span style="color:#ABB2BF;">install</span><span style="color:#56B6C2;">-</span><span style="color:#ABB2BF;">slim.sh | sudo </span><span style="color:#56B6C2;">-</span><span style="color:#E5C07B;">E</span><span style="color:#ABB2BF;"> bash </span><span style="color:#56B6C2;">-</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="mac" tabindex="-1"><a class="header-anchor" href="#mac"><span>Mac：</span></a></h4><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">brew</span><span style="color:#98C379;"> install</span><span style="color:#98C379;"> docker-slim</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="docker" tabindex="-1"><a class="header-anchor" href="#docker"><span>Docker:</span></a></h4><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">docker</span><span style="color:#98C379;"> pull</span><span style="color:#98C379;"> dslim/slim</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用"><span>如何使用</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">docker</span><span style="color:#98C379;"> images</span><span style="color:#ABB2BF;"> | </span><span style="color:#61AFEF;">grep</span><span style="color:#98C379;"> offline</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://lixuanfengs.github.io/blog-images/vp/web/image-20240925111156650.png" alt="image-20240925111156650" tabindex="0" loading="lazy"><figcaption>image-20240925111156650</figcaption></figure><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">docker-slim</span><span style="color:#98C379;"> build</span><span style="color:#D19A66;"> -http-probe=false</span><span style="color:#D19A66;"> --target</span><span style="color:#98C379;"> cactus-server-offline:latest</span><span style="color:#D19A66;"> --tag</span><span style="color:#98C379;"> cactus-server-offline:slim</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://lixuanfengs.github.io/blog-images/vp/web/image-20240925111948723.png" alt="image-20240925111948723" tabindex="0" loading="lazy"><figcaption>image-20240925111948723</figcaption></figure><blockquote><p><em>默认会开启http的探测(--http-probe)。我们build的时候给他关上</em></p></blockquote><p>我们看到 cactus-server-offline:lates 镜像从 596MB 减少到了 352MB，至此，本次教程就到这里了。</p>`,27)]))}const c=s(o,[["render",t],["__file","使用 Docker-Slim 压缩 Docker 镜像.html.vue"]]),p=JSON.parse(`{"path":"/linuxs/Docker/%E4%BD%BF%E7%94%A8%20Docker-Slim%20%E5%8E%8B%E7%BC%A9%20Docker%20%E9%95%9C%E5%83%8F.html","title":"使用 Docker-Slim 压缩 Docker 镜像","lang":"zh-CN","frontmatter":{"title":"使用 Docker-Slim 压缩 Docker 镜像","subtitle":"使用 Docker-Slim 压缩 Docker 镜像","date":"2024-09-25T11:15:26.000Z","category":["Docker"],"tag":["Docker"],"order":1,"description":"Docker-Slim Docker-Slim 不会更改 Docker 容器映像中的任何内容并将其缩小多达 30 倍。 Docker-Slim 将通过使用各种分析技术了解您的应用程序及其需求来优化和保护您的容器。它会丢弃你不需要的东西,减少容器的攻击面。 Github：Docker-Slim 安装 手动安装 下载对应平台的包。 Latest Mac b...","head":[["meta",{"property":"og:url","content":"https://cactusli.net/linuxs/Docker/%E4%BD%BF%E7%94%A8%20Docker-Slim%20%E5%8E%8B%E7%BC%A9%20Docker%20%E9%95%9C%E5%83%8F.html"}],["meta",{"property":"og:site_name","content":"Cactus's Blog"}],["meta",{"property":"og:title","content":"使用 Docker-Slim 压缩 Docker 镜像"}],["meta",{"property":"og:description","content":"Docker-Slim Docker-Slim 不会更改 Docker 容器映像中的任何内容并将其缩小多达 30 倍。 Docker-Slim 将通过使用各种分析技术了解您的应用程序及其需求来优化和保护您的容器。它会丢弃你不需要的东西,减少容器的攻击面。 Github：Docker-Slim 安装 手动安装 下载对应平台的包。 Latest Mac b..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://lixuanfengs.github.io/blog-images/vp/web/image-20240925111156650.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-25T03:29:18.000Z"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:published_time","content":"2024-09-25T11:15:26.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-25T03:29:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用 Docker-Slim 压缩 Docker 镜像\\",\\"image\\":[\\"https://lixuanfengs.github.io/blog-images/vp/web/image-20240925111156650.png\\",\\"https://lixuanfengs.github.io/blog-images/vp/web/image-20240925111948723.png\\"],\\"datePublished\\":\\"2024-09-25T11:15:26.000Z\\",\\"dateModified\\":\\"2024-09-25T03:29:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Cactus li\\",\\"url\\":\\"https://cactusli.net\\"}]}"]]},"headers":[{"level":2,"title":"Docker-Slim","slug":"docker-slim","link":"#docker-slim","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[{"level":3,"title":"手动安装","slug":"手动安装","link":"#手动安装","children":[]},{"level":3,"title":"脚本安装","slug":"脚本安装","link":"#脚本安装","children":[]},{"level":3,"title":"如何使用","slug":"如何使用","link":"#如何使用","children":[]}]}],"git":{"createdTime":1727234571000,"updatedTime":1727234958000,"contributors":[{"name":"lixuanfengs","email":"1183895890@qq.com","commits":2}]},"readingTime":{"minutes":1.46,"words":437},"filePathRelative":"linuxs/Docker/使用 Docker-Slim 压缩 Docker 镜像.md","localizedDate":"2024年9月25日","excerpt":"<h2>Docker-Slim</h2>\\n<p>Docker-Slim 不会更改 Docker 容器映像中的任何内容并将其缩小多达 30 倍。 Docker-Slim 将通过使用各种分析技术了解您的应用程序及其需求来优化和保护您的容器。它会丢弃你不需要的东西,减少容器的攻击面。</p>\\n<p>Github：<a href=\\"https://github.com/slimtoolkit/slim\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Docker-Slim</a></p>\\n<h2>安装</h2>\\n<h3>手动安装</h3>\\n<ol>\\n<li>下载对应平台的包。\\n<ul>\\n<li><a href=\\"https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac.zip\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Latest Mac binaries</a> (<code>curl -L -o ds.zip https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac.zip</code>)</li>\\n<li><a href=\\"https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac_m1.zip\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Latest Mac M1 binaries</a> (<code>curl -L -o ds.zip https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac_m1.zip)</code>)</li>\\n<li><a href=\\"https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux.tar.gz\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Latest Linux binaries</a> (<code>curl -L -o ds.tar.gz https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux.tar.gz</code>)</li>\\n<li><a href=\\"https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm.tar.gz\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Latest Linux ARM binaries</a> (<code>curl -L -o ds.tar.gz https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm.tar.gz</code>)</li>\\n<li><a href=\\"https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm64.tar.gz\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Latest Linux ARM64 binaries</a> (<code>curl -L -o ds.tar.gz https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm64.tar.gz</code>)</li>\\n</ul>\\n</li>\\n<li>解压缩包，并选择性的将其移动到 bin 目录。</li>\\n</ol>","autoDesc":true}`);export{c as comp,p as data};
