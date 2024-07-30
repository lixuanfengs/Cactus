---
title: "源码篇之默认过滤器"
subtitle: "源码篇之默认过滤器"
date: 2024-4-11 10:54:20
category:
  - Spring Security
tag:
  - Spring Security
order: 4
---
## 1. 简介

本篇文章主要介绍 `Spring Security` 中默认的 `15`  个过滤器实现原理和作用。

## 2.Spring Filter

`Spring ` 扩展了 `Servlet` 中原生的过滤器，给予其各种`Spring `能力。

### 2.1 GenericFilterBean

GenericFilterBean 在 Spring 中提供了一种抽象的方式来实现过滤器，它继承了jakarta.servlet.Filter 接口，并提供了其他一些便于在 Spring 中使用过滤器的功能。例如，GenericFilterBean 可以通过 BeanNameAware 接口获取 bean 的名称，通过 EnvironmentAware 接口获取 Spring 上下文的环境信息，通过 ServletContextAware 接口获取 Web 应用程序的 ServletContext 对象，以及通过 InitializingBean 和 DisposableBean 接口在 bean 初始化和销毁时执行自定义的逻辑。

![image-20231219152357002](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20231219152357002.png)

可以看出 `GenericFilterBean`是对针对`Servlet` 过滤器的一种扩展，让其具备各种`Spring`特性，所实现接口的解释：

* **Filter：**该接口定义了过滤器的基本功能，是过滤器的核心接口。
* **BeanNameAware：**该接口用于获取 bean 的名称，该名称可以用于在日志或其他场景中标识 bean。
* **EnvironmentAware：**可以获取运行的环境`Environment`
* **EnvironmentCapable:**  和`EnvironmentAware`结合使用获取`Environment`
* **ServletContextAware：**该接口用于获取 Web 应用程序的 ServletContext 对象，该对象提供了访问 Web 应用程序上下文的相关信息。
* **InitializingBean：**该接口用于在 bean 初始化完成后执行自定义的初始化逻辑。
* **DisposableBean ：**该接口用于在 bean 销毁之前执行自定义的销毁逻辑。

### 2.2 OncePerRequestFilter

OncePerRequestFilter也是 spring-web提供的一个抽象类，继承自GenericFilterBean，从OncePerRequest就可以看出该过滤器可以确保每次请求只执行一次，这是因为不同类型Servlet 运行容器 在Servlet 3.0的调度中，某些可能会存在重复执行的情况，所以Spring中的过滤器，或者我们自定义时建议都基于该基础类来编写。

`Spring Security`中的过滤器几乎都继承自该类：

![image-20231219154707275](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20231219154707275.png)

`OncePerRequestFilter`中的`doFilter` 实现了限制只执行一次的相关逻辑，最后调用`doFilterInternal`执行子类过滤器的过滤逻辑：

```java
public final void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    if (request instanceof HttpServletRequest httpRequest) {
        //1. 只支持 HTTP 请求
        if (response instanceof HttpServletResponse httpResponse) {
            // 2. 获取当前当前过滤器已执行的标识，eg: characterEncodingFilter.FILTERED
            String alreadyFilteredAttributeName = this.getAlreadyFilteredAttributeName();
            // 3. 当前过滤器是否已执行
            boolean hasAlreadyFilteredAttribute = request.getAttribute(alreadyFilteredAttributeName) != null;
            if (!this.skipDispatch(httpRequest) && !this.shouldNotFilter(httpRequest)) {
                // 4. 已执行过，直接中断或继续下一个过滤器
                if (hasAlreadyFilteredAttribute) {
                    if (DispatcherType.ERROR.equals(request.getDispatcherType())) {
                        this.doFilterNestedErrorDispatch(httpRequest, httpResponse, filterChain);
                        return;
                    }

                    filterChain.doFilter(request, response);
                } else {
                    // 5. 未执行过，设置一个属性标识，eg: characterEncodingFilter.FILTERED: true
                    request.setAttribute(alreadyFilteredAttributeName, Boolean.TRUE);

                    try {
                        // 6. 调用过滤器的内部方法，执行当前子类过滤器过滤逻辑
                        this.doFilterInternal(httpRequest, httpResponse, filterChain);
                    } finally {
                        request.removeAttribute(alreadyFilteredAttributeName);
                    }
                }
            } else {
                filterChain.doFilter(request, response);
            }

            return;
        }
    }

    throw new ServletException("OncePerRequestFilter only supports HTTP requests");
}

```

