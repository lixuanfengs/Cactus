---
title: Cloudflare 优选IP 进阶优化指南
icon: rocket
date: 2025-01-15
category:
  - 资源导航
  - Cloudflare
tag:
  - 优选IP
  - 高级配置
  - 自动化
  - 性能优化
star: true
---

# Cloudflare 优选IP 进阶优化指南

## 高级测试策略

### 多维度测试方法

传统的ping测试只能反映基本的连通性，进阶优化需要考虑更多维度：

#### 1. HTTP响应时间测试

```bash
#!/bin/bash
# 高级HTTP测试脚本
test_http_response() {
    local ip=$1
    local domain=$2
    
    curl -w "@curl-format.txt" \
         -o /dev/null \
         -s \
         --resolve $domain:443:$ip \
         https://$domain/ \
         --connect-timeout 10 \
         --max-time 30
}

# curl-format.txt 内容
echo "time_namelookup: %{time_namelookup}s
time_connect: %{time_connect}s
time_appconnect: %{time_appconnect}s
time_pretransfer: %{time_pretransfer}s
time_redirect: %{time_redirect}s
time_starttransfer: %{time_starttransfer}s
time_total: %{time_total}s
speed_download: %{speed_download} bytes/s" > curl-format.txt
```

#### 2. 下载速度测试

```python
import requests
import time
import threading
from concurrent.futures import ThreadPoolExecutor

class AdvancedSpeedTest:
    def __init__(self, test_url="https://speed.cloudflare.com/__down?bytes=25000000"):
        self.test_url = test_url
        self.results = {}
    
    def test_ip(self, ip, domain, test_duration=30):
        """测试单个IP的下载速度"""
        session = requests.Session()
        session.headers.update({
            'Host': domain,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        total_bytes = 0
        start_time = time.time()
        
        try:
            while time.time() - start_time < test_duration:
                response = session.get(
                    f"http://{ip}/__down?bytes=1000000",
                    timeout=10,
                    stream=True
                )
                
                chunk_start = time.time()
                for chunk in response.iter_content(chunk_size=8192):
                    total_bytes += len(chunk)
                    if time.time() - start_time >= test_duration:
                        break
                        
        except Exception as e:
            print(f"Error testing {ip}: {e}")
            return 0
            
        duration = time.time() - start_time
        speed_mbps = (total_bytes * 8) / (duration * 1000000)  # Mbps
        
        return {
            'ip': ip,
            'speed_mbps': speed_mbps,
            'total_bytes': total_bytes,
            'duration': duration
        }
```

### 智能IP池管理

#### 动态IP池更新

```python
class SmartIPPool:
    def __init__(self):
        self.ip_pool = []
        self.performance_history = {}
        self.blacklist = set()
    
    def evaluate_ip(self, ip):
        """综合评估IP性能"""
        scores = {
            'latency': self.test_latency(ip),
            'stability': self.test_stability(ip),
            'speed': self.test_speed(ip),
            'availability': self.test_availability(ip)
        }
        
        # 加权计算总分
        weights = {'latency': 0.3, 'stability': 0.3, 'speed': 0.25, 'availability': 0.15}
        total_score = sum(scores[key] * weights[key] for key in scores)
        
        return total_score, scores
    
    def auto_update_pool(self):
        """自动更新IP池"""
        current_pool = self.get_cloudflare_ip_ranges()
        
        with ThreadPoolExecutor(max_workers=50) as executor:
            futures = []
            for ip in current_pool:
                if ip not in self.blacklist:
                    future = executor.submit(self.evaluate_ip, ip)
                    futures.append((ip, future))
            
            results = []
            for ip, future in futures:
                try:
                    score, details = future.result(timeout=60)
                    results.append((ip, score, details))
                except Exception as e:
                    self.blacklist.add(ip)
                    
        # 按分数排序，取前20个
        results.sort(key=lambda x: x[1], reverse=True)
        self.ip_pool = [item[0] for item in results[:20]]
        
        return self.ip_pool
```

