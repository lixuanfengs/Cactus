---
title: "源码篇之认证组件"
subtitle: "源码篇之认证组件"
date: 2024-4-11 10:54:20
category:
  - Spring Security
tag:
  - Spring Security
order: 5
---
## 1. 简介

本篇文章主要学习 `Spring Security` 中认证相关组件，为下篇分析**用户名密码认证执行流程** 打个基础。

## 2. 认证机制

`Spring Security` 提供了多种**认证方式**登录系统：

- **Username and Password** ：用用户名/密码进行认证
- **OAuth 2.0 Login**： 使用 `OpenID Connect `和`OAuth 2.0`登录
- **SAML 2.0 Login** ： `SAML 2.0`登录
- **Remember Me** ： 记住我
- **JAAS**： `JAAS`认证
- **Pre-Authentication Scenarios** ： 使用外部机制进行认证
- **X509** ： X509认证

## 3. 认证组件

在`Spring Security`中认证相关组件有：

- **SecurityContextHolder** ： 上下文信息持有者，存储当前认证用户`SecurityContext`
- **SecurityContext** ：上下文信息，包含当前认证用户的 `Authentication `（认证信息），从` SecurityContextHolder`中获取
- **Authentication** ： 认证信息
- **GrantedAuthority**：授予的权限
- **AuthenticationManager** ：认证管理器， 被`Spring Security `的` Filter` 调用执行认证
- **ProviderManager** ：认证提供者管理器，`AuthenticationManager`的实现
- **AuthenticationProvider** ：认证提供者，由 `ProviderManager` 用于执行特定类型的认证
- **AuthenticationEntryPoint** ：认证入口点，处理认证过程中的认证异常，比如：**重定向到登录页面**
- **AbstractAuthenticationProcessingFilter** ：一个用于认证的基础` Filter`抽象类

### 3.1 SecurityContextHolder

`SecurityContextHolder` 是 Spring Security 中的一个核心类，用于存储和访问当前应用程序执行的安全上下文（SecurityContext）。`SecurityContext` 包含了当前应用程序执行的安全信息，例如认证主体（Principal）、授予的权限（Granted Authorities）等。