实现自定义`OncePerRequestFilter `时，只需要重写`doFilterInternal`方法即可：

```java
public class CactusOncePerRequestFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("---------进入 CactusOncePerRequestFilter 前置------------");
        filterChain.doFilter(request, response);
        System.out.println("------------进入 CactusOncePerRequestFilter 后置--------");
    }
}
```

## 3.Security Filter

`Spring Security` 中共有三十几个` Filter`，默认配置下有十五个，接下来我们介绍默认过滤器的相关作用。

### 3.1 DisableEncodeUrlFilter

第一个执行的过滤器是 `DisableEncodeUrlFilter` 将响应体进行的包装：

```java
@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
    filterChain.doFilter(request, new DisableEncodeUrlResponseWrapper(response));
}
```

这个过滤器有什么用？ 首先实现 `Session` 会话，可以通过以下两种方式：

* **Cookie**：浏览器设置，每次请求自动携带给服务端
* **URL重写**：`Cookie` 被禁用时，后端响应将 `sessionId` 拼接在 `URL` 后进行重写，传递给页面

`DisableEncodeUrlFilter`禁用`HttpServletResponse`对`URL`进行编码重写，以防止将`sessionId`在`HTTP`访问日志等内容中泄露。

`DisableEncodeUrlResponseWrapper `源码如下：

```java
private static final class DisableEncodeUrlResponseWrapper extends HttpServletResponseWrapper {

    /**
     * Constructs a response adaptor wrapping the given response.
     * @param response the {@link HttpServletResponse} to be wrapped.
     * @throws IllegalArgumentException if the response is null
     */
    private DisableEncodeUrlResponseWrapper(HttpServletResponse response) {
        super(response);
    }
	// 直接返回，不重写
    @Override
    public String encodeRedirectURL(String url) {
        return url;
    }
	// 直接返回，不重写
    @Override
    public String encodeURL(String url) {
        return url;
    }

}
```

### 3.2 WebAsynManagerIntegrationFilter

`WebAsyncManagerIntegrationFilter`是第二个执行的过滤器，从名字上可以知道和异常请求有关。

WebAsyncManagerIntegrationFilter是第二个执行的过滤器，从名字上可以知道和异常请求有关。

默认情况下，Spring Security 经过认证后，认证信息会存储在当前线程ThreadLocal（不是InheritableThreadLocal）中，如果是异步，主线程已经执行完毕，子线程执行过程中则无法获取当前认证信息。

在Spring 中的异步通过WebAsyncManager管理异步请求，异步请求交由TaskExecutor线程池去处理，WebAsyncManager提供了一个拦截器机制，可以用拦截器将主线程中的数据传递到子线程中。

所以WebAsyncManagerIntegrationFilter就是解决异步请求认证信息传递问题，在主线程执行时，将信息放入拦截器中，子线程在执行时，可以从拦截器中获取数据，保证认证信息在当前请求多个线程中进行传播。

源码如下：

```java
@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
    // 获取当前的异步处理器
    WebAsyncManager asyncManager = WebAsyncUtils.getAsyncManager(request);
    // 创建拦截器
    SecurityContextCallableProcessingInterceptor securityProcessingInterceptor = (SecurityContextCallableProcessingInterceptor) asyncManager
        .getCallableInterceptor(CALLABLE_INTERCEPTOR_KEY);
    if (securityProcessingInterceptor == null) {
        SecurityContextCallableProcessingInterceptor interceptor = new SecurityContextCallableProcessingInterceptor();
        interceptor.setSecurityContextHolderStrategy(this.securityContextHolderStrategy);
        // 注册拦截器
        asyncManager.registerCallableInterceptor(CALLABLE_INTERCEPTOR_KEY, interceptor);
    }
    filterChain.doFilter(request, response);
}
```

