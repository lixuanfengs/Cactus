import{_ as t,c as a,f as n,o}from"./app-RizwwZaB.js";const i={};function p(r,e){return o(),a("div",null,e[0]||(e[0]=[n(`<blockquote><p>Java I/O 使用了装饰者模式来实现。</p></blockquote><h2 id="装饰者模式" tabindex="-1"><a class="header-anchor" href="#装饰者模式"><span><a href="#%E8%A3%85%E9%A5%B0%E8%80%85%E6%A8%A1%E5%BC%8F">#</a> 装饰者模式</span></a></h2><p>请参考<a href="">装饰者模式详解</a></p><p>装饰者(Decorator)和具体组件(ConcreteComponent)都继承自组件(Component)，具体组件的方法实现不需要依赖于其它对象，而装饰者组合了一个组件，这样它可以装饰其它装饰者或者具体组件。所谓装饰，就是把这个装饰者套在被装饰者之上，从而动态扩展被装饰者的功能。装饰者的方法有一部分是自己的，这属于它的功能，然后调用被装饰者的方法实现，从而也保留了被装饰者的功能。可以看到，具体组件应当是装饰层次的最低层，因为只有具体组件的方法实现不需要依赖于其它对象。</p><figure><img src="https://lixuanfengs.github.io/blog-images/vp/Java/137c593d-0a9e-47b8-a9e6-b71f540b82dd.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="io-装饰者模式" tabindex="-1"><a class="header-anchor" href="#io-装饰者模式"><span><a href="#io-%E8%A3%85%E9%A5%B0%E8%80%85%E6%A8%A1%E5%BC%8F">#</a> IO 装饰者模式</span></a></h2><p>以 InputStream 为例，</p><ul><li>InputStream 是抽象组件；</li><li>FileInputStream 是 InputStream 的子类，属于具体组件，提供了字节流的输入操作；</li><li>FilterInputStream 属于抽象装饰者，装饰者用于装饰组件，为组件提供额外的功能。例如 BufferedInputStream 为 FileInputStream 提供缓存的功能。</li></ul><figure><img src="https://lixuanfengs.github.io/blog-images/vp/Java/ioNio.png" alt="ioNio" tabindex="0" loading="lazy"><figcaption>ioNio</figcaption></figure><p>实例化一个具有缓存功能的字节流对象时，只需要在 FileInputStream 对象上再套一层 BufferedInputStream 对象即可。</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E5C07B;">FileInputStream</span><span style="color:#E06C75;"> fileInputStream </span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;"> new</span><span style="color:#61AFEF;"> FileInputStream</span><span style="color:#E06C75;">(filePath)</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E5C07B;">BufferedInputStream</span><span style="color:#E06C75;"> bufferedInputStream </span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;"> new</span><span style="color:#61AFEF;"> BufferedInputStream</span><span style="color:#E06C75;">(fileInputStream)</span><span style="color:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>DataInputStream 装饰者提供了对更多数据类型进行输入的操作，比如 int、double 等基本类型。</p>`,12)]))}const s=t(i,[["render",p],["__file","IO 设计模式(装饰者模式).html.vue"]]),c=JSON.parse(`{"path":"/posts/Java/IO-NIO-AIO/IO%20%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F(%E8%A3%85%E9%A5%B0%E8%80%85%E6%A8%A1%E5%BC%8F).html","title":"IO 设计模式(装饰者模式)","lang":"zh-CN","frontmatter":{"title":"IO 设计模式(装饰者模式)","subtitle":"Java，Java开发，Java 体系","date":"2024-03-11T14:36:26.000Z","category":["Java"],"tag":["Java","IO"],"order":3,"description":"Java I/O 使用了装饰者模式来实现。 # 装饰者模式 请参考装饰者模式详解 装饰者(Decorator)和具体组件(ConcreteComponent)都继承自组件(Component)，具体组件的方法实现不需要依赖于其它对象，而装饰者组合了一个组件，这样它可以装饰其它装饰者或者具体组件。所谓装饰，就是把这个装饰者套在被装饰者之上，从而动态扩展被...","head":[["meta",{"property":"og:url","content":"https://cactusli.net/posts/Java/IO-NIO-AIO/IO%20%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F(%E8%A3%85%E9%A5%B0%E8%80%85%E6%A8%A1%E5%BC%8F).html"}],["meta",{"property":"og:site_name","content":"Cactus's Blog"}],["meta",{"property":"og:title","content":"IO 设计模式(装饰者模式)"}],["meta",{"property":"og:description","content":"Java I/O 使用了装饰者模式来实现。 # 装饰者模式 请参考装饰者模式详解 装饰者(Decorator)和具体组件(ConcreteComponent)都继承自组件(Component)，具体组件的方法实现不需要依赖于其它对象，而装饰者组合了一个组件，这样它可以装饰其它装饰者或者具体组件。所谓装饰，就是把这个装饰者套在被装饰者之上，从而动态扩展被..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://lixuanfengs.github.io/blog-images/vp/Java/137c593d-0a9e-47b8-a9e6-b71f540b82dd.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-17T09:29:14.000Z"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"IO"}],["meta",{"property":"article:published_time","content":"2024-03-11T14:36:26.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-17T09:29:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"IO 设计模式(装饰者模式)\\",\\"image\\":[\\"https://lixuanfengs.github.io/blog-images/vp/Java/137c593d-0a9e-47b8-a9e6-b71f540b82dd.png\\",\\"https://lixuanfengs.github.io/blog-images/vp/Java/ioNio.png\\"],\\"datePublished\\":\\"2024-03-11T14:36:26.000Z\\",\\"dateModified\\":\\"2024-03-17T09:29:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Cactus li\\",\\"url\\":\\"https://cactusli.net\\"}]}"]]},"headers":[{"level":2,"title":"# 装饰者模式","slug":"装饰者模式","link":"#装饰者模式","children":[]},{"level":2,"title":"# IO 装饰者模式","slug":"io-装饰者模式","link":"#io-装饰者模式","children":[]}],"git":{"createdTime":1710139794000,"updatedTime":1710667754000,"contributors":[{"name":"lixuanfengs","email":"1183895890@qq.com","commits":2}]},"readingTime":{"minutes":1.42,"words":425},"filePathRelative":"posts/Java/IO-NIO-AIO/IO 设计模式(装饰者模式).md","localizedDate":"2024年3月11日","excerpt":"<blockquote>\\n<p>Java I/O 使用了装饰者模式来实现。</p>\\n</blockquote>\\n<h2><a class=\\"header-anchor\\" href=\\"#装饰者模式\\"><span></span></a><a href=\\"#%E8%A3%85%E9%A5%B0%E8%80%85%E6%A8%A1%E5%BC%8F\\">#</a> 装饰者模式</h2>\\n<p>请参考<a href=\\"\\">装饰者模式详解</a></p>\\n<p>装饰者(Decorator)和具体组件(ConcreteComponent)都继承自组件(Component)，具体组件的方法实现不需要依赖于其它对象，而装饰者组合了一个组件，这样它可以装饰其它装饰者或者具体组件。所谓装饰，就是把这个装饰者套在被装饰者之上，从而动态扩展被装饰者的功能。装饰者的方法有一部分是自己的，这属于它的功能，然后调用被装饰者的方法实现，从而也保留了被装饰者的功能。可以看到，具体组件应当是装饰层次的最低层，因为只有具体组件的方法实现不需要依赖于其它对象。</p>","autoDesc":true}`);export{s as comp,c as data};