![securitycontextholder](https://lixuanfengs.github.io/blog-images/Spring Security6.x/securitycontextholder.png)

当用户认证成功后，会将 `SecurityContext` 设置到`SecurityContextHolder`中，后续流程可以通过 `SecurityContextHolder `静态方法直接获取用户信息：

```java
// 以下方式可以在环境中测试
SecurityContext context = SecurityContextHolder.getContext();// 获取 SecurityContext
Authentication authentication = context.getAuthentication();// 获取认证信息
String username = authentication.getName(); // 用户名
Object principal = authentication.getPrincipal(); // 当前用户的信息，通常是UserDetails的实例
Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();// 权限
```

`SecurityContextHolder` 默认采用 `ThreadLocal` 来保存信息。在过滤器阶段，已认证的请求线程会从会话中提取认证信息，并将其存储在当前线程的 `ThreadLocal` 中。这使得业务代码能够方便地获取用户信息。一旦线程执行完毕，`FilterChainProxy` 会负责执行清理操作。

### 3.2 SecurityContext

`SecurityContext` 里主要包含了 `Authentication`认证对象，接口中只提供了两个简单方法：

```java
/**
 * Obtains the currently authenticated principal, or an authentication request token.
 * @return the <code>Authentication</code> or <code>null</code> if no authentication
 * information is available
 */
 // 获取 Authentication
Authentication getAuthentication();

/**
 * Changes the currently authenticated principal, or removes the authentication
 * information.
 * @param authentication the new <code>Authentication</code> token, or
 * <code>null</code> if no further authentication information should be stored
 */
 // 设置 Authentication
void setAuthentication(Authentication authentication);
```

该接口的实现类 `SecurityContextImpl` 也很简单：

![image-20240118171722859](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20240118171722859.png)

### 3.3 Authentication

在 `Spring Security` 中，`Authentication` 接口具有两个主要作用：

* **作为预认证用户信息的容器**，此时用户信息尚未完成认证。它在认证管理器中充当输入参数，用于提供认证凭证。

* **表示当前已认证的用户**，可以通过访问 `SecurityContext` 来获取当前的 `Authentication` 对象。这个对象包含了已通过认证的用户的信息。

`Authentication` 接口源码如下：

```java
public interface Authentication extends Principal, Serializable {
	// 获取 授权信息 ,用户权限集合 => 可用于访问受保护资源时的权限验证
	Collection<? extends GrantedAuthority> getAuthorities();
	// 凭据 这通常是一个密码，被认证后被清除
	Object getCredentials();
    // 存储有关身份验证请求的其他详细信息。
	Object getDetails();
	// 被认证主体的身份。在带有用户名和密码的身份验证请求的情况下，这将是用户名
	Object getPrincipal();
	// 是否被认证
	boolean isAuthenticated();
	// 认证结果设置
	void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;

}
```

`Authentication ` 有很多实现类，对应了不同的认证方式，比如记住的身份验证时，使用的是 `RememberMeAuthenticationToken`

![image-20240118174805422](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20240118174805422.png)

### 3.4 GrantedAuthority

`GrantedAuthority`用于表示已经获得的权限信息，可以是**角色**或**权限值**。

这个接口只定义了一个`getAuthority`方法，用于获取当前权限的标识符。默认的实现类是 `SimpleGrantedAuthority`。

```java
public interface GrantedAuthority extends Serializable {

	String getAuthority();

}
```

可以使用`Authentication.getAuthorities()`获取当前用户的权限集合：

```java
 Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();// 权限集合信息
```

### 3.5 AuthenticationManager

`AuthenticationManager` 是认证管理器，它被Security过滤器调用，用于执行认证操作。通常情况下，我们会使用`ProviderManager`作为常见的`AuthenticationManager`实现。

```java
/**
 * Processes an {@link Authentication} request.
 * 认证管理器 实现认证主要是通过AuthenticationManager接口
 * 在实际开发中，我们可能有多种不同的认证方式，例如：用户名+
 * 密码、邮箱+密码、手机号+验证码等，而这些认证方式的入口始终只有一个，那就是
 * AuthenticationManager。
 *
 */
public interface AuthenticationManager {

	/**
	 * authenticate()方法主要做三件事：
	 *   如果验证通过，返回Authentication（通常带上authenticated=true）。
	 *   认证失败抛出 AuthenticationException
	 *   如果无法确定，则返回null
	 */
	Authentication authenticate(Authentication authentication) throws AuthenticationException;

}
```



### 3.6 ProviderManager

`ProviderManager`（提供者管理器）类实现了 `AuthenticationManager` 接口。

```java
public class ProviderManager implements AuthenticationManager, MessageSourceAware, InitializingBean {

	private static final Log logger = LogFactory.getLog(ProviderManager.class);

	private AuthenticationEventPublisher eventPublisher = new NullEventPublisher();

	private List<AuthenticationProvider> providers = Collections.emptyList();

	protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();

	private AuthenticationManager parent;

	private boolean eraseCredentialsAfterAuthentication = true;

	public ProviderManager(AuthenticationProvider... providers) {
		this(Arrays.asList(providers), null);
	}

	public ProviderManager(List<AuthenticationProvider> providers) {
		this(providers, null);
	}


	public ProviderManager(List<AuthenticationProvider> providers, AuthenticationManager parent) {
		Assert.notNull(providers, "providers list cannot be null");
		this.providers = providers;
		this.parent = parent;
		checkState();
	}
}
```

`ProviderManager` 内部包含多个 `AuthenticationProvider`（认证提供者），在调用 `ProviderManager` 的 `authenticate` 方法时，会循环遍历所有的 `AuthenticationProvider`。认证过程会一直持续，直到某个提供者返回认证成功，此时整个认证过程结束；如果所有提供者都无法完成认证，那么最终会返回认证失败。

![providermanager](https://lixuanfengs.github.io/blog-images/Spring Security6.x/providermanager.png)

### 3.7 AuthenticationProvider

每个`AuthenticationProvider`对应一种认证方式，执行实际的认证处理逻辑，比如**用户名密码用**的是`DaoAuthenticationProvider`：

![image-20240118180310737](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20240118180310737.png)

通过向 `ProviderManager` 注入多个 `AuthenticationProvider`，可以实现对认证方式的自定义扩展。例如，可以添加支持手机验证码登录的 `AuthenticationProvider`，从而实现多种认证方式的灵活组合。

### 3.8 AuthenticationEntryPoint

`AuthenticationEntryPoint` 在 `ExceptionTranslationFilter` 检测到认证异常时被用于触发身份验证流程，比如重定向到登录页面。

几个常见的 `AuthenticationEntryPoint` 实现包括：

![image-20240118180728322](https://lixuanfengs.github.io/blog-images/Spring Security6.x/image-20240118180728322.png)

比如`LoginUrlAuthenticationEntryPoint`，会在表单登录失败时，执行重定向（或转发）到登录表单`URL`。

### 3.9 AbstractAuthenticationProcessingFilter

`AbstractAuthenticationProcessingFilter` 是基于浏览器的HTTP身份验证请求的抽象类，可以通过继承此类来开发认证过滤器。主要功能是提供对认证结果成功和失败的相关处理：

```java
private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {
    // 1. 检查是否需要身份验证
    if (!requiresAuthentication(request, response)) {
        // 如果不需要身份验证，直接继续执行过滤器链
        chain.doFilter(request, response);
        return;
    }
    try {
        // 2. 尝试进行身份验证，获取身份验证结果
        Authentication authenticationResult = attemptAuthentication(request, response);
        // 3. 如果身份验证结果为null，表示子类指示身份验证尚未完成，立即返回
        if (authenticationResult == null) {
            // return immediately as subclass has indicated that it hasn't completed
            return;
        }
        // 4. 使用会话策略处理身份验证成功的情况
        this.sessionStrategy.onAuthentication(authenticationResult, request, response);
        // 5. 如果设置在身份验证成功之前继续执行过滤器链，则继续执行
        if (this.continueChainBeforeSuccessfulAuthentication) {
            chain.doFilter(request, response);
        }
        // 6. 处理身份验证成功的情况
        successfulAuthentication(request, response, chain, authenticationResult);
    }
    catch (InternalAuthenticationServiceException failed) {
        // 7. 处理内部身份验证服务异常
        this.logger.error("An internal error occurred while trying to authenticate the user.", failed);
        unsuccessfulAuthentication(request, response, failed);
    }
    catch (AuthenticationException ex) {
        // 8. 处理身份验证失败的情况
        unsuccessfulAuthentication(request, response, ex);
    }
}

```