## 负载均衡与故障转移

### 智能负载均衡

```nginx
# nginx 高级配置
upstream cloudflare_pool {
    # 主力IP池 - 权重较高
    server 104.16.123.96:443 weight=3 max_fails=2 fail_timeout=30s;
    server 104.16.124.96:443 weight=3 max_fails=2 fail_timeout=30s;
    server 104.16.125.96:443 weight=3 max_fails=2 fail_timeout=30s;
    
    # 备用IP池 - 权重较低
    server 104.17.123.96:443 weight=1 max_fails=3 fail_timeout=60s backup;
    server 104.17.124.96:443 weight=1 max_fails=3 fail_timeout=60s backup;
    
    # 健康检查
    keepalive 32;
    keepalive_requests 1000;
    keepalive_timeout 60s;
}

server {
    listen 443 ssl http2;
    server_name example.com;
    
    # SSL 配置
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    
    location / {
        proxy_pass https://cloudflare_pool;
        
        # 高级代理设置
        proxy_ssl_server_name on;
        proxy_ssl_name $host;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 超时设置
        proxy_connect_timeout 10s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
        
        # 重试机制
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_next_upstream_tries 3;
        proxy_next_upstream_timeout 60s;
    }
    
    # 健康检查端点
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### DNS 智能解析

```python
# 智能DNS解析脚本
import dns.resolver
import json
from datetime import datetime

class SmartDNS:
    def __init__(self):
        self.ip_pool = []
        self.geo_mapping = {}
    
    def get_optimal_ips_by_location(self, client_ip):
        """根据客户端位置返回最优IP"""
        client_location = self.get_client_location(client_ip)
        
        if client_location in self.geo_mapping:
            return self.geo_mapping[client_location]
        else:
            # 返回全球最优IP
            return self.ip_pool[:3]
    
    def update_dns_records(self):
        """动态更新DNS记录"""
        # 这里可以对接DNS服务商API
        # 如：阿里云DNS、腾讯云DNS等
        pass

# PowerDNS Lua 脚本示例
lua_script = '''
function preresolve(dq)
    if dq.qtype == pdns.A and dq.qname:equal("example.com") then
        local client_subnet = dq:getEDNSSubnet()
        local optimal_ips = get_optimal_ips(client_subnet)
        
        for _, ip in ipairs(optimal_ips) do
            dq:addAnswer(pdns.A, ip, 60)  -- TTL 60秒
        end
        
        dq.rcode = 0
        return true
    end
    return false
end

function get_optimal_ips(subnet)
    -- 根据客户端子网返回最优IP
    local geo_db = {
        ["CN"] = {"104.16.123.96", "104.16.124.96"},
        ["US"] = {"104.17.123.96", "104.17.124.96"},
        ["EU"] = {"104.18.123.96", "104.18.124.96"}
    }
    
    local country = get_country_by_ip(subnet)
    return geo_db[country] or geo_db["CN"]
end
'''
```

## 监控与告警系统

### 实时监控脚本

```python
import time
import smtplib
from email.mime.text import MIMEText
import requests
import logging

