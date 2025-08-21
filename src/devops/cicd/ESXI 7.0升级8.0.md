---
title: "ESXI 7.0升级8.0"
subtitle: "ESXI 7.0升级8.0"
date: 2025-4-10 16:06:01
category:
  - ESXI
tag:
  - ESXI
order: 10
---

## **1、开启ESXI SSH**

![img](https://beauties.eu.org/blogimg/main/img1/651a4a4f301a51693493a0360a46772baa0f197b.png@1192w.webp)

## **2、下载depot包上传至esxi存储**

教程内存储地址： /vmfs/volumes/612e96b4-3687dac8-bba7-246e9602e934/vmware-esxi-8.0-20513097-depot.zip

链接：https://pan.baidu.com/s/1IGXkRuD7rbCHyIbf30R9-g?pwd=7kef 

提取码：7kef

## **3、登录ssh并执行升级命令**

```shell
#查看当前系统版本
[root@esxi:~] vmware -lv
VMware ESXi 7.0.2 build-17867351
VMware ESXi 7.0 Update 2

#Esxi进入维护模式
[root@esxi:~] esxcli system maintenanceMode set --enable true
```

![image-20250410164759078](https://beauties.eu.org/blogimg/main/img1/image-20250410164759078.png)

```shell
#如上图找到升级包存放的目录
[root@esxi:~] esxcli software sources profile list -d /vmfs/volumes/622b8477-6dc609cc-41ad-246e9602e934/VMware-ESXi-8.0-20513097-depot.zip
Name                          Vendor        Acceptance Level  Creation Time        Modification Time
----------------------------  ------------  ----------------  -------------------  -----------------
ESXi-8.0.0-20513097-standard  VMware, Inc.  PartnerSupported  2022-09-23T18:59:28  2022-09-23T18:59:28
ESXi-8.0.0-20513097-no-tools  VMware, Inc.  PartnerSupported  2022-09-23T18:59:28  2022-09-23T18:59:28

#开始升级
[root@esxi:~] esxcli software profile update -d /vmfs/volumes/622b8477-6dc609cc-41ad-246e9602e934/VMware-ESXi-8.0-20513097-depot.zip -p ESXi-8.0.0-20513097-standard
```



如果出现以下警告可以添加--no-hardware-warning忽略

```shell
[HardwareError]
Hardware precheck of profile ESXi-8.0.0-20513097-standard failed with warnings: &lt;CPU_SUPPORT OVERRIDEWARNING: The CPUs in this host are not supported by ESXi 8.0.0. You can override and force install, but it is not officially supported nor recommended.&gt;

Apply --no-hardware-warning option to ignore the warnings and proceed with the transaction.
Please refer to the log file for more details.
```

```shell
esxcli software profile update -d /vmfs/volumes/622b8477-6dc609cc-41ad-246e9602e934/VMware-ESXi-8.0-20513097-depot.zip -p ESXi-8.0.0-20513097-standard --no-hardware-warning
```

等待命令执行结束并出现以下信息即可重启esxi

```shell
Message: The update completed successfully, but the system needs to be rebooted for the changes to be effective.
   Reboot Required: true
```

## **4、验证升级结果** 重启后UI已经更新且使用vmware -lv可见已经升级成8.0

![image-20250410164401263](https://beauties.eu.org/blogimg/main/img1/image-20250410164401263.png)



```shell
[root@esxi:~] vmware -lv
VMware ESXi 8.0.0 build-20513097
VMware ESXi 8.0 GA
```

## **5、分配新的许可证**

4V492-44210-48830-931GK-2PRJ4

![image-20250410164437726](https://beauties.eu.org/blogimg/main/img1/image-20250410164437726.png)