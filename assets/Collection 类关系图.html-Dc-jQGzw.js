import{_ as a,c as l,f as t,o as i}from"./app-RizwwZaB.js";const n={};function s(h,e){return i(),l("div",null,e[0]||(e[0]=[t('<blockquote><p>本文主要介绍JDK中Collection和Map相关知识体系，后续章节将对主要对类进行源码解读。</p></blockquote><ul><li>Collection 类关系图 <ul><li><a href="#%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84">知识体系结构</a></li></ul><!-- more --><ul><li><a href="#%E4%BB%8B%E7%BB%8D">介绍</a></li><li>Collection <ul><li>Set <ul><li><a href="#treeset">TreeSet</a></li><li><a href="#hashset">HashSet</a></li><li><a href="#linkedhashset">LinkedHashSet</a></li></ul></li><li>List <ul><li><a href="#arraylist">ArrayList</a></li><li><a href="#vector">Vector</a></li><li><a href="#linkedlist">LinkedList</a></li></ul></li><li>Queue <ul><li><a href="#linkedlist-1">LinkedList</a></li><li><a href="#priorityqueue">PriorityQueue</a></li></ul></li></ul></li><li>Map <ul><li><a href="#treemap">TreeMap</a></li><li><a href="#hashmap">HashMap</a></li><li><a href="#hashtable">HashTable</a></li><li><a href="#linkedhashmap">LinkedHashMap</a></li></ul></li><li><a href="#%E5%8F%82%E8%80%83%E5%86%85%E5%AE%B9">参考内容</a></li></ul></li></ul><h2 id="知识体系结构" tabindex="-1"><a class="header-anchor" href="#知识体系结构"><span><a href="#%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84">#</a> 知识体系结构</span></a></h2><figure><img src="https://lixuanfengs.github.io/blog-images/vp/Java/java_collections_overview.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span><a href="#%E4%BB%8B%E7%BB%8D">#</a> 介绍</span></a></h2><p>容器，就是可以容纳其他Java对象的对象。*Java Collections Framework(JCF)*为Java开发者提供了通用的容器，其始于JDK 1.2，优点是:</p><ul><li>降低编程难度</li><li>提高程序性能</li><li>提高API间的互操作性</li><li>降低学习难度</li><li>降低设计和实现相关API的难度</li><li>增加程序的重用性</li></ul><p>Java容器里只能放对象，对于基本类型(int, long, float, double等)，需要将其包装成对象类型后(Integer, Long, Float, Double等)才能放到容器里。很多时候拆包装和解包装能够自动完成。这虽然会导致额外的性能和空间开销，但简化了设计和编程。</p><h2 id="collection" tabindex="-1"><a class="header-anchor" href="#collection"><span><a href="#collection">#</a> Collection</span></a></h2><blockquote><p>容器主要包括 Collection 和 Map 两种，Collection 存储着对象的集合，而 Map 存储着键值对(两个对象)的映射表。</p></blockquote><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set"><span><a href="#set">#</a> Set</span></a></h3><h4 id="treeset" tabindex="-1"><a class="header-anchor" href="#treeset"><span><a href="#treeset">#</a> TreeSet</span></a></h4><p>基于红黑树实现，支持有序性操作，例如根据一个范围查找元素的操作。但是查找效率不如 HashSet，HashSet 查找的时间复杂度为 O(1)，TreeSet 则为 O(logN)。</p><h4 id="hashset" tabindex="-1"><a class="header-anchor" href="#hashset"><span><a href="#hashset">#</a> HashSet</span></a></h4><p>基于哈希表实现，支持快速查找，但不支持有序性操作。并且失去了元素的插入顺序信息，也就是说使用 Iterator 遍历 HashSet 得到的结果是不确定的。</p><h4 id="linkedhashset" tabindex="-1"><a class="header-anchor" href="#linkedhashset"><span><a href="#linkedhashset">#</a> LinkedHashSet</span></a></h4><p>具有 HashSet 的查找效率，且内部使用双向链表维护元素的插入顺序。</p><h3 id="list" tabindex="-1"><a class="header-anchor" href="#list"><span><a href="#list">#</a> List</span></a></h3><h4 id="arraylist" tabindex="-1"><a class="header-anchor" href="#arraylist"><span><a href="#arraylist">#</a> ArrayList</span></a></h4><p>基于动态数组实现，支持随机访问。</p><h4 id="vector" tabindex="-1"><a class="header-anchor" href="#vector"><span><a href="#vector">#</a> Vector</span></a></h4><p>和 ArrayList 类似，但它是线程安全的。</p><h4 id="linkedlist" tabindex="-1"><a class="header-anchor" href="#linkedlist"><span><a href="#linkedlist">#</a> LinkedList</span></a></h4><p>基于双向链表实现，只能顺序访问，但是可以快速地在链表中间插入和删除元素。不仅如此，LinkedList 还可以用作栈、队列和双向队列。</p><h3 id="queue" tabindex="-1"><a class="header-anchor" href="#queue"><span><a href="#queue">#</a> Queue</span></a></h3><h4 id="linkedlist-1" tabindex="-1"><a class="header-anchor" href="#linkedlist-1"><span><a href="#linkedlist-1">#</a> LinkedList</span></a></h4><p>可以用它来实现双向队列。</p><h4 id="priorityqueue" tabindex="-1"><a class="header-anchor" href="#priorityqueue"><span><a href="#priorityqueue">#</a> PriorityQueue</span></a></h4><p>基于堆结构实现，可以用它来实现优先队列。</p><h2 id="map" tabindex="-1"><a class="header-anchor" href="#map"><span><a href="#map">#</a> Map</span></a></h2><h3 id="treemap" tabindex="-1"><a class="header-anchor" href="#treemap"><span><a href="#treemap">#</a> TreeMap</span></a></h3><p>基于红黑树实现。</p><h3 id="hashmap" tabindex="-1"><a class="header-anchor" href="#hashmap"><span><a href="#hashmap">#</a> HashMap</span></a></h3><p>基于哈希表实现。</p><h3 id="hashtable" tabindex="-1"><a class="header-anchor" href="#hashtable"><span><a href="#hashtable">#</a> HashTable</span></a></h3><p>和 HashMap 类似，但它是线程安全的，这意味着同一时刻多个线程可以同时写入 HashTable 并且不会导致数据不一致。它是遗留类，不应该去使用它。现在可以使用 ConcurrentHashMap 来支持线程安全，并且 ConcurrentHashMap 的效率会更高，因为 ConcurrentHashMap 引入了分段锁。</p><h3 id="linkedhashmap" tabindex="-1"><a class="header-anchor" href="#linkedhashmap"><span><a href="#linkedhashmap">#</a> LinkedHashMap</span></a></h3><p>使用双向链表来维护元素的顺序，顺序为插入顺序或者最近最少使用(LRU)顺序。</p>',38)]))}const o=a(n,[["render",s],["__file","Collection 类关系图.html.vue"]]),p=JSON.parse(`{"path":"/posts/Java/Collection/Collection%20%E7%B1%BB%E5%85%B3%E7%B3%BB%E5%9B%BE.html","title":"Collection 类关系图","lang":"zh-CN","frontmatter":{"title":"Collection 类关系图","subtitle":"Java，Java开发，Java 体系","date":"2024-03-06T10:10:26.000Z","category":["Java"],"tag":["Java","Collection"],"sticky":true,"star":true,"order":1,"description":"本文主要介绍JDK中Collection和Map相关知识体系，后续章节将对主要对类进行源码解读。 Collection 类关系图 知识体系结构","head":[["meta",{"property":"og:url","content":"https://cactusli.net/posts/Java/Collection/Collection%20%E7%B1%BB%E5%85%B3%E7%B3%BB%E5%9B%BE.html"}],["meta",{"property":"og:site_name","content":"Cactus's Blog"}],["meta",{"property":"og:title","content":"Collection 类关系图"}],["meta",{"property":"og:description","content":"本文主要介绍JDK中Collection和Map相关知识体系，后续章节将对主要对类进行源码解读。 Collection 类关系图 知识体系结构"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://lixuanfengs.github.io/blog-images/vp/Java/java_collections_overview.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-08T03:51:56.000Z"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Collection"}],["meta",{"property":"article:published_time","content":"2024-03-06T10:10:26.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-08T03:51:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Collection 类关系图\\",\\"image\\":[\\"https://lixuanfengs.github.io/blog-images/vp/Java/java_collections_overview.png\\"],\\"datePublished\\":\\"2024-03-06T10:10:26.000Z\\",\\"dateModified\\":\\"2024-03-08T03:51:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Cactus li\\",\\"url\\":\\"https://cactusli.net\\"}]}"]]},"headers":[{"level":2,"title":"# 知识体系结构","slug":"知识体系结构","link":"#知识体系结构","children":[]},{"level":2,"title":"# 介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"# Collection","slug":"collection","link":"#collection","children":[{"level":3,"title":"# Set","slug":"set","link":"#set","children":[]},{"level":3,"title":"# List","slug":"list","link":"#list","children":[]},{"level":3,"title":"# Queue","slug":"queue","link":"#queue","children":[]}]},{"level":2,"title":"# Map","slug":"map","link":"#map","children":[{"level":3,"title":"# TreeMap","slug":"treemap","link":"#treemap","children":[]},{"level":3,"title":"# HashMap","slug":"hashmap","link":"#hashmap","children":[]},{"level":3,"title":"# HashTable","slug":"hashtable","link":"#hashtable","children":[]},{"level":3,"title":"# LinkedHashMap","slug":"linkedhashmap","link":"#linkedhashmap","children":[]}]}],"git":{"createdTime":1709710899000,"updatedTime":1709869916000,"contributors":[{"name":"lixuanfengs","email":"1183895890@qq.com","commits":1}]},"readingTime":{"minutes":2.63,"words":789},"filePathRelative":"posts/Java/Collection/Collection 类关系图.md","localizedDate":"2024年3月6日","excerpt":"<blockquote>\\n<p>本文主要介绍JDK中Collection和Map相关知识体系，后续章节将对主要对类进行源码解读。</p>\\n</blockquote>\\n<ul>\\n<li>Collection 类关系图\\n<ul>\\n<li><a href=\\"#%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84\\">知识体系结构</a></li>\\n</ul>\\n</li>\\n</ul>\\n","autoDesc":true}`);export{o as comp,p as data};
