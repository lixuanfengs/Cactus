---
title: "源码篇之基于过滤器的基本原理"
subtitle: "源码篇之基于过滤器的基本原理"
date: 2024-4-11 10:54:20
category:
  - Spring Security
tag:
  - Spring Security
order: 3
---
## 1. 简介

`Spring Security`通过过滤器来支持`Servlet`，即在请求到达`Servlet之`前，通过过滤器进行认证和授权校验。如果用户合法且具备权限，则允许请求通过；反之，将会导致跳转到登录页或拒绝访问。因此，本文重点介绍`Spring Security`中与过滤器相关的知识。

类比`JAVA Web`中的**过滤器**，`Spring Security `中的**过滤器**进行了各种代理和增强，可以简单理解`Security `中的**过滤器**结构如下所示：

![image-20231218174633340](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231218174633340.png)

**简要说明：**

1. 请求到 DelegatingFilterProxy（代理过滤器）
2. 调用 FilterChainProxy（过滤器链代理）
3. FilterChainProxy 根据请求，调用匹配的 SecurityFilterChain（Security中的过滤器链）
4. SecurityFilterChain 中的多个有序的 Security 过滤器对请求进行处理，检验是否登录、是否授权… 并做出相应处理



## 2. 过滤器

大家对于Java Web中的过滤器（Filter）应该已经相当熟悉了。作为三大组件之一，过滤器在整个Web应用中扮演着重要而不可或缺的角色。

一个简单的**过滤器**如下所示：

```java
// 使用@ServletComponentScan添加在启动类上扫描该过滤器
@WebFilter(filterName = "CactusFilter", urlPatterns = {"/*"})
public class CactusFilter implements Filter {

    // 过滤器对象进行初始化调用
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // ......
    }

    /**
     * 添加自定义过滤逻辑
     *
     * @param servletRequest  请求
     * @param servletResponse 响应
     * @param filterChain 过滤器链，由多个过滤器组成
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("对请求进行某些自定义操作");
        // 激活下一个过滤器的的doFilter 方法，最后一个激活Servlet 
        filterChain.doFilter(servletRequest,servletResponse);
        System.out.println("对响应进行某些自定义操作");
    }

    // 过滤器销毁对象前被调用
    @Override
    public void destroy() {
        // ......
    }
}
```

![image-20231218175833151](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231218175833151.png)

客户端向应用程序发送请求时，运行容器会创建一个FilterChain（过滤器链），其中包含所有Filter实例和Servlet。这些过滤器根据请求URI路径来处理请求和响应。

在Spring Boot Web应用程序中，通常只有一个Servlet实例，即DispatcherServlet，但是通常存在多个过滤器，它们按照指定的顺序共同协作。

## 3. Security 过滤器（Security Filter）

`Spring Security `中的过滤器是通过`SecurityFilterChain API `插入`FilterChainProxy`中的，`Filter `实例的顺序非常重要。

`Spring Security`中所有的过滤器按照顺序如下所示（后续会详细介绍）：

* ForceEagerSessionCreationFilter
* ChannelProcessingFilter
* WebAsyncManagerIntegrationFilter
* SecurityContextPersistenceFilter
* HeaderWriterFilter
* CorsFilter
* CsrfFilter
* LogoutFilter
* OAuth2AuthorizationRequestRedirectFilter
* Saml2WebSsoAuthenticationRequestFilter
* X509AuthenticationFilter
* AbstractPreAuthenticatedProcessingFilter
* CasAuthenticationFilter
* OAuth2LoginAuthenticationFilter
* Saml2WebSsoAuthenticationFilter
* UsernamePasswordAuthenticationFilter
* DefaultLoginPageGeneratingFilter
* DefaultLogoutPageGeneratingFilter
* ConcurrentSessionFilter
* DigestAuthenticationFilter
* BearerTokenAuthenticationFilter
* BasicAuthenticationFilter
* RequestCacheAwareFilter
* SecurityContextHolderAwareRequestFilter
* JaasApiIntegrationFilter
* RememberMeAuthenticationFilter
* AnonymousAuthenticationFilter
* OAuth2AuthorizationCodeGrantFilter
* SessionManagementFilter
* ExceptionTranslationFilter
* FilterSecurityInterceptor
* SwitchUserFilter