### 3.3 SecurityContextHolderFilter

`SecurityContextHolderFilter`是第三个过滤器，直接继承自`GenericFilterBean`，声明了两个成员属性：

```java
// 用于在请求之间持久保存的 SecurityContext 策略
private final SecurityContextRepository securityContextRepository;
// 针对线程存储安全上下文信息的策略
private SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder
    .getContextHolderStrategy();
```

该过滤器的作用就是将持久化的`SecurityContext`设置到当前线程中，比如登录成功后，在`HttpSession`中保存了`SecurityContext`，那么该过滤器可以直接将`SecurityContext`设置到请求线程中：

```java
private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws ServletException, IOException {
    // 1. 获取属性 SecurityContextHolderFilter.class.getName() + ".APPLIED"
    // 存在说明当前请求已执行该过滤器
    if (request.getAttribute(FILTER_APPLIED) != null) {
        chain.doFilter(request, response);
        return;
    }
    // 2. 设置属性
    request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
    // 3. 从 securityContextRepository 中加载 SecurityContext
    Supplier<SecurityContext> deferredContext = this.securityContextRepository.loadDeferredContext(request);
    try {
        // 4. 将SecurityContext 设置到ContextHolder中
        this.securityContextHolderStrategy.setDeferredContext(deferredContext);
        chain.doFilter(request, response);
    }
    finally {
        // 完成后，清理上下文，移除属性
        this.securityContextHolderStrategy.clearContext();
        request.removeAttribute(FILTER_APPLIED);
    }
}
```

### 3.4 HeaderWriterFilter

`HeaderWriterFilter` 字面理解为请求头写入过滤器，是用于向当前响应添加头部信息。它通常用于添加一些启用浏览器保护的特定头部，例如 `X-Frame-Options`、`X-XSS-Protection` 和 `X-Content-Type-Options `等。

这个过滤器的作用是在每个请求中获取安全上下文并将其设置到 `SecurityContextHolder` 中，以便在同一线程内正确传递安全上下文。它可以帮助你在响应中添加一些安全相关的头部，以增强应用程序的安全性，代码如下：。

```java
@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
     // 直接添加 
    if (this.shouldWriteHeadersEagerly) {
        doHeadersBefore(request, response, filterChain);
    }
    else {
        doHeadersAfter(request, response, filterChain);
    }
}

```

默认提供了**5**种消息头可写：

![image-20240117171724071](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20240117171724071.png)

### 3.5 CsrfFilter

`CsrfFilter`很好理解，就是防范 `Csrf`攻击，后续单独篇章介绍：

![image-20240117171914171](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20240117171914171.png)

### 3.6 LogoutFilter

`LogoutFilter`处理登出（后续单独篇章介绍）：

```java
@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    // 1. 将ServletRequest 和 ServletResponse 转型为 HttpServletRequest 和 HttpServletResponse
    doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
}

private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    // 2. 判断当前请求是否需要登出
    if (requiresLogout(request, response)) {
        // 3. 获取当前认证信息
        Authentication auth = this.securityContextHolderStrategy.getContext().getAuthentication();
        // 4. 判断调试日志
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Logging out [%s]", auth));
        }
		// 5. 调用登出处理器，执行退出登录
        this.handler.logout(request, response, auth);
        // 6. 退出登录成功处理
        this.logoutSuccessHandler.onLogoutSuccess(request, response, auth);
        
        return;
    }
    // 7. 调用后续过滤链
    chain.doFilter(request, response);
}

```

### 3.7 UsernamePasswordAuthenticationFilter

`UsernamePasswordAuthenticationFilter` 处理表单用户名密码登录（后续单独篇章介绍）：

