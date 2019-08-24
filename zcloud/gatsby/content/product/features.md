---
title: "产品特点"
metaTitle: "This is the title tag of this page"
metaDescription: "This is the meta description"
---



## 设计愿景

众所周知，开源项目 Kubernetes 已经成为事实上的编排平台的领导者，是下一代分布式架构的王者，其在自动化部署、扩展性、以及管理容器化的应用已经体现出独特的优势。然而，很多人学习 Kubernetes，就会发现有点不知所措，因为 Kubernetes 本身有许多组件并且还有一些组件需要自行安装和部署，比如存储和网络部分，目前 Kubernetes 仅提供的是开源的解决方案或项目，可能在某种程度上难以安装，维护和操作，对于用户而言，学习成本和门槛都很高，快速上手并不是一件易事。

如果无论如何都得将应用部署在云上运行，为什么不让 Zcloud为您运行 Kubernetes 且更好地管理运行的资源呢？这样您就可以继续运行应用程序和工作负载并专注于这些更重要的业务。因为通过 Zcloud可以快速管理 Kubernetes 集群、部署应用、服务发现、集群扩容等等。换句话说，Kubernetes 是一个很棒的开源项目（或被认为是一个框架），但是 Zcloud是一款非常专业的企业级平台产品，专注于解决用户在复杂业务场景中的痛点，提供更友好更专业的用户体验。

最重要的是，Zcloud在存储和网络方面提供了最优的解决方案，比如存储支持 Cephfs和Localfs，使用户可以根据不同的应用场景选择不同的存储方案。

## 为什么选择 Zcloud？

Zcloud为企业用户提供高性能可伸缩的容器应用管理服务，旨在帮助企业完成新一代互联网技术驱动下的数字化转型，加速业务的快速迭代与交付，以满足企业日新月异的业务需求。

### 自研高性能DNS插件
* 比原生CoreDNS内存使用减少40%，应答延迟减少40%，应答性能提高5倍。

### 支持跨集群访问

* 实现了不同应用间的跨集群访问。
* 同时支持集群外部应用访问集群内部的服务。

### 多租户支持

* 支持不同用户间的资源隔离，支持用户统一认证登录。

### 可视化的存储管理

* 支持集群的存储限额与使用状态查看。
* 支持用户配置使用的存储后，自动创建PV。
* 支持Cephfs，Localfs 等存储方案。

### 配置自动加载

- 对应用的配置进行自动检测，如配置发生变动，所有应用自动加载新的配置，不会出现应用漏更的现像。

### 集成监控

* Zcloud全监控运维功能可通过可视化界面操作，同时，开放标准接口对接企业运维系统，以统一运维入口实现集中化运维。强大的监控系统，快速定位应用问题或资源问题。

### 极简UI体验

- 面向开发、测试、运维友好的用户界面，向导式用户体验，降低 Kubernetes 学习成本的设计理念

- 用户基于应用模板可以一键部署一个完整应用的所有服务，UI 提供全生命周期管理



同时原生Kubernetes还有以下优势：

### 提高资源利用率

- 以应用为基本单元运行时分配资源。

### 基于应用的调度策略

- 应用故障或节点故障，自动重启或调度故障影响范围内的应用。

### 秒级部署，屏蔽底层环境影响

- 用户无须关心系统是Ubuntu或是Centos，均为容器化部署，启动速度快。解耦应用与运行平台。

### 支持服务发现与负载均衡

- 自动服务发现，同一应用启动多个副本，自动配置负载均衡。
- 支持 Calico、Flannel 等开源网络方案。

### 高效弹性伸缩应用规模

- 减少或扩大应用服务能力，操作简单快速。并实现了业务高可靠与高可用。