## 4. 委派代理过滤器（DelegatingFilterProxy）

![image-20231218182806637](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231218182806637.png)

在Spring的spring-web模块中，提供了DelegatingFilterProxy类用于代理过滤器，使得可以方便地利用Spring容器来管理过滤器。在请求响应的流程中，DelegatingFilterProxy会从容器中查找已注册的过滤器Bean对象，然后调用该Bean的过滤方法。

可以看到该类中包含了`Spring`容器对象和被代理的过滤器：

![1702949368735](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/1702949368735.jpg)

在 [2. 过滤器]() 步骤中实现的过滤器，是使用`Servlet`容器自己的标准来注册，所以这时并不会被`Spring`容器管理，这时就可以使用`DelegatingFilterProxy`进行代理，实现代码如下：

```java
@Component("cactusFilter")
public class CactusFilter implements Filter {//...... }
@Configuration
public class MyConfig {

    @Bean
    public DelegatingFilterProxyRegistrationBean delegatingFilterProxyRegistrationBean(){
        DelegatingFilterProxyRegistrationBean filterProxy = new DelegatingFilterProxyRegistrationBean("cactusFilter");
        filterProxy.addUrlPatterns("/*");
        filterProxy.setOrder(-5);
        return filterProxy;
    }
}
```

## 5.过滤器链代理（FilterChainProxy）

`Spring Security`提供了`FilterChainProxy`代理类，它是`Spring Security`的核心组件，用于代理`Spring Security`中的所有`SecurityFilterChain`。每个`SecurityFilterChain`中包含多个由`Spring Security`声明的`Filter`。

![image-20231219100525856](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231219100525856.png)

FilterChainProxy本质上是一个特殊的过滤器，通过DelegatingFilterProxy进行代理，因此它也是一个Bean对象。在Security过滤器链中，过滤器通常都是Bean对象，通过FilterChainProxy进行注册。与直接向Servlet容器或DelegatingFilterProxy注册相比，FilterChainProxy的注册具有许多优势：

- 它为Spring Security的所有Servlet支持提供了一个起点。如果需要对Spring Security的Servlet支持进行故障诊断，可以在FilterChainProxy中添加一个调试点。
- 可以执行一些被视为不可有可无的任务。例如，清除了SecurityContext以避免内存泄漏，并应用Spring Security的HttpFirewall来保护应用程序免受某些类型的攻击。
- 在确定何时应该调用SecurityFilterChain方面提供了更大的灵活性。在Servlet容器中，Filter实例仅基于URL被调用。FilterChainProxy可以通过使用RequestMatcher接口，根据HttpServletRequest中的任何内容来确定调用。

`FilterChainProxy ` 在整个流程中的作用如下图：

![image-20231219104612610](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231219104612610.png)

## 6. Security 过滤器链（SecurityFilterChain）

在Servlet中，一组过滤器构成了FilterChain（过滤器链）。对于SecurityFilterChain的理解就变得相对简单了，它是Spring Security提供的过滤器链，用于管理其自身的所有过滤器，如上述流程图所示。FilterChainProxy可以利用SecurityFilterChain来确定当前请求应该调用哪些Spring Security Filter实例。

在整个流程中，` FilterChainProxy` 决定应该使用哪个` SecurityFilterChain`，只有第一个匹配的`SecurityFilterChain`被调用。

如下图中，如果请求的`URL`是` /api/**/`，那么会匹配到左边的`SecurityFilterChain`，如果都不匹配，则会调用支持`/**`的` SecurityFilterChain`。

![image-20231219110053266](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231219110053266.png)

## 7. 源码分析

### 7.1 自动配置

在入门篇中，我们只引入了一个`spring-boot-starter-security`依赖，就可以进行**登录认证**，得益于`Spring Boot`的自动配置。在`spring-boot-autoconfigure`模块中集成了对`Spring Security`的自动配置：

![image-20231219110520871](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231219110520871.png)

