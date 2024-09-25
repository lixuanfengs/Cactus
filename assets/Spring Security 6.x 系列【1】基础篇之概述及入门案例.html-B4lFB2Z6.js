import{_ as n,c as a,f as e,o as l}from"./app-RizwwZaB.js";const t={};function r(o,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介"><span>1. 简介</span></a></h2><p>本系列基于最新<code>Spring Boot 3.x + Spring Security 6.x</code>版本，由浅入深，从实战到源码分析，详细讲解各种 <code>Spring Security </code>的使用技巧，适用于初学和进阶使用者。</p><p><strong>本系列学习路线：</strong></p><figure><img src="https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215180957948.png" alt="image-20231215180957948" tabindex="0" loading="lazy"><figcaption>image-20231215180957948</figcaption></figure><h2 id="_2-安全框架" tabindex="-1"><a class="header-anchor" href="#_2-安全框架"><span>2. 安全框架</span></a></h2><p>在 Java 生态中，目前有 <a href="https://spring.io/projects/spring-security" target="_blank" rel="noopener noreferrer">Spring Security</a> 和 <a href="https://shiro.apache.org/" target="_blank" rel="noopener noreferrer">Apache Shiro</a> 两个安全框架，可以完成认证和授权的功能。本文主要是针对 Spring Security 进行详解。</p><ul><li><p><strong>Spring Security</strong></p><p>Spring Security是一个强大而全面的身份验证和访问控制框架，构建在Spring框架之上。它提供了全面的安全性服务，支持在应用程序中进行身份验证、授权和保护，同时还包括对常见安全攻击的防护机制。Spring Security是一个高度可定制的框架，可以轻松地集成到Spring应用程序中。</p><p><strong>关键特点和功能：</strong></p><ul><li><strong>综合性安全性：</strong> 提供细粒度的身份验证和授权控制。</li><li><strong>可扩展性：</strong> 易于集成到Spring框架中，同时支持自定义扩展。</li><li><strong>集成性：</strong> 能够与Spring框架和其他Spring项目（如Spring Boot）无缝集成。</li></ul><p><strong>官方网站：</strong> <a href="https://spring.io/projects/spring-security" target="_blank" rel="noopener noreferrer">Spring Security</a></p><p><strong>GitHub地址：</strong> <a href="https://github.com/spring-projects/spring-security" target="_blank" rel="noopener noreferrer">GitHub地址</a></p></li><li><p><strong>Apache Shiro</strong></p><p><strong>官方术语介绍：</strong> Apache Shiro是一个功能强大且易于使用的Java安全框架，提供了身份验证、授权、会话管理和密码服务等核心安全功能。Shiro的设计目标是简化安全性的实现，并提供开发人员友好的API，以便轻松地将安全性集成到任何应用程序中。</p><p><strong>关键特点和功能：</strong></p><ul><li><strong>简单易用：</strong> 提供直观的API和清晰的安全性概念。</li><li><strong>综合性：</strong> 提供全面的身份验证、授权、会话管理和密码服务。</li><li><strong>无依赖性：</strong> 可以独立使用，不依赖其他框架。</li></ul><p><strong>官方网站：</strong> <a href="https://shiro.apache.org/" target="_blank" rel="noopener noreferrer">Apache Shiro</a></p></li></ul><p>在所有开发的系统中，确保系统安全性的基本要求是进行认证（authentication）和授权（authorization）。</p><ul><li><p><strong>认证（Authentication）：</strong> 认证是确认用户身份的过程。通过认证，系统可以验证用户是谁，以确保他们声称的身份是有效的。常见的认证方式包括用户名和密码、令牌、生物识别（指纹、面部识别等）等。认证通常在用户登录系统时进行，一旦用户成功通过认证，系统就会颁发一个用于识别该用户的凭证，该凭证通常被称为身份令牌。</p></li><li><p><strong>授权（Authorization）：</strong> 授权是确定用户是否有权进行某些操作或访问特定资源的过程。认证成功后，系统需要检查用户的权限，并根据其权限级别来决定是否允许执行特定的操作。授权确保用户只能访问他们被授予权限的资源。授权通常通过角色（Roles）或权限（Permissions）的概念来实现，用户被分配到不同的角色或权限组中，以确定其在系统中的权限范围。</p></li></ul><p>在现代应用程序中，常见的安全实践包括使用安全协议（如OAuth、OpenID Connect）、多因素身份验证（MFA）、密钥管理、会话管理等来增强认证和授权的安全性。这些安全机制帮助确保只有合法用户能够访问系统，并且他们只能进行被授权的操作。</p><blockquote><h2 id="认证-authentication-和授权-authorization-的区别" tabindex="-1"><a class="header-anchor" href="#认证-authentication-和授权-authorization-的区别"><span>认证 (authentication) 和授权 (authorization) 的区别</span></a></h2><p>以前一直分不清 authentication 和 authorization，其实很简单，举个例子来说：</p><p>你要登机，你需要出示你的 passport 和 ticket，passport 是为了证明你张三确实是你张三，这就是 authentication；而机票是为了证明你张三确实买了票可以上飞机，这就是 authorization。</p><p>在 computer science 领域再举个例子：</p><p>你要登陆论坛，输入用户名张三，密码1234，密码正确，证明你张三确实是张三，这就是 authentication；再一check用户张三是个版主，所以有权限加精删别人帖，这就是 authorization。</p></blockquote><h2 id="_3-入门案例" tabindex="-1"><a class="header-anchor" href="#_3-入门案例"><span>3. 入门案例</span></a></h2><blockquote><p>示例代码对应仓库：</p></blockquote><h3 id="_3-1-引入依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-引入依赖项"><span>3.1 引入依赖项</span></a></h3><p>在 <a href=""><code>pom.xml</code></a> 文件中，引入spring-boot-starter-security、spring-boot-starter-web 依赖。</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">&lt;?</span><span style="color:#E06C75;">xml</span><span style="color:#D19A66;"> version</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;1.0&quot;</span><span style="color:#D19A66;"> encoding</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;UTF-8&quot;</span><span style="color:#ABB2BF;">?&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">project</span><span style="color:#D19A66;"> xmlns</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;http://maven.apache.org/POM/4.0.0&quot;</span></span>
<span class="line"><span style="color:#D19A66;">         xmlns:xsi</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#D19A66;">         xsi:schemaLocation</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">modelVersion</span><span style="color:#ABB2BF;">&gt;4.0.0&lt;/</span><span style="color:#E06C75;">modelVersion</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">parent</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E06C75;">groupId</span><span style="color:#ABB2BF;">&gt;org.springframework.boot&lt;/</span><span style="color:#E06C75;">groupId</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E06C75;">artifactId</span><span style="color:#ABB2BF;">&gt;spring-boot-starter-parent&lt;/</span><span style="color:#E06C75;">artifactId</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E06C75;">version</span><span style="color:#ABB2BF;">&gt;3.1.6&lt;/</span><span style="color:#E06C75;">version</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E06C75;">relativePath</span><span style="color:#ABB2BF;">/&gt; </span><span style="color:#7F848E;font-style:italic;">&lt;!-- lookup parent from repository --&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;/</span><span style="color:#E06C75;">parent</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">artifactId</span><span style="color:#ABB2BF;">&gt;cactus-01-springsecurity-demo&lt;/</span><span style="color:#E06C75;">artifactId</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">dependencies</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        &lt;!-- 进行 Spring MVC 的自动化配置 --&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E06C75;">dependency</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">            &lt;</span><span style="color:#E06C75;">groupId</span><span style="color:#ABB2BF;">&gt;org.springframework.boot&lt;/</span><span style="color:#E06C75;">groupId</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">            &lt;</span><span style="color:#E06C75;">artifactId</span><span style="color:#ABB2BF;">&gt;spring-boot-starter-web&lt;/</span><span style="color:#E06C75;">artifactId</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;/</span><span style="color:#E06C75;">dependency</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">        &lt;!-- 进行 Spring Security 的自动化配置 --&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E06C75;">dependency</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">            &lt;</span><span style="color:#E06C75;">groupId</span><span style="color:#ABB2BF;">&gt;org.springframework.boot&lt;/</span><span style="color:#E06C75;">groupId</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">            &lt;</span><span style="color:#E06C75;">artifactId</span><span style="color:#ABB2BF;">&gt;spring-boot-starter-security&lt;/</span><span style="color:#E06C75;">artifactId</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;/</span><span style="color:#E06C75;">dependency</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;/</span><span style="color:#E06C75;">dependencies</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">project</span><span style="color:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>具体每个依赖项的作用，可以自己认真看下项目中添加的注释。</p></blockquote><h3 id="_3-2-启动主程序-securityapplication" tabindex="-1"><a class="header-anchor" href="#_3-2-启动主程序-securityapplication"><span>3.2 启动主程序 SecurityApplication</span></a></h3><p>创建 <a href=""><code>SecurityApplication.java</code></a> 类，配置 <code>@SpringBootApplication</code> 注解即可。代码如下：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">@</span><span style="color:#E5C07B;">SpringBootApplication</span></span>
<span class="line"><span style="color:#C678DD;">public</span><span style="color:#C678DD;"> class</span><span style="color:#E5C07B;"> SecurityApplication</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">    public</span><span style="color:#C678DD;"> static</span><span style="color:#C678DD;"> void</span><span style="color:#61AFEF;"> main</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">String</span><span style="color:#ABB2BF;">[] </span><span style="color:#E06C75;font-style:italic;">args</span><span style="color:#ABB2BF;">)</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#E5C07B;">        SpringApplication</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">run</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">SecurityApplication</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">class</span><span style="color:#ABB2BF;">, args);</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-在-resources-下新建配置文件" tabindex="-1"><a class="header-anchor" href="#_3-3-在-resources-下新建配置文件"><span>3.3 在 resources 下新建配置文件</span></a></h3><p>在 <a href="https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-01-spring-security/lab-01-springsecurity-demo/src/main/resources/application.yaml" target="_blank" rel="noopener noreferrer"><code>application.yml</code></a> 中，添加 Spring Security 配置，如下：</p><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#E06C75;">server</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  # 服务端口</span></span>
<span class="line"><span style="color:#E06C75;">  port</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">8888</span></span>
<span class="line"><span style="color:#E06C75;">spring</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  # Spring Security 配置项，对应 SecurityProperties 配置类</span></span>
<span class="line"><span style="color:#E06C75;">  security</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">    # 配置默认的 InMemoryUserDetailsManager 的用户账号与密码。</span></span>
<span class="line"><span style="color:#E06C75;">    user</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#E06C75;">      name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">user</span><span style="color:#7F848E;font-style:italic;"> # 账号</span></span>
<span class="line"><span style="color:#E06C75;">      password</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">user</span><span style="color:#7F848E;font-style:italic;"> # 密码</span></span>
<span class="line"><span style="color:#E06C75;">      roles</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">ADMIN</span><span style="color:#7F848E;font-style:italic;"> # 拥有角色</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>spring.security</code> 配置项，设置 Spring Security 的配置，对应 <a href="https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/security/SecurityProperties.java" target="_blank" rel="noopener noreferrer">SecurityProperties</a> 配置类。</p><p>默认情况下，Spring Boot <a href="https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/security/servlet/UserDetailsServiceAutoConfiguration.java" target="_blank" rel="noopener noreferrer">UserDetailsServiceAutoConfiguration</a> 自动化配置类，会创建一个<strong>内存级别</strong>的 <a href="https://github.com/spring-projects/spring-security/blob/master/core/src/main/java/org/springframework/security/provisioning/InMemoryUserDetailsManager.java" target="_blank" rel="noopener noreferrer">InMemoryUserDetailsManager</a> Bean 对象，提供认证的用户信息。</p><p>这里，我们<strong>添加了</strong> <code>spring.security.user</code> 配置项，UserDetailsServiceAutoConfiguration 会基于配置的信息创建一个用户 <a href="https://github.com/spring-projects/spring-security/blob/master/core/src/main/java/org/springframework/security/core/userdetails/User.java" target="_blank" rel="noopener noreferrer">User</a> 在内存中。</p><p>如果，我们<strong>未添加</strong> <code>spring.security.user</code> 配置项，UserDetailsServiceAutoConfiguration 会自动创建一个用户名为 <code>&quot;user&quot;</code> ，密码为 UUID 随机的用户 <a href="https://github.com/spring-projects/spring-security/blob/master/core/src/main/java/org/springframework/security/core/userdetails/User.java" target="_blank" rel="noopener noreferrer">User</a> 在内存中。</p><h3 id="_3-4-新建-admincontroller" tabindex="-1"><a class="header-anchor" href="#_3-4-新建-admincontroller"><span>3.4 新建 AdminController</span></a></h3><p>在 <code>cn.cactus.boot.springsecurity.controller.AdminController</code> 包下，创建 <a href="https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-01-spring-security/lab-01-springsecurity-demo/src/main/java/cn/iocoder/springboot/lab01/springsecurity/controller/AdminController.java" target="_blank" rel="noopener noreferrer">AdminController</a> 类，提供测试 API 接口。代码如下：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> * Package: cn.cactus.boot.security.controller</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> * Description:</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> *</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> * @Author 仙人球⁶ᴳ | 微信：Cactusesli</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> * @Date 2023/12/15 14:36</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> * @Github https://github.com/lixuanfengs</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#ABB2BF;">@</span><span style="color:#E5C07B;">RestController</span></span>
<span class="line"><span style="color:#ABB2BF;">@</span><span style="color:#E5C07B;">RequestMapping</span><span style="color:#E06C75;">(</span><span style="color:#98C379;">&quot;/admin&quot;</span><span style="color:#E06C75;">)</span></span>
<span class="line"><span style="color:#C678DD;">public</span><span style="color:#C678DD;"> class</span><span style="color:#E5C07B;"> AdminController</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    @</span><span style="color:#E5C07B;">GetMapping</span><span style="color:#E06C75;">(</span><span style="color:#98C379;">&quot;/testString&quot;</span><span style="color:#E06C75;">)</span></span>
<span class="line"><span style="color:#C678DD;">    public</span><span style="color:#E5C07B;"> String</span><span style="color:#61AFEF;"> testString</span><span style="color:#ABB2BF;">()</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#C678DD;">        return</span><span style="color:#98C379;"> &quot;♥访问成功♥&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们先提供一个 <code>&quot;/admin/testString&quot;</code> 接口，用于测试未登录时，会被拦截到登录界面。</p><h3 id="_3-5-测试" tabindex="-1"><a class="header-anchor" href="#_3-5-测试"><span>3.5 测试</span></a></h3><p>执行<code>SecurityApplication#main(String[] args)</code> 方法，运行项目。</p><p>项目启动成功后，浏览器访问 <a href="http://127.0.0.1:8888/admin/testString" target="_blank" rel="noopener noreferrer">http://127.0.0.1:8888/admin/testString</a> 接口。因为未登录，所以被 Spring Security 拦截到登录界面。如下图所示：</p><figure><img src="https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215144457224.png" alt="image-20231215144457224" tabindex="0" loading="lazy"><figcaption>image-20231215144457224</figcaption></figure><p>因为我们没有<strong>自定义</strong>登录界面，所以默认会使用 <a href="https://github.com/spring-projects/spring-security/blob/master/web/src/main/java/org/springframework/security/web/authentication/ui/DefaultLoginPageGeneratingFilter.java" target="_blank" rel="noopener noreferrer">DefaultLoginPageGeneratingFilter</a> 类，生成上述界面。</p><p>输入在<code> application.yml</code> 中配置的用户名密码：user/test 进行登录系统。登录完成后，因为 Spring Security 会记录被拦截的访问地址，所以浏览器自动动跳转 <a href="http://127.0.0.1:8888/admin/testString" target="_blank" rel="noopener noreferrer">http://127.0.0.1:8888/admin/testString</a> 接口。访问结果如下图所示：</p><figure><img src="https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215144951292.png" alt="image-20231215144951292" tabindex="0" loading="lazy"><figcaption>image-20231215144951292</figcaption></figure>`,38)]))}const p=n(t,[["render",r],["__file","Spring Security 6.x 系列【1】基础篇之概述及入门案例.html.vue"]]),c=JSON.parse(`{"path":"/posts/Spring/Spring%20Security%206.x/Spring%20Security%206.x%20%E7%B3%BB%E5%88%97%E3%80%901%E3%80%91%E5%9F%BA%E7%A1%80%E7%AF%87%E4%B9%8B%E6%A6%82%E8%BF%B0%E5%8F%8A%E5%85%A5%E9%97%A8%E6%A1%88%E4%BE%8B.html","title":"基础篇之概述及入门案例","lang":"zh-CN","frontmatter":{"title":"基础篇之概述及入门案例","subtitle":"基础篇之概述及入门案例","date":"2024-04-11T10:54:20.000Z","category":["Spring Security"],"tag":["Spring Security"],"order":1,"description":"1. 简介 本系列基于最新Spring Boot 3.x + Spring Security 6.x版本，由浅入深，从实战到源码分析，详细讲解各种 Spring Security 的使用技巧，适用于初学和进阶使用者。 本系列学习路线： image-20231215180957948image-20231215180957948 2. 安全框架 在 Ja...","head":[["meta",{"property":"og:url","content":"https://cactusli.net/posts/Spring/Spring%20Security%206.x/Spring%20Security%206.x%20%E7%B3%BB%E5%88%97%E3%80%901%E3%80%91%E5%9F%BA%E7%A1%80%E7%AF%87%E4%B9%8B%E6%A6%82%E8%BF%B0%E5%8F%8A%E5%85%A5%E9%97%A8%E6%A1%88%E4%BE%8B.html"}],["meta",{"property":"og:site_name","content":"Cactus's Blog"}],["meta",{"property":"og:title","content":"基础篇之概述及入门案例"}],["meta",{"property":"og:description","content":"1. 简介 本系列基于最新Spring Boot 3.x + Spring Security 6.x版本，由浅入深，从实战到源码分析，详细讲解各种 Spring Security 的使用技巧，适用于初学和进阶使用者。 本系列学习路线： image-20231215180957948image-20231215180957948 2. 安全框架 在 Ja..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215180957948.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-12T10:07:13.000Z"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:published_time","content":"2024-04-11T10:54:20.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-12T10:07:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基础篇之概述及入门案例\\",\\"image\\":[\\"https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215180957948.png\\",\\"https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215144457224.png\\",\\"https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215144951292.png\\"],\\"datePublished\\":\\"2024-04-11T10:54:20.000Z\\",\\"dateModified\\":\\"2024-09-12T10:07:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Cactus li\\",\\"url\\":\\"https://cactusli.net\\"}]}"]]},"headers":[{"level":2,"title":"1. 简介","slug":"_1-简介","link":"#_1-简介","children":[]},{"level":2,"title":"2. 安全框架","slug":"_2-安全框架","link":"#_2-安全框架","children":[]},{"level":2,"title":"3. 入门案例","slug":"_3-入门案例","link":"#_3-入门案例","children":[{"level":3,"title":"3.1 引入依赖项","slug":"_3-1-引入依赖项","link":"#_3-1-引入依赖项","children":[]},{"level":3,"title":"3.2 启动主程序 SecurityApplication","slug":"_3-2-启动主程序-securityapplication","link":"#_3-2-启动主程序-securityapplication","children":[]},{"level":3,"title":"3.3 在 resources 下新建配置文件","slug":"_3-3-在-resources-下新建配置文件","link":"#_3-3-在-resources-下新建配置文件","children":[]},{"level":3,"title":"3.4 新建 AdminController","slug":"_3-4-新建-admincontroller","link":"#_3-4-新建-admincontroller","children":[]},{"level":3,"title":"3.5 测试","slug":"_3-5-测试","link":"#_3-5-测试","children":[]}]}],"git":{"createdTime":1722310024000,"updatedTime":1726135633000,"contributors":[{"name":"lixuanfengs","email":"1183895890@qq.com","commits":1}]},"readingTime":{"minutes":5.87,"words":1762},"filePathRelative":"posts/Spring/Spring Security 6.x/Spring Security 6.x 系列【1】基础篇之概述及入门案例.md","localizedDate":"2024年4月11日","excerpt":"<h2>1. 简介</h2>\\n<p>本系列基于最新<code>Spring Boot 3.x + Spring Security 6.x</code>版本，由浅入深，从实战到源码分析，详细讲解各种 <code>Spring Security </code>的使用技巧，适用于初学和进阶使用者。</p>\\n<p><strong>本系列学习路线：</strong></p>\\n<figure><img src=\\"https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215180957948.png\\" alt=\\"image-20231215180957948\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20231215180957948</figcaption></figure>","autoDesc":true}`);export{p as comp,c as data};