```java
@Override
public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

     // 1. 仅 post 才能认证,校验请求方法
     if (this.postOnly && !request.getMethod().equals("POST")) {
       throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
     }

     // 2. 获取用户名,进行trim处理
     String username = obtainUsername(request);  
     username = (username != null) ? username.trim() : "";

     // 3. 获取密码
     String password = obtainPassword(request);
     password = (password != null) ? password : "";

     // 4. 构建认证令牌
     UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(username,password);

     // 5. 允许子类设置详细信息
     setDetails(request, authRequest);

     // 6. 提交给认证管理器认证
     return this.getAuthenticationManager().authenticate(authRequest);
}
```

### 3.8 DefaultLoginPageGeneratingFilter

`DefaultLoginPageGeneratingFilter`**默认的登录页面过滤器**，默认的登录页面是由该过滤器生成的：

```java
@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    // 1. 将 ServletRequest和ServletResponse 强制转换为 HttpServletRequest 和 HttpServletResponse
    doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
}

private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    // 2. 是否登录错误 /login?error
    boolean loginError = isErrorPage(request);
    // 3. 是否登录成功 /login?logout
    boolean logoutSuccess = isLogoutSuccess(request);
    if (isLoginUrlRequest(request) || loginError || logoutSuccess) {
        // 4. /login?error、/login?logout、/login 三种请求URL中的任意一种会进入该方法
		// 5. 生成登录页
        String loginPageHtml = generateLoginPageHtml(request, loginError, logoutSuccess);
        response.setContentType("text/html;charset=UTF-8");
        response.setContentLength(loginPageHtml.getBytes(StandardCharsets.UTF_8).length);
        // 6. 直接写出，并结束
        response.getWriter().write(loginPageHtml);
        return;
    }
    chain.doFilter(request, response);
}

```

往下继续会看到 `generateLoginPageHtml`方法中，直接使用字符串拼接了一个`HTML`登录页面😀😀😀：

![image-20240117174319737](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20240117174319737.png)

### 3.9 DefaultLogoutPageGeneratingFilter

`DefaultLogoutPageGeneratingFilter`和上面一样，如果请求`URL`是`/logout`，直接生成一个确认退出页面：

![image-20240117174543892](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20240117174543892.png)

### 3.10 BasicAuthenticationFilter

BasicAuthenticationFilter 用于处理BASIC认证，该认证方式通过请求头携带"BASIC"和特殊格式的用户名密码。这是一种与表单登录逻辑类似但目前较少使用。

```java
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
    try {
        // 1. 从请求中获取用户名密码认证信息
        UsernamePasswordAuthenticationToken authRequest = this.authenticationConverter.convert(request);
        // 2. 如果获取不到用户名密码信息,直接跳过 filter,调用下一个 filter
        if (authRequest == null) {
            this.logger.trace("Did not process authentication request since failed to find username and password in Basic Authorization header");
            chain.doFilter(request, response);
            return;
        }

        // 3. 获取到用户名 
        String username = authRequest.getName();
        this.logger.trace(LogMessage.format("Found username '%s' in Basic Authorization header", username));
        // 4. 判断用户是否需要认证
        if (this.authenticationIsRequired(username)) {
            // 5. 使用用户名密码信息进行认证
            Authentication authResult = this.authenticationManager.authenticate(authRequest);
            // 6. 创建一个空的安全上下文
            SecurityContext context = this.securityContextHolderStrategy.createEmptyContext();
            // 7. 将认证结果设置到安全上下文中去
            context.setAuthentication(authResult);
            
  			// 8. 设置安全上下文
            this.securityContextHolderStrategy.setContext(context);
            if (this.logger.isDebugEnabled()) {
                this.logger.debug(LogMessage.format("Set SecurityContextHolder to %s", authResult));
            }
			// 9. 认证成功后的处理
            this.rememberMeServices.loginSuccess(request, response, authResult);
            this.securityContextRepository.saveContext(context, request, response);
            this.onSuccessfulAuthentication(request, response, authResult);
        }
    } catch (AuthenticationException var8) {
         // 9. 认证失败后的处理
        this.securityContextHolderStrategy.clearContext();
        this.logger.debug("Failed to process authentication request", var8);
        this.rememberMeServices.loginFail(request, response);
        this.onUnsuccessfulAuthentication(request, response, var8);
        if (this.ignoreFailure) {
            chain.doFilter(request, response);
        } else {
            this.authenticationEntryPoint.commence(request, response, var8);
        }

        return;
    }

    chain.doFilter(request, response);
}
```