默认的配置是由 `SecurityAutoConfiguration` 和`UserDetailsServiceAutoConfiguration`这两个自动配置类实现的。

`SecurityAutoConfiguration `主要是导入 `SpringBootWebSecurityConfiguration `配置：

```java
@AutoConfiguration(
    before = {UserDetailsServiceAutoConfiguration.class}
)
@ConditionalOnClass({DefaultAuthenticationEventPublisher.class})
@EnableConfigurationProperties({SecurityProperties.class})
@Import({SpringBootWebSecurityConfiguration.class, SecurityDataConfiguration.class})
public class SecurityAutoConfiguration {
    public SecurityAutoConfiguration() {
    }

    // 认证事件发布者
    @Bean
    @ConditionalOnMissingBean({AuthenticationEventPublisher.class})
    public DefaultAuthenticationEventPublisher authenticationEventPublisher(ApplicationEventPublisher publisher) {
        return new DefaultAuthenticationEventPublisher(publisher);
    }
}
```

在`SpringBootWebSecurityConfiguration `配置类中，默认添加了` @EnableWebSecurity`注解启用了`Spring Security`应用安全配置，并添加了一个`SecurityFilterChain`，添加了`Http`相关规则：

```java
@Configuration(
    proxyBeanMethods = false
)
@ConditionalOnWebApplication(
    type = Type.SERVLET
)
class SpringBootWebSecurityConfiguration {
    SpringBootWebSecurityConfiguration() {
    }

    @Configuration(
        proxyBeanMethods = false
    )
    @ConditionalOnMissingBean(
        name = {"springSecurityFilterChain"}
    )
    @ConditionalOnClass({EnableWebSecurity.class})
    @EnableWebSecurity
    static class WebSecurityEnablerConfiguration {
        WebSecurityEnablerConfiguration() {
        }
    }

    @Configuration(
        proxyBeanMethods = false
    )
    @ConditionalOnDefaultWebSecurity
    static class SecurityFilterChainConfiguration {
        SecurityFilterChainConfiguration() {
        }

        @Bean
        @Order(2147483642)
        SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
            // 配置所有的Http请求必须认证
            http.authorizeHttpRequests((requests) -> {
                ((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)requests.anyRequest()).authenticated();
            });
            // 开启表单登录
            http.formLogin(Customizer.withDefaults());
            // 开启 Basic 认证
            http.httpBasic(Customizer.withDefaults());
            return (SecurityFilterChain)http.build();
        }
    }
}
```

`UserDetailsServiceAutoConfiguration `则只是通过`Yml`配置配置文件生成了一个默认的用户，以便于开发测试：

```java
@AutoConfiguration
@ConditionalOnClass({AuthenticationManager.class})
@ConditionalOnBean({ObjectPostProcessor.class})
@ConditionalOnMissingBean(
    value = {AuthenticationManager.class, AuthenticationProvider.class, UserDetailsService.class, AuthenticationManagerResolver.class},
    type = {"org.springframework.security.oauth2.jwt.JwtDecoder", "org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector", "org.springframework.security.oauth2.client.registration.ClientRegistrationRepository", "org.springframework.security.saml2.provider.service.registration.RelyingPartyRegistrationRepository"}
)
public class UserDetailsServiceAutoConfiguration {
    private static final String NOOP_PASSWORD_PREFIX = "{noop}";
    private static final Pattern PASSWORD_ALGORITHM_PATTERN = Pattern.compile("^\\{.+}.*$");
    private static final Log logger = LogFactory.getLog(UserDetailsServiceAutoConfiguration.class);

    public UserDetailsServiceAutoConfiguration() {
    }

    @Bean
    public InMemoryUserDetailsManager inMemoryUserDetailsManager(SecurityProperties properties, ObjectProvider<PasswordEncoder> passwordEncoder) {
        SecurityProperties.User user = properties.getUser();
        List<String> roles = user.getRoles();
        return new InMemoryUserDetailsManager(new UserDetails[]{User.withUsername(user.getName()).password(this.getOrDeducePassword(user, (PasswordEncoder)passwordEncoder.getIfAvailable())).roles(StringUtils.toStringArray(roles)).build()});
    }

    private String getOrDeducePassword(SecurityProperties.User user, PasswordEncoder encoder) {
        String password = user.getPassword();
        if (user.isPasswordGenerated()) {
            logger.warn(String.format("%n%nUsing generated security password: %s%n%nThis generated password is for development use only. Your security configuration must be updated before running your application in production.%n", user.getPassword()));
        }

        return encoder == null && !PASSWORD_ALGORITHM_PATTERN.matcher(password).matches() ? "{noop}" + password : password;
    }
}
```