class CloudflareMonitor:
    def __init__(self, config):
        self.config = config
        self.logger = self.setup_logging()
        self.alert_threshold = {
            'latency': 200,  # ms
            'error_rate': 5,  # %
            'availability': 95  # %
        }
    
    def monitor_loop(self):
        """主监控循环"""
        while True:
            try:
                for ip in self.config['ip_pool']:
                    metrics = self.collect_metrics(ip)
                    
                    if self.should_alert(metrics):
                        self.send_alert(ip, metrics)
                        
                    if self.should_remove_from_pool(metrics):
                        self.remove_from_pool(ip)
                        
                    self.log_metrics(ip, metrics)
                
                time.sleep(self.config['check_interval'])
                
            except Exception as e:
                self.logger.error(f"Monitor error: {e}")
    
    def collect_metrics(self, ip):
        """收集IP性能指标"""
        start_time = time.time()
        
        try:
            response = requests.get(
                f"https://{ip}/",
                headers={'Host': self.config['domain']},
                timeout=30,
                verify=False
            )
            
            latency = (time.time() - start_time) * 1000
            success = response.status_code == 200
            
            return {
                'ip': ip,
                'latency': latency,
                'success': success,
                'status_code': response.status_code,
                'timestamp': time.time()
            }
            
        except Exception as e:
            return {
                'ip': ip,
                'latency': 9999,
                'success': False,
                'error': str(e),
                'timestamp': time.time()
            }
    
    def send_alert(self, ip, metrics):
        """发送告警通知"""
        subject = f"Cloudflare IP Alert: {ip}"
        body = f"""
        IP: {ip}
        Latency: {metrics['latency']}ms
        Success: {metrics['success']}
        Time: {datetime.fromtimestamp(metrics['timestamp'])}
        
        Threshold exceeded. Please check immediately.
        """
        
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = self.config['email']['from']
        msg['To'] = self.config['email']['to']
        
        # 发送邮件逻辑...
```

### Grafana 监控面板

```json
{
  "dashboard": {
    "title": "Cloudflare IP Performance",
    "panels": [
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "avg_over_time(cloudflare_response_time[5m])",
            "legendFormat": "{{ip}}"
          }
        ]
      },
      {
        "title": "Success Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "rate(cloudflare_requests_total[5m]) * 100",
            "legendFormat": "Success Rate %"
          }
        ]
      },
      {
        "title": "Top 10 IPs by Speed",
        "type": "table",
        "targets": [
          {
            "expr": "topk(10, cloudflare_download_speed)",
            "format": "table"
          }
        ]
      }
    ]
  }
}
```

## 自动化部署方案

### Docker 容器化部署

```dockerfile
# Dockerfile
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY update-ips.sh /usr/local/bin/
COPY monitor.py /usr/local/bin/

RUN apk add --no-cache python3 py3-pip curl \
    && pip3 install requests schedule

# 定时更新IP
RUN echo "0 */4 * * * /usr/local/bin/update-ips.sh" | crontab -

CMD ["sh", "-c", "crond -l 2 -f & nginx -g 'daemon off;'"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  cloudflare-proxy:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./certs:/etc/ssl/certs
      - ./logs:/var/log/nginx
    environment:
      - DOMAIN=example.com
      - UPDATE_INTERVAL=4h
    restart: unless-stopped
    
  monitor:
    image: python:3.9-slim
    volumes:
      - ./monitor.py:/app/monitor.py
    command: python /app/monitor.py
    restart: unless-stopped
    depends_on:
      - cloudflare-proxy
```

## 性能调优建议

### 系统级优化

```bash
# Linux 系统优化
# /etc/sysctl.conf
net.core.somaxconn = 65535
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_max_syn_backlog = 65535
net.ipv4.tcp_keepalive_time = 600
net.ipv4.tcp_keepalive_intvl = 30
net.ipv4.tcp_keepalive_probes = 3
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_rmem = 4096 87380 67108864
net.ipv4.tcp_wmem = 4096 65536 67108864
```

### 应用级优化

```javascript
// Node.js 优化示例
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    const app = require('./app');
    const server = app.listen(3000, () => {
        console.log(`Worker ${process.pid} started`);
    });
    
    // 连接池优化
    server.keepAliveTimeout = 65000;
    server.headersTimeout = 66000;
}
```

## 总结

进阶的 Cloudflare 优选IP 策略需要综合考虑多个维度，包括性能测试、负载均衡、监控告警和自动化部署。通过系统化的方法，可以构建一个高效、稳定的 CDN 加速方案。

## 相关资源

- [基础教程](/resources/cloudflare-优选ip/basic-tutorial.md)
- [监控脚本下载](https://github.com/example/cloudflare-monitor)
- [Docker 镜像](https://hub.docker.com/r/example/cloudflare-proxy)