### 3.11 RequestCacheAwareFilter

`RequestCacheAwareFilter` 缓存，被登录打断的请求，例如访问某个`URL`，会调转到登录页面，登录成功后，会从当前缓存中获取之前访问的`URL`，直接跳转到原来的请求：

```java
@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    // 1. 获取缓存请求
    HttpServletRequest wrappedSavedRequest = this.requestCache.getMatchingRequest((HttpServletRequest) request,
            (HttpServletResponse) response);
    // 2. 存在则传递之前缓存的请求对象
    chain.doFilter((wrappedSavedRequest != null) ? wrappedSavedRequest : request, response);
}

```

### 3.12 SecurityContextHolderAwareRequestFilter

`SecurityContextHolderAwareRequestFilter` 将请求包装为`Servlet3SecurityContextHolderAwareRequestWrapper`：

```java
@Override
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
        throws IOException, ServletException {
    chain.doFilter(this.requestFactory.create((HttpServletRequest) req, (HttpServletResponse) res), res);
}
```

`Servlet3SecurityContextHolderAwareRequestWrapper`中主要是设置了`SecurityContextHolderStrategy`对象，那么可以从该包装请求中直接获取到`SecurityContext`相关信息 ：

```java
	@Override
	public HttpServletRequest create(HttpServletRequest request, HttpServletResponse response) {
		Servlet3SecurityContextHolderAwareRequestWrapper wrapper = new Servlet3SecurityContextHolderAwareRequestWrapper(
				request, this.rolePrefix, response);
		wrapper.setSecurityContextHolderStrategy(this.securityContextHolderStrategy);
		return wrapper;
	}
```



### 3.13 AnonymousAuthenticationFilter

`Anonymous`是匿名用户的意思，当之前的过滤器没有发现认证的用户信息时，会在`AnonymousAuthenticationFilter`过滤器中创建一个匿名用户：

```java
@Override
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
        throws IOException, ServletException {
    Supplier<SecurityContext> deferredContext = this.securityContextHolderStrategy.getDeferredContext();
    this.securityContextHolderStrategy
        .setDeferredContext(defaultWithAnonymous((HttpServletRequest) req, deferredContext));
    chain.doFilter(req, res);
}
```

### 3.14 ExceptionTranslationFilter

`ExceptionTranslationFilter`是比较重要的一个过滤器，对异常进行转换处理，处理过滤器中的抛出`AccessDeniedException`、`AuthenticationException`，提供了 `Java` 异常和 `HTTP` 响应之间的桥梁。

```java

private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    try {
        // 1. 执行过滤器链
        chain.doFilter(request, response);
    }
    catch (IOException ex) {
        // 2. 如果捕获到IOException，直接抛出
        throw ex;
    }
    catch (Exception ex) {
        // 3. 从堆栈跟踪中提取 SpringSecurityException 异常
        Throwable[] causeChain = this.throwableAnalyzer.determineCauseChain(ex);
        // 4. 分析出异常是否是 AuthenticationException
        RuntimeException securityException = (AuthenticationException) this.throwableAnalyzer
            .getFirstThrowableOfType(AuthenticationException.class, causeChain);
        // 5. 如果没有找到 AuthenticationException，则尝试获取 AccessDeniedException
        if (securityException == null) {
            securityException = (AccessDeniedException) this.throwableAnalyzer
                .getFirstThrowableOfType(AccessDeniedException.class, causeChain);
        }
        // 6. 如果不是 AuthenticationException、AccessDeniedException 直接抛出
        if (securityException == null) {
            rethrow(ex);
        }
        // 7. 如果响应已提交，抛出ServletException
        if (response.isCommitted()) {
            throw new ServletException("Unable to handle the Spring Security Exception "
                    + "because the response is already committed.", ex);
        }
        // 处理 Spring Security 异常
        handleSpringSecurityException(request, response, chain, securityException);
    }
}
```