在`SecurityFilterAutoConfiguration`自动配置类中，名称为`springSecurityFilterChain`的过滤器将会被代理：

![image-20231219111837486](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231219111837486.png)

### 7.2 DefaultSecurityFilterChain

如前所述，`SecurityFilterChain`包含所有过滤器。`Spring Security`提供了默认的实现类`DefaultSecurityFilterChain`，通过`HttpSecurity.build`方法构建。可以注意到，它默认匹配所有请求，并包含了**15**个过滤器。

![image-20231219112457326](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231219112457326.png)

### 7.3 springSecurityFilterChain


在`SecurityFilterAutoConfiguration`自动配置类中，声明名称为`springSecurityFilterChain`的过滤器将被代理。那么，这个过滤器是在哪里加载的呢？

首先，在`SpringBootWebSecurityConfiguration`配置类中，默认添加了`@EnableWebSecurity`注解，启用了Spring Security应用安全配置。`@EnableWebSecurity`会导入多个配置类:

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@Import({WebSecurityConfiguration.class, SpringWebMvcImportSelector.class, OAuth2ImportSelector.class, HttpSecurityConfiguration.class})
@EnableGlobalAuthentication
public @interface EnableWebSecurity {
    boolean debug() default false;
}
```

在`WebSecurityConfiguration`中，会构建 `springSecurityFilterChain` 过滤器：

```java
@Bean(
    name = {"springSecurityFilterChain"}
)
public Filter springSecurityFilterChain() throws Exception {
    // 检查是否已经配置了 securityFilterChain
    boolean hasFilterChain = !this.securityFilterChains.isEmpty();
    // 如果没有配置过过滤器链，则定义一个基础链
    if (!hasFilterChain) {
        this.webSecurity.addSecurityFilterChainBuilder(() -> {
            // 要求所有请求都需要身份验证
            this.httpSecurity.authorizeHttpRequests((authorize) -> {
                ((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)authorize.anyRequest()).authenticated();
            });
            // 启用表单和基本身份验证
            this.httpSecurity.formLogin(Customizer.withDefaults());
            this.httpSecurity.httpBasic(Customizer.withDefaults());
            // 构建并返回安全过滤器链
            return (SecurityFilterChain)this.httpSecurity.build();
        });
    }
    // 添加所配置的安全过滤器链
    Iterator var2 = this.securityFilterChains.iterator();

    while(var2.hasNext()) {
        SecurityFilterChain securityFilterChain = (SecurityFilterChain)var2.next();
        this.webSecurity.addSecurityFilterChainBuilder(() -> {
            return securityFilterChain;
        });
    }

    // 添加自定义的 WebSecurityCustomizer
    var2 = this.webSecurityCustomizers.iterator();

    while(var2.hasNext()) {
        WebSecurityCustomizer customizer = (WebSecurityCustomizer)var2.next();
        customizer.customize(this.webSecurity);
    }
	// 构建并返回最终的 Spring Security 过滤器链
    return (Filter)this.webSecurity.build();
}
```

![image-20231219123937347](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231219123937347.png)

`springSecurityFilterChain` 会被`FilterChainProxy`代理，注册为`Bean`，并存放了所有的`SecurityFilterChain`：

![1702961016571](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/1702961016571.jpg)

springSecurityFilterChain 因为之前被声明过被 DelegatingFilterProxy 进行关联代理，最终经过层层代理，会生成完整的 DelegatingFilterProx y类型过滤器，等待请求，并执行相关逻辑。