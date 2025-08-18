---
title: "Docker中部署Jenkins实现CI&CD"
subtitle: "Docker中部署Jenkins实现CI&CD"
date: 2025-5-10 16:06:01
category:
  - Jenkins
tag:
  - Jenkins
order: 11
---

## 一、部署说明

本章以及以最简单的方式配置使用 Jenkins 完成 `Spring Boot`、`Vue`项目的部署，整个部署操作流程如下；

![Jenkins1.drawio](https://beauties.eu.org/blogimg/main/img1/Jenkins1.drawio.png)

* 如上图所示，左边是整个项目发布的配置流程，右边是配置过程中的细节。
* 将本地对项目打包部署的过程拆解为一个个模块，在配置到 `Jenkins` 环境中，这就是 Jenkins 的作用。

## 二、环境配置

确保服务器上安装配置了 Docker 环境，并安装了  docker-compose，在配置后续的环境中可能会需要开放端口，如：`Jenkins - 9090`、`8091 - lxf-dev-tech-app` 服务。

### 1. Jenkins 部署

#### 1.1 上传文件到服务器

![image-20250515143822929](https://beauties.eu.org/blogimg/main/img1/image-20250515143822929.png)

- 如图；以上配置内容已经放到 [lxf-dev-tech-jenkins ](https://github.com/lixuanfengs/lxf-dev-tech/tree/main/lxf-dev-tech-jenkins/lxf-dev-tech-jenkins-app/docs/dev-ops)工程中，如果你是云服务器部署则需要将 dev-ops 部分全部上传到服务器的根目录下。
- compose-down.sh 是 `docker-compose `下载文件，只有你安装了 docker-compose 才能执行 `docker-compose -f docker-compose-v1.0.yml up -d`。
- jdk-down.sh 是 jdk17下载路径，以及解压脚本。
- maven 下的 settings.xml 配置，默认配置了阿里云镜像文件，方便在 Jenkins 构建项目时，可以快速地拉取下载下来包。



#### 1.2 部署脚本说明

```yaml
version: '3.9'
# 执行脚本；docker-compose -f docker-compose-v1.0.yml up -d
# https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
services:
  jenkins:
    image: jenkins/jenkins:2.510
    container_name: jenkins
    privileged: true
    user: root
    ports:
      - "9090:8080"
      - "50001:50000"
    volumes:
      - /etc/localtime:/etc/localtime:ro #:ro 以只读方式挂载，防止容器更改宿主机时间。
  	  - /etc/timezone:/etc/timezone:ro
      - ./jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/local/bin/docker
      - ./maven/conf/settings.xml:/usr/local/maven/conf/settings.xml
      - ./maven/apache-maven-3.9.9:/usr/local/maven/apache-maven-3.9.9
    #      - /dev-ops/jdk/jdk-17.0.15:/usr/local/jdk-17.0.15
    environment:
      - TZ=Asia/Shanghai
      - JAVA_OPTS=-Djenkins.install.runSetupWizard=false # 禁止安装向导「如果需要密码则不要配置」docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
    restart: unless-stopped

volumes:
  jenkins_home:
```

* `/etc/localtime` 包含当前时区的具体时间数据；
* `/etc/timezone` 部分发行版（如 Debian/Ubuntu）用来设置系统时区；
* `./jenkins_home:/var/jenkins_home` 把 Jenkins 的工作目录（插件、作业配置、系统设置等）永久保存到宿主机的 `jenkins_home` 文件夹。容器删掉后数据仍在，下一次 `docker-compose up` 会自动复用。

- `/var/run/docker.sock:/var/run/docker.sock` 把宿主机 Docker daemon 的 Unix Socket 暴露给容器。这样 Jenkins 里运行的 Job 可以直接调用宿主机 Docker（例如流水线里执行 `docker build`、`docker push`）。
- `/usr/bin/docker:/usr/local/bin/docker` 把宿主机的 Docker CLI（二进制文件）放进容器，让 Jenkins 拥有 `docker` 命令。通常与上一行的 sock 一起使用。
- `/dev-ops/maven/conf/settings.xml:/usr/local/maven/conf/settings.xml` 把宿主机自定义的 Maven `settings.xml` 放到容器里，统一仓库镜像、私服认证等配置。
- `/dev-ops/maven/apache-maven-3.9.9:/usr/local/maven/apache-maven-3.9.9` 把一整套 Maven 发行版挂进容器，省去每次启动都下载 Maven 的时间，并确保版本一致。
- `/dev-ops/jdk/jdk-17.0.15:/usr/local/jdk-17.0.15`如果需要也可将宿主 JDK 挂进来，避免镜像里额外安装。
- `TZ=Asia/Shanghai`  这种方式只影响容器内程序的“时区显示”，不保证时间与宿主机完全一致，且不会影响系统时间。
- `JAVA_OPTS=-Djenkins.install.runSetupWizard=false` 这个是一个禁止安装向导，配置为 false 后，则 Jenkins 不会让你设置密码，也不会一开始就安装一堆插件。如果你需要安装向导可以注释掉这个配置。并且当提示你获取密码时，你可以执行；`docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword` 获取到登录密码

#### 1.3 执行安装

```shell
root@rag-host:/work/jenkins/dev-ops# docker compose -f docker-compose-v1.0.yml up -d
WARN[0000] /work/jenkins/dev-ops/docker-compose-v1.0.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion
[+] Running 13/13
 ✔ jenkins Pulled                                                                                                                                                                           85.1s
   ✔ cf05a52c0235 Pull complete                                                                                                                                                             30.0s
   ✔ abe2f5ac32ce Pull complete                                                                                                                                                             32.0s
   ✔ cc732753ed96 Pull complete                                                                                                                                                             32.1s
   ✔ 297e5fa4eccf Pull complete                                                                                                                                                             32.1s
   ✔ 9ea3a959459c Pull complete                                                                                                                                                             32.3s
   ✔ 4f6765be549b Pull complete                                                                                                                                                             59.8s
   ✔ c8630c3fa134 Pull complete                                                                                                                                                             59.8s
   ✔ d9812bfb002c Pull complete                                                                                                                                                             59.9s
   ✔ b4c1a8dd5baf Pull complete                                                                                                                                                             81.6s
   ✔ 58668c68a1a7 Pull complete                                                                                                                                                             81.6s
   ✔ 028b908db677 Pull complete                                                                                                                                                             81.9s
   ✔ 7242411434e5 Pull complete                                                                                                                                                             82.0s
[+] Running 2/2
 ✔ Network dev-ops_default  Created                                                                                                                                                          0.1s
 ✔ Container jenkins        Started   
```

执行脚本 `docker-compose -f docker-compose-v1.0.yml up -d` 后，输出内容如上代表 Jenkins 安装成功❀！

### 2. 插件安装

地址：[http://192.168.1.23:9090/ - `登录Jenkins`

![image-20250515160829529](https://beauties.eu.org/blogimg/main/img1/image-20250515160829529.png)

![image-20250515161124841](https://beauties.eu.org/blogimg/main/img1/image-20250515161124841.png)

- 1~2步，设置镜像源，设置后重启一下 Jenkins。 镜像源地址：https://eastamerica.cloudflare.jenkins.io/current/update-center.json
- 3~4步，下载插件，先下载安装 chinese 汉化插件.
- 5步，所有的插件安装完成后，都需要重启才会生效。`安装完 chinese 插件，重启在进入到 Jenkins 就是汉化的页面了`
- 除了以上步骤，还需要同样的方式安装 maven、git、docker 插件。
- 注意，因为网络问题你可以再做过程中，提示失败。没关系，你可以再搜这个插件，再重新下载。它会把失败的继续下载。

### 3. 全局工具配置

![image-20250515164145512](https://beauties.eu.org/blogimg/main/img1/image-20250515164145512.png)

用于构建部署的 SpringBoot 应用的环境，都需要在全局工具中配置好。包括；Maven、JDK、Git、Docker。

###  4. 添加凭证

![image-20250515165434711](https://beauties.eu.org/blogimg/main/img1/image-20250515165434711.png)

* 只有配置了 git 仓库的连接凭证，才能从Git仓库拉取代码。
* 如果你还需要操作如 ssh 也需要配置凭证。

## 三、新建任务

一个任务就是一条构建发布部署项目的操作。

### 1. 配置任务

![image-20250515170238346](https://beauties.eu.org/blogimg/main/img1/image-20250515170238346.png)

### 2. 配置Git

![image-20250515173728453](https://beauties.eu.org/blogimg/main/img1/image-20250515173728453.png)

### 3. 配置Maven

![image-20250515173912340](https://beauties.eu.org/blogimg/main/img1/image-20250515173912340.png)

- 在高级中设置 Maven 配置的路径 `/usr/local/maven/conf/settings.xml`。这样才能走自己配置的阿里云镜像仓库。

  ```shell
  clean install -Dmaven.test.skip=true
  ```

### 3. 配置Shell

```shell
# 先删除之前的容器和镜像文件
if [ "$(docker ps -a | grep lxf-dev-tech-jenkins-app)" ]; then
docker stop lxf-dev-tech-jenkins-app
docker rm lxf-dev-tech-jenkins-app
fi
if [ "$(docker images -q lxf-dev-tech-jenkins-app)" ]; then
docker rmi lxf-dev-tech-jenkins-app
fi

# 重新生成
cd /var/jenkins_home/workspace/lxf-dev-tech-jenkins/lxf-dev-tech-jenkins-app
docker build -t cactusli/lxf-dev-tech-jenkins-app .
docker run -itd -p 8091:8091 --name lxf-dev-tech-jenkins-app cactusli/lxf-dev-tech-jenkins-app
```

![image-20250515174752475](https://beauties.eu.org/blogimg/main/img1/image-20250515174752475.png)

* 如图当熟练使用后，就可以探索更多的发布部署流程，比如这里只是做build 但不做run执行操作。具体的部署可以通过 docker compose 执行部署脚本。



## 四、测试验证

###  1. 准备测试项目

项目地址：https://github.com/lixuanfengs/lxf-dev-tech/tree/main/lxf-dev-tech-jenkins/  可以下载下来导入到 gitee 、gitlab 等仓库进行使用。

```java
package cn.cactusli.jenkins.app;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;

import java.io.IOException;

@SpringBootApplication
@RestController
@RequestMapping("/api/")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    /**
     * http://localhost:8091/api/test
     */
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseBodyEmitter test(HttpServletResponse response) {
        response.setContentType("text/event-stream");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache");

        ResponseBodyEmitter emitter = new ResponseBodyEmitter();

        String[] words = new String[]{"嗨，臭宝。\r\n", "恭喜💐 ", "你的", " Jenkins ", "部", "署", "测", "试", "成", "功", "了啦🌶！","\r\nBy 仙人球 https://cactusli.net"};
        new Thread(() -> {
            for (String word : words) {
                try {
                    emitter.send(word);
                    Thread.sleep(250);
                } catch (IOException | InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();

        return emitter;
    }


}
```

* 项目中提供了 RestApi; http://192.168.1.23:8091/api/test

### 2. CI&CD - 构建发布

**访问地址**：http://192.168.1.23:9090/job/lxf-dev-tech-jenkins/

![image-20250516111118664](https://beauties.eu.org/blogimg/main/img1/image-20250516111118664.png)

- 点击构建项目，最终会完成构建和部署成功。运行到这代表你全部操作完成了。

###  3. 验证结果

**访问**：http://192.168.1.23:8091/api/test

![image-20250516111251716](https://beauties.eu.org/blogimg/main/img1/image-20250516111251716.png)

- 如图代表你已经完整的配置好了整个 Jenkins CI&CD 流程。

## 五、扩展

这是一个 Jenkins 流水线脚本，用于自动化构建、打包和部署两个前端项目（cactus-ui-admin-vue3 和 shenzhen-web），最终将它们打包为一个 Nginx 服务的 Docker 镜像并通过 Docker Compose 部署到远程服务器。

### 1. Pipeline脚本部署前端项目

```groovy
pipeline {
    agent any
    tools {
        nodejs 'NodeJS-18.20.8' // 假设Jenkins已配置NodeJS工具
    }
    environment {
        CACTUS_UI_REPO = 'http://192.168.1.19:8929/root/cactus-ui-admin-vue3.git'
        SHENZHEN_WEB_REPO = 'http://192.168.1.19:8929/root/shenzhen-web.git'
        SSH_CONFIG_NAME = 'sg-server' // Jenkins "Publish over SSH" 中配置的服务器名称
        GIT_CREDENTIALS_ID = 'a71a582f-eb89-4a76-9ef0-7e572e572bad'


        CACTUS_UI_DIR = 'cactus-ui-admin-vue3'
        SHENZHEN_WEB_DIR = 'shenzhen-web'

        DOCKER_CREDENTIALS_ID = '68b87c8d-77bc-4d4b-b09b-0b24bc7d7fa2'
        // Docker 镜像名称 - 根据您的实际情况修改
        DOCKER_IMAGE_NAME = "218.249.73.244:8443/cactuslixf/sg-nginx" // 例如：yourdockerhubusername/multi-static-app
        DOCKER_IMAGE_TAG = "latest" // 例如：latest

        // Docker Compose 相关配置 (需要在远程服务器 sg-server 上实际存在)
        // 远程服务器上 docker-compose.yml 文件所在的绝对路径
        REMOTE_COMPOSE_PROJECT_DIR = "/work/projects/cactus-pipeline/" // <<== 【用户必须修改】
        // docker-compose.yml 文件中定义的 Nginx 服务名称
        REMOTE_NGINX_SERVICE_NAME = "sg-nginx" // <<== 【用户必须修改】
    }

    stages {
        stage('Checkout Projects') {
            parallel {
                stage('Checkout Cactus UI Project') {
                    steps {
                        dir("${env.CACTUS_UI_DIR}") {
                            git url: "${CACTUS_UI_REPO}", branch: 'main', credentialsId: "${GIT_CREDENTIALS_ID}"
                        }
                    }
                }
                stage('Checkout Shenzhen Web Project') {
                    steps {
                        dir("${env.SHENZHEN_WEB_DIR}") {
                            git url: "${SHENZHEN_WEB_REPO}", branch: 'master', credentialsId: "${GIT_CREDENTIALS_ID}"
                        }
                    }
                }
            }
        }

        stage('Install Project Dependencies') {
            parallel {
                stage('Install Cactus UI Dependencies') {
                    steps {
                        dir("${env.CACTUS_UI_DIR}") {
                            //sh 'rm -rf node_modules'
                            sh 'npm config set registry https://registry.npmmirror.com'
                            sh 'npm install'
                        }
                    }
                }
                stage('Install Shenzhen Web Dependencies') {
                    steps {
                        dir("${env.SHENZHEN_WEB_DIR}") {
                            //sh 'rm -rf node_modules'
                            sh 'npm config set registry https://registry.npmmirror.com'
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build Projects') {
            parallel {
                stage('Build Cactus UI Project') {
                    steps {
                        dir("${env.CACTUS_UI_DIR}") {
                            // 重要: 确保此构建命令生成的应用能够正确处理其运行时的基础路径 (base path)
                            // 例如，如果最终通过 Nginx 以 /cactus-ui/ 访问，Vue app 的 publicPath 需要配置为 /cactus-ui/
                            // sh 'rm -rf dist-dev'
                            sh 'npm run build:dev'
                        }
                    }
                }
                stage('Build Shenzhen Web Project') {
                    steps {
                        dir("${env.SHENZHEN_WEB_DIR}") {
                            // 重要: 同上，确保应用构建时考虑了最终的访问路径
                            // sh 'rm -rf dist'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Prepare Docker Context') {
            steps {
                script {
                    sh 'mkdir -p docker-context/cactus-ui-dist'
                    sh 'mkdir -p docker-context/shenzhen-web-dist'

                    sh "cp -R ${env.CACTUS_UI_DIR}/dist-dev/* docker-context/cactus-ui-dist/"
                    sh "cp -R ${env.SHENZHEN_WEB_DIR}/dist/* docker-context/shenzhen-web-dist/"

                    // 写入简化后的 Dockerfile (不包含 Nginx 配置)
                    writeFile file: 'docker-context/Dockerfile', text: """\
                        FROM nginx:alpine
                        
                        RUN mkdir -p /usr/share/nginx/html/cactus-ui-admin && \
                            mkdir -p /usr/share/nginx/html/shenzhen-web
                        
                        COPY cactus-ui-dist /usr/share/nginx/html/v2_admin/
                        COPY shenzhen-web-dist /usr/share/nginx/html/v2/
                        
                        EXPOSE 80
                        EXPOSE 443
                        """
                    echo "Dockerfile prepared in docker-context directory."
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    def fullImageNameWithTag = "${env.DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG}"
                    def fullImageNameLatest = "${env.DOCKER_IMAGE_NAME}:latest"

                    echo "Building Docker image: ${fullImageNameWithTag} and ${fullImageNameLatest}"

                    dir('docker-context') {
                        sh "docker build -t ${fullImageNameWithTag} ."
                        sh "docker tag ${fullImageNameWithTag} ${fullImageNameLatest}"
                    }

                    // (可选) 推送到 Docker 仓库
                    // 请确保在此之前已经配置了 Docker 仓库的登录凭据
                    withCredentials([usernamePassword(credentialsId: "${env.DOCKER_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo \"\${DOCKER_PASS}\" | docker login -u \"\${DOCKER_USER}\"  --password-stdin 218.249.73.244:8443"
                        // 替换为你的仓库地址
                    }
                    sh "docker push ${fullImageNameWithTag}"
                    sh "docker push ${fullImageNameLatest}"
                    echo "Docker images pushed: ${fullImageNameWithTag}, ${fullImageNameLatest}"


                    echo "Docker images built: ${fullImageNameWithTag}, ${fullImageNameLatest}"
                }
            }
        }

        stage('Deploy via Docker Compose') {
            steps {
                echo "Deploying service ${env.REMOTE_NGINX_SERVICE_NAME} on ${env.SSH_CONFIG_NAME} using image ${env.DOCKER_IMAGE_NAME}:latest"
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: "${SSH_CONFIG_NAME}",
                        transfers: [
                            sshTransfer(
                                    // 指定本地文件或目录路径
                                    //sourceFiles: "docker-compose.yml, docker-context/**",
                                    // 远程服务器的目标目录
                                    //remoteDirectory: "${REMOTE_COMPOSE_PROJECT_DIR}",
                                    // 执行的命令（可选）
                                    execCommand: """
                                        set -x  # 执行命令前打印命令
                                        cd ${env.REMOTE_COMPOSE_PROJECT_DIR}
                                        docker compose -f cactus-server-pipeline-compose.yml down
                                        docker compose -f cactus-server-pipeline-compose.yml pull
                                        docker compose -f cactus-server-pipeline-compose.yml up -d
                                    """
                            )
                        ]
                    )
                ])
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! Docker Image: ${env.DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG} and :latest"
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Cleaning up Jenkins workspace...'
            sh 'rm -rf docker-context' // 清理 Docker 构建上下文目录
        }
    }
}
```

**主要功能：**

* 并行检出代码：
  - 从 Git 仓库`（cactus-ui-admin-vue3 和 shenzhen-web）`并行检出代码到指定目录。
  - 使用配置的` Git 凭据（GIT_CREDENTIALS_ID）和指定的分支（main 和 master）`。

* 并行安装依赖：
  * 在两个项目目录中分别运行` npm install`，使用国内镜像源`（https://registry.npmmirror.com）`加速依赖安装。

* 并行构建项目：

  * 对 `cactus-ui-admin-vue3` 执行 `npm run build:dev`，生成 `dist-dev` 目录。

  * 对 `shenzhen-web` 执行 `npm run build`，生成 `dis`t 目录。

* 准备 Docker 上下文：

  - 创建 `docker-context` 目录，将两个项目的构建输出（`dist-dev 和 dist`）复制到对应子目录。

  - 生成一个简单的 `Dockerfile`，基于` nginx:alpine` 镜像，将构建输出复制到 `Nginx` 的静态文件目录`（/usr/share/nginx/html/v2_admin/ 和 /usr/share/nginx/html/v2/`）。

* 构建并推送 Docker 镜像：

  - 在 `docker-context` 目录中构建` Docker` 镜像，命名为` DOCKER_IMAGE_NAME:DOCKER_IMAGE_TAG` 和 `latest `标签。

  - 使用配置的 `Docker` 凭据`（DOCKER_CREDENTIALS_ID）`登录到私有 `Docker` 仓库（`218.249.73.244:8443`）。

  - 推送构建的镜像到仓库。

* 通过 `Docker Compose` 部署：

  - 使用` Jenkins` 的`Publish over SSH` 插件连接远程服务器（`SSH_CONFIG_NAME`）。

  - 在远程服务器的指定目录（`REMOTE_COMPOSE_PROJECT_DIR`）执行` Docker Compose` 命令：

    - 停止现有服务（docker compose down）。

    - 拉取最新镜像（docker compose pull）。

    - 启动服务（docker compose up -d）。

      ```yml
      version: '3.8' # Specify a Docker Compose version
      
      services:
        sg-nginx:
          image: 218.249.73.244:8443/cactuslixf/sg-nginx:latest
          container_name: sg-nginx
          ports:
            - "8081:80"
            - "4431:443"
          environment:
            - TZ=Asia/Shanghai
          volumes:
            - /work/projects/cactus-pipeline/nginx/nginx.conf:/etc/nginx/nginx.conf
            - /work/projects/cactus-pipeline/nginx/conf.d:/etc/nginx/conf.d
            - /work/projects/cactus-pipeline/nginx/logs:/var/log/nginx
            - /work/projects/cactus-pipeline/nginx/cert:/etc/nginx/cert
            #- /work/projects/cactus-pipeline/nginx/html:/usr/share/nginx/html
          restart: always
          logging:
            driver: "json-file"
            options:
              max-size: "10m"
              max-file: "3"
          networks:
            - sg_network
      
      networks:
        sg_network:
          driver: bridge
      ```

* 后期处理:
  * **成功**：打印成功信息，包括使用的 Docker 镜像名称和标签。
  *  **失败**：打印失败信息。
  * **始终执行**：清理 Jenkins 工作空间中的 docker-context 目录。

### 2. 配置全局工具 nodejs

脚本中使用到了 `nodej` , 因此需要配置全局 `nodejs` 工具。

配置 Node.js，需进入容器内部：

```shell
docker exec -it jenkins bash
```

在容器中手动安装 Node.js（以 Node.js 20 为例）：

```shell
# 更新包索引 
apt-get update 
# 安装 curl（若未安装） 
apt-get install -y curl 
# 下载并安装 Node.js 
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - 
apt-get install -y nodejs 
# 验证安装 
node -v 
npm -v
```

jenkins 全局工具配置nodejs：

![image-20250528110658876](https://beauties.eu.org/blogimg/main/img1/image-20250528110658876.png)

### 3. 后端项目部署配置

源码管理：

![image-20250528111012779](https://beauties.eu.org/blogimg/main/img1/image-20250528111012779.png)

编译 Build：

![image-20250528111118273](https://beauties.eu.org/blogimg/main/img1/image-20250528111118273.png)



Post Steps：

![image-20250528111227566](https://beauties.eu.org/blogimg/main/img1/image-20250528111227566.png)

![image-20250528112546790](https://beauties.eu.org/blogimg/main/img1/image-20250528112546790.png)

SSH Publishers（需要在插件管理安装 SSH Publisher），然后在`系统管理`中配置远程 SSH Servers:

![image-20250528111539619](https://beauties.eu.org/blogimg/main/img1/image-20250528111539619.png)

![image-20250528111558029](https://beauties.eu.org/blogimg/main/img1/image-20250528111558029.png)

滚动升级后端项目执行脚本：

```bash
#!/bin/bash
# 变量定义
COMPOSE_FILE="/work/projects/cactus-server-all/sg-cactus-server.yml"
NGINX_CONF="/work/projects/cactus-pipeline/nginx/nginx.conf"
NGINX_CONTAINER="sg-nginx"
BACKEND_1="192.168.11.25:58080"
BACKEND_2="192.168.11.25:58081"
NEW_IMAGE="218.249.73.244:8443/cactuslixf/cactus-server:latest"
LOG_FILE="/work/projects/cactus-server-all/upgrade.log"

# 确保日志目录存在
mkdir -p $(dirname $LOG_FILE)

# 日志函数：添加时间戳并写入日志文件
log() {
    local message="$1"
    echo "$(date '+%Y-%m-%d %H:%M:%S') $message" | tee -a $LOG_FILE
}

# 备份当前配置
log "备份当前配置文件..."
cp $COMPOSE_FILE ${COMPOSE_FILE}.bak 2>&1 | tee -a $LOG_FILE
cp $NGINX_CONF ${NGINX_CONF}.bak 2>&1 | tee -a $LOG_FILE

# 拉取新镜像
log "拉取新镜像..."
docker pull $NEW_IMAGE 2>&1 | tee -a $LOG_FILE

# 函数：更新 Nginx 配置
update_nginx_config() {
    local backend=$1
    local weight=$2
    log "更新 Nginx 配置: $backend weight=$weight"
    sed -i "s/server $backend weight=[0-9];/server $backend weight=$weight;/" $NGINX_CONF
    docker exec $NGINX_CONTAINER nginx -t 2>&1 | tee -a $LOG_FILE && \
    docker exec $NGINX_CONTAINER nginx -s reload 2>&1 | tee -a $LOG_FILE
}

# 升级第一个实例
log "升级第一个实例 ($BACKEND_1)..."
# 将流量完全导向第二个实例
update_nginx_config $BACKEND_1 0
update_nginx_config $BACKEND_2 1

# 停止并更新第一个实例
log "停止并更新第一个实例..."
docker compose -f $COMPOSE_FILE stop sg-cactus-server-1 2>&1 | tee -a $LOG_FILE
docker compose -f $COMPOSE_FILE up -d sg-cactus-server-1 2>&1 | tee -a $LOG_FILE

# 验证新实例运行
log "验证 $BACKEND_1 运行状态..."
sleep 10
if docker compose -f $COMPOSE_FILE logs sg-cactus-server-1 2>&1 | grep -q "started"; then
    log "$BACKEND_1 升级成功"
else
    log "ERROR: $BACKEND_1 升级失败，恢复 Nginx 配置..."
    cp ${NGINX_CONF}.bak $NGINX_CONF 2>&1 | tee -a $LOG_FILE
    docker exec $NGINX_CONTAINER nginx -s reload 2>&1 | tee -a $LOG_FILE
    exit 1
fi

# 恢复流量平衡
log "恢复流量平衡..."
update_nginx_config $BACKEND_1 1
update_nginx_config $BACKEND_2 1

# 升级第二个实例
log "升级第二个实例 ($BACKEND_2)..."
# 将流量完全导向第一个实例
update_nginx_config $BACKEND_2 0
update_nginx_config $BACKEND_1 1

# 停止并更新第二个实例
log "停止并更新第二个实例..."
docker compose -f $COMPOSE_FILE stop sg-cactus-server-2 2>&1 | tee -a $LOG_FILE
docker compose -f $COMPOSE_FILE up -d sg-cactus-server-2 2>&1 | tee -a $LOG_FILE

# 验证新实例运行
log "验证 $BACKEND_2 运行状态..."
sleep 10
if docker compose -f $COMPOSE_FILE logs sg-cactus-server-2 2>&1 | grep -q "started"; then
    log "$BACKEND_2 升级成功"
else
    log "ERROR: $BACKEND_2 升级失败，恢复 Nginx 配置..."
    cp ${NGINX_CONF}.bak $NGINX_CONF 2>&1 | tee -a $LOG_FILE
    docker exec $NGINX_CONTAINER nginx -s reload 2>&1 | tee -a $LOG_FILE
    exit 1
fi

# 恢复流量平衡
log "恢复流量平衡..."
update_nginx_config $BACKEND_1 1
update_nginx_config $BACKEND_2 1

# 清理
log "清理旧镜像..."
docker image prune -f 2>&1 | tee -a $LOG_FILE

log "升级完成！"
```

远程机器上的 `sg-cactus-server.yml`:

```yml
version: '3.8'

services:
  sg-cactus-server-1:
    image: 218.249.73.244:8443/cactuslixf/cactus-server
    container_name: sg-cactus-server-1
    privileged: true
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - JAVA_OPTS=-Xms4096m -Xmx14336m
      - TZ=Asia/Shanghai
    ports:
      - 58080:48080
    volumes:
      - /work/projects/cactus-server-all/sg-cactus-server-1:/root/logs/
    restart: unless-stopped
    networks:
      - sg_network
  sg-cactus-server-2:
    image: 218.249.73.244:8443/cactuslixf/cactus-server
    container_name: sg-cactus-server-2
    privileged: true
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - JAVA_OPTS=-Xms4096m -Xmx14336m
      - TZ=Asia/Shanghai
    ports:
      - 58081:48080
    volumes:
      - /work/projects/cactus-server-all/sg-cactus-server-2:/root/logs/
    restart: unless-stopped
    networks:
      - sg_network
networks:
  sg_network:
    driver: bridge
```

