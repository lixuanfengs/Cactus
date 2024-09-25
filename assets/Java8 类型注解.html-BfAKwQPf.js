import{_ as s,c as e,f as l,o as n}from"./app-RizwwZaB.js";const o={};function t(r,a){return n(),e("div",null,a[0]||(a[0]=[l(`<blockquote><p>理解Java 8 类型注解需理解几个问题:</p><ul><li>注解在JDK哪个版本中出现的，可以在哪些地方用注解?</li><li>什么是类型注解?</li><li>类型注解的作用是什么?</li><li>为什么会出现类型注解(JSR308)?</li></ul></blockquote><ul><li>Java8 类型注解 <ul><li><a href="#%E4%BB%80%E4%B9%88%E6%98%AF%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3">什么是类型注解</a></li><li><a href="#%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3%E7%9A%84%E4%BD%9C%E7%94%A8">类型注解的作用</a></li><li><a href="#%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3%E5%90%91%E4%B8%8B%E5%85%BC%E5%AE%B9%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88">类型注解向下兼容的解决方案</a></li><li><a href="#%E5%85%B3%E4%BA%8Ejsr-308">关于JSR 308</a></li><li><a href="#%E6%80%BB%E7%BB%93">总结</a></li></ul></li></ul><h2 id="什么是类型注解" tabindex="-1"><a class="header-anchor" href="#什么是类型注解"><span><a href="#%E4%BB%80%E4%B9%88%E6%98%AF%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3">#</a> 什么是类型注解</span></a></h2><blockquote><p>注解大家都知道，从java5开始加入这一特性，发展到现在已然是遍地开花，在很多框架中得到了广泛的使用，用来简化程序中的配置。那充满争议的类型注解究竟是什么? 复杂还是便捷?</p></blockquote><ol><li>在java 8之前，注解只能是在声明的地方所使用，比如类，方法，属性；</li><li>java 8里面，注解可以应用在任何地方，比如:</li></ol><p>创建类实例</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">new</span><span style="color:#E06C75;"> @</span><span style="color:#E5C07B;">Interned</span><span style="color:#61AFEF;"> MyObject</span><span style="color:#E06C75;">()</span><span style="color:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>类型映射</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">myString </span><span style="color:#56B6C2;">=</span><span style="color:#E06C75;"> (</span><span style="color:#ABB2BF;">@</span><span style="color:#E5C07B;">NonNull</span><span style="color:#E06C75;"> String) str</span><span style="color:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>implements 语句中</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">class</span><span style="color:#E5C07B;"> UnmodifiableList</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">T</span><span style="color:#ABB2BF;">&gt;</span><span style="color:#C678DD;"> implements</span><span style="color:#E06C75;"> @</span><span style="color:#E5C07B;">Readonly</span><span style="color:#E5C07B;"> List</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">@</span><span style="color:#E5C07B;">Readonly</span><span style="color:#E5C07B;"> T</span><span style="color:#ABB2BF;">&gt;</span><span style="color:#ABB2BF;"> {</span><span style="color:#E06C75;"> … </span><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>throw exception声明</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">void</span><span style="color:#61AFEF;"> monitorTemperature</span><span style="color:#E06C75;">() throws </span><span style="color:#ABB2BF;">@</span><span style="color:#E5C07B;">Critical</span><span style="color:#E06C75;"> TemperatureException { … }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>需要注意的是，<strong>类型注解只是语法而不是语义，并不会影响java的编译时间，加载时间，以及运行时间，也就是说，编译成class文件的时候并不包含类型注解</strong>。</p><h2 id="类型注解的作用" tabindex="-1"><a class="header-anchor" href="#类型注解的作用"><span><a href="#%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3%E7%9A%84%E4%BD%9C%E7%94%A8">#</a> 类型注解的作用</span></a></h2><p>先看看下面代码</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E5C07B;">Collections</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">emptyList</span><span style="color:#ABB2BF;">().</span><span style="color:#61AFEF;">add</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;One&quot;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#C678DD;">int</span><span style="color:#E06C75;"> i</span><span style="color:#56B6C2;">=</span><span style="color:#E5C07B;">Integer</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">parseInt</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;hello&quot;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">System</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">console</span><span style="color:#ABB2BF;">().</span><span style="color:#61AFEF;">readLine</span><span style="color:#ABB2BF;">();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码编译是通过的，但运行是会分别报UnsupportedOperationException； NumberFormatException；NullPointerException异常，这些都是runtime error；</p><p>类型注解被用来支持在Java的程序中做强类型检查。配合插件式的check framework，可以在编译的时候检测出runtime error，以提高代码质量。这就是类型注解的作用了。</p><p>check framework是第三方工具，配合Java的类型注解效果就是1+1&gt;2。它可以嵌入到javac编译器里面，可以配合ant和maven使用, 地址是<a href="http://types.cs.washington.edu/checker-framework/%E3%80%82" target="_blank" rel="noopener noreferrer">http://types.cs.washington.edu/checker-framework/。</a> check framework可以找到类型注解出现的地方并检查，举个简单的例子:</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#E5C07B;"> checkers.nullness.quals.*</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">public</span><span style="color:#C678DD;"> class</span><span style="color:#E5C07B;"> GetStarted</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#C678DD;">    void</span><span style="color:#61AFEF;"> sample</span><span style="color:#ABB2BF;">()</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">        @</span><span style="color:#E5C07B;">NonNull</span><span style="color:#E5C07B;"> Object</span><span style="color:#E06C75;"> ref</span><span style="color:#56B6C2;"> =</span><span style="color:#C678DD;"> new</span><span style="color:#61AFEF;"> Object</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用javac编译上面的类</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">javac</span><span style="color:#D19A66;"> -processor</span><span style="color:#98C379;"> checkers.nullness.NullnessChecker</span><span style="color:#98C379;"> GetStarted.java</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>编译是通过，但如果修改成</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">@</span><span style="color:#E5C07B;">NonNull</span><span style="color:#E5C07B;"> Object</span><span style="color:#E06C75;"> ref </span><span style="color:#56B6C2;">=</span><span style="color:#D19A66;"> null</span><span style="color:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>再次编译，则出现</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">GetStarted.java:5:</span><span style="color:#98C379;"> incompatible</span><span style="color:#98C379;"> types.</span></span>
<span class="line"><span style="color:#61AFEF;">found</span><span style="color:#98C379;">   :</span><span style="color:#98C379;"> @Nullable</span><span style="color:#ABB2BF;"> &lt;</span><span style="color:#98C379;">nulltyp</span><span style="color:#ABB2BF;">e&gt;</span></span>
<span class="line"><span style="color:#61AFEF;">required:</span><span style="color:#98C379;"> @NonNull</span><span style="color:#98C379;"> Object</span></span>
<span class="line"><span style="color:#61AFEF;">        @NonNull</span><span style="color:#98C379;"> Object</span><span style="color:#98C379;"> ref</span><span style="color:#98C379;"> =</span><span style="color:#98C379;"> null</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#61AFEF;">                              ^</span></span>
<span class="line"><span style="color:#61AFEF;">1</span><span style="color:#98C379;"> error</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="类型注解向下兼容的解决方案" tabindex="-1"><a class="header-anchor" href="#类型注解向下兼容的解决方案"><span><a href="#%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3%E5%90%91%E4%B8%8B%E5%85%BC%E5%AE%B9%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88">#</a> 类型注解向下兼容的解决方案</span></a></h2><p>如果你不想使用类型注解检测出来错误，则不需要processor，直接javac GetStarted.java是可以编译通过的，这是在java 8 with Type Annotation Support版本里面可以，但java 5,6,7版本都不行，因为javac编译器不知道@NonNull是什么东西，但check framework 有个向下兼容的解决方案，就是将类型注解nonnull用/**/注释起来，比如上面例子修改为</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#E5C07B;"> checkers.nullness.quals.*</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">public</span><span style="color:#C678DD;"> class</span><span style="color:#E5C07B;"> GetStarted</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#C678DD;">    void</span><span style="color:#61AFEF;"> sample</span><span style="color:#ABB2BF;">()</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        /*@NonNull*/</span><span style="color:#E5C07B;"> Object</span><span style="color:#E06C75;"> ref</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> null</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样javac编译器就会忽略掉注释块，但用check framework里面的javac编译器同样能够检测出nonnull错误。 通过类型注解+check framework我们可以看到，现在runtime error可以在编译时候就能找到。</p><h2 id="关于jsr-308" tabindex="-1"><a class="header-anchor" href="#关于jsr-308"><span><a href="#%E5%85%B3%E4%BA%8Ejsr-308">#</a> 关于JSR 308</span></a></h2><p>JSR 308想要解决在Java 1.5注解中出现的两个问题:</p><ul><li>在句法上对注解的限制: 只能把注解写在声明的地方</li><li>类型系统在语义上的限制: 类型系统还做不到预防所有的bug</li></ul><p>JSR 308 通过如下方法解决上述两个问题:</p><ul><li>对Java语言的句法进行扩充，允许注解出现在更多的位置上。包括: 方法接收器(method receivers，译注: 例public int size() @Readonly { … })，泛型参数，数组，类型转换，类型测试，对象创建，类型参数绑定，类继承和throws子句。其实就是类型注解，现在是java 8的一个特性</li><li>通过引入可插拔的类型系统(pluggable type systems)能够创建功能更强大的注解处理器。类型检查器对带有类型限定注解的源码进行分析，一旦发现不匹配等错误之处就会产生警告信息。其实就是check framework</li></ul><p>对JSR308，有人反对，觉得更复杂更静态了，比如</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">@</span><span style="color:#E5C07B;">NotEmpty</span><span style="color:#E5C07B;"> List</span><span style="color:#56B6C2;">&lt;</span><span style="color:#ABB2BF;">@</span><span style="color:#E5C07B;">NonNull</span><span style="color:#E06C75;"> String</span><span style="color:#56B6C2;">&gt;</span><span style="color:#E06C75;"> strings </span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;"> new</span><span style="color:#E5C07B;"> ArrayList</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">@</span><span style="color:#E5C07B;">NonNull</span><span style="color:#E5C07B;"> String</span><span style="color:#ABB2BF;">&gt;</span><span style="color:#E06C75;">()&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>换成动态语言为</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#E06C75;"> strings </span><span style="color:#56B6C2;">=</span><span style="color:#E06C75;"> [</span><span style="color:#98C379;">&quot;one&quot;</span><span style="color:#ABB2BF;">,</span><span style="color:#98C379;"> &quot;two&quot;</span><span style="color:#E06C75;">]</span><span style="color:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>有人赞成，说到底，代码才是“最根本”的文档。代码中包含的注解清楚表明了代码编写者的意图。当没有及时更新或者有遗漏的时候，恰恰是注解中包含的意图信息，最容易在其他文档中被丢失。而且将运行时的错误转到编译阶段，不但可以加速开发进程，还可以节省测试时检查bug的时间。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span><a href="#%E6%80%BB%E7%BB%93">#</a> 总结</span></a></h2><p>并不是人人都喜欢这个特性，特别是动态语言比较流行的今天，所幸，java 8并不强求大家使用这个特性，反对的人可以不使用这一特性，而对代码质量有些要求比较高的人或公司可以采用JSR 308，毕竟代码才是“最基本”的文档，这句话我是赞同的。虽然代码会增多，但可以使你的代码更具有表达意义。对这个特性有何看法，大家各抒己见。。。</p>`,43)]))}const i=s(o,[["render",t],["__file","Java8 类型注解.html.vue"]]),c=JSON.parse(`{"path":"/posts/Java/Java8NewFeatures/Java8%20%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3.html","title":"Java8 类型注解","lang":"zh-CN","frontmatter":{"title":"Java8 类型注解","subtitle":"Java，Java开发，Java 体系","date":"2024-03-17T15:06:55.000Z","category":["Java"],"tag":["Java","Java8 新特性"],"order":5,"description":"理解Java 8 类型注解需理解几个问题: 注解在JDK哪个版本中出现的，可以在哪些地方用注解? 什么是类型注解? 类型注解的作用是什么? 为什么会出现类型注解(JSR308)? Java8 类型注解 什么是类型注解 类型注解的作用 类型注解向下兼容的解决方案 关于JSR 308 总结 # 什么是类型注解 注解大家都知道，从java5开始加入这一特性，...","head":[["meta",{"property":"og:url","content":"https://cactusli.net/posts/Java/Java8NewFeatures/Java8%20%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3.html"}],["meta",{"property":"og:site_name","content":"Cactus's Blog"}],["meta",{"property":"og:title","content":"Java8 类型注解"}],["meta",{"property":"og:description","content":"理解Java 8 类型注解需理解几个问题: 注解在JDK哪个版本中出现的，可以在哪些地方用注解? 什么是类型注解? 类型注解的作用是什么? 为什么会出现类型注解(JSR308)? Java8 类型注解 什么是类型注解 类型注解的作用 类型注解向下兼容的解决方案 关于JSR 308 总结 # 什么是类型注解 注解大家都知道，从java5开始加入这一特性，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-21T03:29:54.000Z"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Java8 新特性"}],["meta",{"property":"article:published_time","content":"2024-03-17T15:06:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-21T03:29:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java8 类型注解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-17T15:06:55.000Z\\",\\"dateModified\\":\\"2024-03-21T03:29:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Cactus li\\",\\"url\\":\\"https://cactusli.net\\"}]}"]]},"headers":[{"level":2,"title":"# 什么是类型注解","slug":"什么是类型注解","link":"#什么是类型注解","children":[]},{"level":2,"title":"# 类型注解的作用","slug":"类型注解的作用","link":"#类型注解的作用","children":[]},{"level":2,"title":"# 类型注解向下兼容的解决方案","slug":"类型注解向下兼容的解决方案","link":"#类型注解向下兼容的解决方案","children":[]},{"level":2,"title":"# 关于JSR 308","slug":"关于jsr-308","link":"#关于jsr-308","children":[]},{"level":2,"title":"# 总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1710139794000,"updatedTime":1710991794000,"contributors":[{"name":"lixuanfengs","email":"1183895890@qq.com","commits":2}]},"readingTime":{"minutes":4.78,"words":1433},"filePathRelative":"posts/Java/Java8NewFeatures/Java8 类型注解.md","localizedDate":"2024年3月17日","excerpt":"<blockquote>\\n<p>理解Java 8 类型注解需理解几个问题:</p>\\n<ul>\\n<li>注解在JDK哪个版本中出现的，可以在哪些地方用注解?</li>\\n<li>什么是类型注解?</li>\\n<li>类型注解的作用是什么?</li>\\n<li>为什么会出现类型注解(JSR308)?</li>\\n</ul>\\n</blockquote>\\n<ul>\\n<li>Java8 类型注解\\n<ul>\\n<li><a href=\\"#%E4%BB%80%E4%B9%88%E6%98%AF%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3\\">什么是类型注解</a></li>\\n<li><a href=\\"#%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3%E7%9A%84%E4%BD%9C%E7%94%A8\\">类型注解的作用</a></li>\\n<li><a href=\\"#%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3%E5%90%91%E4%B8%8B%E5%85%BC%E5%AE%B9%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88\\">类型注解向下兼容的解决方案</a></li>\\n<li><a href=\\"#%E5%85%B3%E4%BA%8Ejsr-308\\">关于JSR 308</a></li>\\n<li><a href=\\"#%E6%80%BB%E7%BB%93\\">总结</a></li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}`);export{i as comp,c as data};