### 3.15 AuthorizationFilter

`AuthorizationFilter`是最后一个过滤器，`Authorization` 是授权的意思，不难看出是校验当前请求是否具有访问权限：

```java
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
        throws ServletException, IOException {

    HttpServletRequest request = (HttpServletRequest) servletRequest;
    HttpServletResponse response = (HttpServletResponse) servletResponse;
    // 1. 如果启用了 observeOncePerRequest（监控每一次请求） 并且已经应用过滤器，则直接继续执行过滤器链
    if (this.observeOncePerRequest && isApplied(request)) {
        chain.doFilter(request, response);
        return;
    }
    // 2. 如果请求被标记为跳过分发（skipDispatch），则直接继续执行过滤器链
    if (skipDispatch(request)) {
        chain.doFilter(request, response);
        return;
    }
    // 3. 获取用于标记请求已经被过滤的属性名
    String alreadyFilteredAttributeName = getAlreadyFilteredAttributeName();
    // 4. 将标记属性设置为TRUE，表示请求已经被过滤
    request.setAttribute(alreadyFilteredAttributeName, Boolean.TRUE);
    try {
        // 5. 使用授权管理器进行权限检查，并获取授权决策
        AuthorizationDecision decision = this.authorizationManager.check(this::getAuthentication, request);
        // 6. 发布授权事件
        this.eventPublisher.publishAuthorizationEvent(this::getAuthentication, request, decision);
        // 7. 如果授权决策为拒绝访问，则抛出 AccessDeniedException
        if (decision != null && !decision.isGranted()) {
            throw new AccessDeniedException("Access Denied");
        }
        // 8. 继续执行过滤器链
        chain.doFilter(request, response);
    }
    finally {
        // 9. 在finally 块中，移除标记属性，确保无论如何都会被执行
        request.removeAttribute(alreadyFilteredAttributeName);
    }
}

```

## 4. 执行流程

**那么上面这些过滤器是由谁来调度执行的呢？**

之前文章我们了解过 `FilterChainProxy` 是 `Spring Security` 使用的核心，用于代理 `Spring Security` 中所有的 `SecurityFilterChain` ，本质上是一个特殊的过滤器，通过`DelegatingFilterProxy` 进行代理。

`FilterChainProxy`继承自`GenericFilterBean`类，构造函数如下：

```java
// Security 过滤器链集合，默认只有一个DefaultSecurityFilterChain
public FilterChainProxy(List<SecurityFilterChain> filterChains) {
    this.filterChains = filterChains;
}
```

![image-20240118150537028](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20240118150537028.png)

直接将断点打在`OncePerRequestFilter.doFilter()`方法上，浏览器发起一个请求，首先进入的是`Spring Boot`提供了一些请求处理器：

![image-20240118150818127](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20240118150818127.png)

之后会进入到`FilterChainProxy`（因为它也是一个过滤器）的`doFilter`方法中：

