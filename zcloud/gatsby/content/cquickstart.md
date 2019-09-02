---
title: "快速入门"
metaTitle: "快速入门"
metaDescription: "快速入门"
---
## 快速入门

本教程将指导您完成:

- 部署一个数据库，Mysql；

- 部署一个应用程序，Wordpress；

操作本教程之前，默认您已经完成Zcloud的部署，并已登录Zcloud。

## 部署Mysql

1、选择集群

![img](./cquickstart/entry-cluster.png)

2、选择左侧菜单基础资源中的有状态副本

![img](./cquickstart/entry-statefulset.png)

3、创建有状态副本

![img](./cquickstart/create-statefulset.png)

创建页面按如下内容进行填写

名称：wordpress-mysql

副本数：1

容器名称：wordpress-mysql

镜像：mysql:5.6

在容器一节，单击环境变量

键：MYSQL_ROOT_PASSWORD

值：zcloud

在容器一节，单击开放端口

端口名称：mysql

端口：3306

在存储卷一节，单击添加存储：

模版名称：mysql-storage

存储大小：1

存储类型：lvm

在容器一节，单击添加存储卷：

存储卷类型：存储卷

存储卷名称：mysql-storage

挂在路径：/var/lib/mysql

单击保存，如图所示：

![img](./cquickstart/mysql-save.png)

4、部署mysql svc

在弹出的对话框中选择确定，进入Mysql服务的创建页面。

单击内部端口打开按钮，保存即可。在弹出的提示框中选择取消。

![img](./cquickstart/mysql-svc-save.png)

## 部署wordpress
1、选择左侧菜单基础资源中的有状态副本

![img](./cquickstart/entry-deployment.png)

2、创建无状态副本

![img](./cquickstart/create-deployment.png)

创建页面按如下内容进行填写

名称：wordpress

副本数：1

容器名称：wordpress

镜像：wordpress:4.8-apache

在容器一节，单击环境变量两次

键：WORDPRESS_DB_HOST

值：wordpress-mysql

键：WORDPRESS_DB_PASSWORD

值：zcloud

在容器一节，单击开放端口

端口名称：http

端口：80

在存储卷一节，单击添加存储：

模版名称：wordpress-storage

存储大小：1

存储类型：lvm

在容器一节，单击添加存储卷：

存储卷类型：存储卷

存储卷名称：wordpress-storage

挂在路径：/var/www/html

单击保存，如图所示：

![img](./cquickstart/wordpress-save.png)

3、部署wordpress svc

在弹出的对话框中选择确定，进入Mysql服务的创建页面。

服务类型选择Node Port，单击内部端口打开按钮，端口列表填写8888，保存即可。在弹出的提示框中选择取消。

![img](./cquickstart/wordpress-svc-save.png)

## 访问wordpress

浏览器地址栏输入：http://work节点IP:nodeport，如下图所示：

![img](./cquickstart/wordpress1.png)

开启你的wordpress之旅吧！

![img](./cquickstart/wordpress2.png)

![img](./cquickstart/wordpress3.png)

![img](./cquickstart/wordpress4.png)

![img](./cquickstart/wordpress5.png)

![img](./cquickstart/wordpress6.png)

![img](./cquickstart/wordpress7.png)