```java
@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    // 1. 获取请求中是否有清理下上文属性 org.springframework.security.web.FilterChainProxy.APPLIED，刚进来没有设置为 true
    boolean clearContext = request.getAttribute(FILTER_APPLIED) == null;
    if (!clearContext) {
        doFilterInternal(request, response, chain);
        return;
    }
    try {
        // 2. 设置 org.springframework.security.web.FilterChainProxy.APPLIED=true
        request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
        // 3. 调用过滤方法
        doFilterInternal(request, response, chain);
    }
    catch (Exception ex) {
        // 4. 发生异常进行分析处理
        Throwable[] causeChain = this.throwableAnalyzer.determineCauseChain(ex);
        Throwable requestRejectedException = this.throwableAnalyzer
            .getFirstThrowableOfType(RequestRejectedException.class, causeChain);
        if (!(requestRejectedException instanceof RequestRejectedException)) {
            throw ex;
        }
        this.requestRejectedHandler.handle((HttpServletRequest) request, (HttpServletResponse) response,
                (RequestRejectedException) requestRejectedException);
    }
    finally {
        // 5. 最后清理上下文
        this.securityContextHolderStrategy.clearContext();
        request.removeAttribute(FILTER_APPLIED);
    }
}

```

在`doFilterInternal`方法中`Spring Security `防火墙会进行第一步请求校验：

```java
private void doFilterInternal(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    // 1. 防火墙校验，将请求和响应进行包装
    // 1.1 请求方式是否被允许
    // 1.2 URL 是否规范
    // 1.3 远程IP是否黑名单
    // 1.4 拒绝字段名称中的不可打印Ascii字符
    // 1.5 请求对象是否规范
    FirewalledRequest firewallRequest = this.firewall.getFirewalledRequest((HttpServletRequest) request);
    HttpServletResponse firewallResponse = this.firewall.getFirewalledResponse((HttpServletResponse) response);
    // 2. 取出所有过滤器链中的所有过滤器
    List<Filter> filters = getFilters(firewallRequest);
    if (filters == null || filters.size() == 0) {
        if (logger.isTraceEnabled()) {
            logger.trace(LogMessage.of(() -> "No security for " + requestLine(firewallRequest)));
        }
        firewallRequest.reset();
        this.filterChainDecorator.decorate(chain).doFilter(firewallRequest, firewallResponse);
        return;
    }
    if (logger.isDebugEnabled()) {
        logger.debug(LogMessage.of(() -> "Securing " + requestLine(firewallRequest)));
    }
    FilterChain reset = (req, res) -> {
        if (logger.isDebugEnabled()) {
            logger.debug(LogMessage.of(() -> "Secured " + requestLine(firewallRequest)));
        }
        // Deactivate path stripping as we exit the security filter chain
        firewallRequest.reset();
        chain.doFilter(req, res);
    };
    // 3. 对过滤器链进行装饰，并调用装饰类的doFilter 方法
    this.filterChainDecorator.decorate(reset, filters).doFilter(firewallRequest, firewallResponse);
}
```

在装饰过滤器链 `VirtualFilterChain` 中，开始正式调用 `Spring Security ` 中的过滤器：

```java
@Override
public void doFilter(ServletRequest request, ServletResponse response) throws IOException, ServletException {
    // 1. 当前被调用过滤器的位置（初始值为0）是否等于过滤器数量（默认15）
    if (this.currentPosition == this.size) {
        // 位置变为过滤器数量大小时，说明全部执行完毕，调用过滤器链执行过滤器（不再是Spring Security 中的过滤器了）
        this.originalChain.doFilter(request, response);
        return;
    }
    // 2. 位置加1
    this.currentPosition++;
    // 3. 获取当前过滤器
    Filter nextFilter = this.additionalFilters.get(this.currentPosition - 1);
    if (logger.isTraceEnabled()) {
        String name = nextFilter.getClass().getSimpleName();
        logger.trace(LogMessage.format("Invoking %s (%d/%d)", name, this.currentPosition, this.size));
    }
    // 4. 执行过滤器
    nextFilter.doFilter(request, response, this);
}
```

在`Spring Security`中，过滤器的执行是有序的，按照特定的顺序依次调用。每个过滤器按序执行其功能，只有当所有过滤器都成功通过后，请求才会到达`Servlet`，进入控制层进行业务逻辑处理。随后，响应对象会经过同样顺序的过滤器处理，最终返回给客户端。

